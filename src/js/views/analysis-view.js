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
    'amplify'
], function ($, _, View, template, i18nLabels, C, E, Catalog, Analysis) {

    'use strict';

    var s = {
        ANALYSIS_CONTAINER: '#fx-analysis-container',
        CATALOG_CONTAINER: '#fx-catalog-container',
        MODULES_STACK_CONTAINER: '#fx-modules-stack-container',
        OVERLAY: "#overlay",
        OVERLAY_CONTENT: '.overlay-content',
        OVERLAY_OPEN: '.open-overlay',
        OVERLAY_CLOSE: '.close-overlay'
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
                                EN: 'Select Resource'
                            }

                        }
                    }
                }

            }).init();

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

            amplify.subscribe('fx.widget.catalog.select', _.bind(this.closeOverly, this));
        },


        openOverly: function () {

            $(s.OVERLAY).show();
            $(s.OVERLAY).css({
                height : '100%',
                width : '100%'
            });
            $(s.OVERLAY_CONTENT).fadeIn('fast');

        },

        closeOverly: function () {

            $(s.OVERLAY_CONTENT).fadeOut("fast", function () {
                $(s.OVERLAY_CONTENT).hide();
                $(s.OVERLAY).hide();
            });

        },

        dispose: function () {

            this.catalog.destroy();

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        },
        unbindEventListeners: function () {

        }
    });

    return AnalysisView;
});
