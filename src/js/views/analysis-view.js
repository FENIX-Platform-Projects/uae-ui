/*global define, amplify*/
define([
    'jquery',
    'underscore',
    'views/base/view',
    'text!templates/analysis/analysis.hbs',
    'i18n!nls/analysis',
    'config/Config',
    'config/Events',
    'fx-cat-br/start',
    'fx-ana/start',
    'fx-md-v/start',
    'fx-report',
    'amplify'
], function ($, _, View, template, i18nLabels, C, E, Catalog, Analysis,MetadataViewer,Report) {

    'use strict';

    var s = {
        ANALYSIS_CONTAINER: '#fx-analysis-container',
        CATALOG_CONTAINER: '#fx-catalog-container',
        MODULES_STACK_CONTAINER: '#fx-modules-stack-container',
        OVERLAY: "#overlay",
        OVERLAY_CONTENT: '.overlay-content',
        OVERLAY_OPEN: '.open-overlay',
        OVERLAY_CLOSE: '.close-overlay',
        PAGE_CONTENT: "#analysis-page-content",
        MODAL_METADATA: '#uneca-metadata-modal',
        MODAL_METADATAVIEWER_CONTAINER: '[data-content="metadata-viewer-container"]',

        BTN_EXPORT_METADATA : '.fx-md-report-btn'

    };

    var AnalysisView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'analysis',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //Init
            $(s.OVERLAY_CONTENT).hide();
            $(s.OVERLAY).hide();

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'analysis'});

            this.catalog = new Catalog({

                container: document.querySelector(s.CATALOG_CONTAINER),

                catalog: {
                    BLANK_FILTER: C.CATALOG_BLANK_FILTER
                },

                results: {
                    actions: {
                        SELECT_RESOURCE: {
                            event: 'select',
                            labels: {
                                EN: 'View'
                            }
                        },
                        METADATA: {
                            event: 'metadata',
                            labels: {
                                EN: 'Metadata'
                            }
                        },
                        DOWNLOAD: {
                            event: 'download',
                            labels: {
                                EN: 'Download'
                            }
                        }

                    }
                }

            }).init();

            this.$modalMetadata = this.$el.find(s.MODAL_METADATA);

            this.$report = new Report();

            this.analysis = new Analysis({
                container: document.querySelector(s.ANALYSIS_CONTAINER),
                listenToCatalog: {
                    active: true,
                    event: 'fx.widget.catalog.select'
                },
                stack: {
                    active: true,
                    container: document.querySelector(s.MODULES_STACK_CONTAINER)
                },
                session: {
                    active: false
                }
            }).init();

            this._bindEventListener();

        },

        _bindEventListener: function () {

            $(s.OVERLAY_OPEN).on('click', _.bind(this.openOverly, this));

            $(s.OVERLAY_CLOSE).on('click', _.bind(this.closeOverly, this));

            amplify.subscribe('fx.widget.catalog.select', this, this.closeOverly);

            amplify.subscribe('fx.widget.catalog.metadata', this, this.onMetadataClick);

            amplify.subscribe('fx.widget.catalog.download', this, this.onDownloadClick);
        },

        onMetadataClick: function (model) {

            var self = this;

            this.$modalMetadata.modal('show');

            var metadata = new MetadataViewer();






            self.$modalMetadata.find(s.MODAL_METADATAVIEWER_CONTAINER).empty();

            metadata.init({
                lang: 'en',
                data: model,
                //domain: "rlm_" + request.inputs.indicator[0],
                placeholder: self.$modalMetadata.find(s.MODAL_METADATAVIEWER_CONTAINER)
            });


            self._listenToExportMetadata(model);

        },

        _listenToExportMetadata : function(model) {

            var fileName = model.title['EN'].replace(/[^a-z0-9]/gi, '_').toLowerCase();

            var self = this;

            $(s.BTN_EXPORT_METADATA).on('click', function(){

                var template = model.filter && model.filter["dsd.contextSystem"] && model.filter["dsd.contextSystem"].enumeration && [0] && model.filter["dsd.contextSystem"].enumeration[0] === 'uneca'?
                    'uneca' : 'fao';

                var payload = {
                    resource: {
                        metadata : {
                            uid : model.uid
                        },
                        data : []
                    },
                    input:{
                    },
                    output: {
                        config:{
                            template : template,
                            lang : 'en'.toUpperCase(),
                            fileName: fileName+'.pdf'
                        }
                    }
                };

                self.$report.init('metadataExport');
                self.$report.exportData(payload,C.MD_EXPORT_URL);
            });
        },

        onDownloadClick: function (model) {

            var payload = {

                resource: {
                    metadata : {
                        uid : model.uid
                    },
                    data : []
                },
                input:{
                    config:{}
                },
                output: {
                    config:{
                        lang : 'en'.toUpperCase()
                    }
                }
            };

            this.$report.init('tableExport');

            this.$report.exportData(payload,C.MD_EXPORT_URL);
        },

        openOverly: function () {

            $(s.PAGE_CONTENT).hide();

            $(s.OVERLAY).show();

            $(s.OVERLAY_CONTENT).show();

        },

        closeOverly: function () {

            $(s.OVERLAY_CONTENT).hide();
            $(s.OVERLAY).hide();
            $(s.PAGE_CONTENT).show();

        },

        dispose: function () {

            this.catalog.destroy();

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },

        unbindEventListeners: function () {

            $(s.OVERLAY_OPEN).off();

            $(s.OVERLAY_CLOSE).off();

            amplify.unsubscribe('fx.widget.catalog.select', this.closeOverly, this);

            amplify.unsubscribe('fx.widget.catalog.metadata', this.onMetadataClick);

            amplify.unsubscribe('fx.widget.catalog.download', this.onDownloadClick);

        }
    });

    return AnalysisView;
});
