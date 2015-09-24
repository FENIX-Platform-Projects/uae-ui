/*global define, _:false, amplify, $*/
define([
    'handlebars',
    'views/base/view',
    'views/download/selectors-view',
    'config/Config',
    'config/Services',
    'config/Events',
    'text!templates/download/download.hbs',
    'text!templates/download/download-result.hbs',
    'text!templates/common/error.hbs',
    'text!templates/common/courtesy-message.hbs',
    'i18n!nls/download-survey',
    'i18n!nls/errors',
    'fx-common/WDSClient',
    'FENIX_UI_METADATA_VIEWER',
    'pivot',
    'pivotRenderers',
    'pivotAggregators',
    'text!pivotDataTest',
    'pivotDataConfig',
    'underscore',
    'packery',
    'jqueryBridget',
    'q',
    'jstree',
    'amplify'
], function (Handlebars, View, SelectorsView, Config, Services, E, template, resultTemplate, errorTemplate, courtesyMessageTemplate, i18nLabels, i18Errors, WDSClient, MetadataViewer, Pivot, pivotRenderers, pivotAggregators, pivotDataTest, pivotDataConfig, _, Packery, bridget, Q) {

    'use strict';

    var s = {
        GO_BTN: "#table-go-btn",
        RESET_BTN: "#table-reset-btn",
        ERROR_HOLDER: ".error-holder",
        COURTESY_MESSAGE_HOLDER: ".courtesy-message-holder",
        RESULTS_CONTAINER: '#results-container',
        RESULT_SELECTOR: '.rlm-result',
        SELECTORS_CONTAINER : '.download-selectors-container',

        RESULT_OLAP_CONTAINER: '[data-role="pivot-container"]',
        TAB_DOWNLOAD_BY_COUNTRY : '[data-tab="country"]',
        TAB_DOWNLOAD_BY_INDICATOR : '[data-tab="indicator"]',

        BTN_DOWNLOAD_PIVOT: '[data-download]',
        BTN_REMOVE_RESULT : '[data-control="remove"]',
        BTN_METADATA : '[data-control="metadata"]',

        MODAL_METADATA : '#rlm-metadata-modal',
        MODAL_METADATAVIEWER_CONTAINER : '[data-content="metadata-viewer-container"]'
    };

    var DownloadSurveyView = View.extend({

        initialize : function( options ) {

            this.section = options.section;

            View.prototype.initialize.call(this, arguments);

        },

        // Automatically render after initialize
        autoRender: true,

        className: 'download-survey',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        initVariables: function () {

            this.$goBtn = this.$el.find(s.GO_BTN);
            this.$resetBtn = this.$el.find(s.RESET_BTN);
            this.$errorHolder = this.$el.find(s.ERROR_HOLDER);
            this.$courtesyMessageHolder = this.$el.find(s.COURTESY_MESSAGE_HOLDER);

            //results
            this.$resultsContainer = this.$el.find(s.RESULTS_CONTAINER);

            //tabs
            this.$tabDownloadByCountry = this.$el.find(s.TAB_DOWNLOAD_BY_COUNTRY);
            this.$tabDownloadByIndicator= this.$el.find(s.TAB_DOWNLOAD_BY_INDICATOR);

            this.$modalMetadata = this.$el.find(s.MODAL_METADATA);

            this.pivots = [];

        },

        initComponents: function () {

            bridget('packery', Packery);

            this.$resultsContainer.packery({
                itemSelector: s.RESULT_SELECTOR,
                transitionDuration: 0
            });

            this.WDSClient = new WDSClient({
                //serviceUrl: Config.WDS_URL,
                datasource: Config.DB_NAME,
                outputType: Config.WDS_OUTPUT_TYPE
            });

            this.WDSClientOlap = new WDSClient({
                datasource: Config.DB_NAME,
                outputType: Config.WDS_OLAP_OUTPUT_TYPE
            });

            switch (this.section){
                case Config.DOWNLOAD_BY_INDICATOR :
                    this.$tabDownloadByCountry.removeClass("active");
                    this.$tabDownloadByIndicator.addClass("active");
                    break;
                case Config.DOWNLOAD_BY_COUNTRY :
                    this.$tabDownloadByCountry.addClass("active");
                    this.$tabDownloadByIndicator.removeClass("active");
                    break;
            }

        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: this.section});

            this.initVariables();

            this.bindEventListeners();

            this.initComponents();

            this.onReady();

        },

        render: function() {

            View.prototype.render.apply(this, arguments);

            var selectorsView = new SelectorsView({autoRender: true, container: this.$el.find(s.SELECTORS_CONTAINER), section : this.section});

            this.subview('selectors', selectorsView);
        },

        onReady: function () {

            this.initPage();

            this.unlockForm();
        },

        initPage: function () {

            this.printDefaultSelection();
        },

        printDefaultSelection: function () {

            this.subview('selectors').printDefaultSelection();
        },

        /* Event binding and callback */

        bindEventListeners: function () {

            this.$goBtn.on('click', _.bind(this.onClickGoBtn, this));

            this.$resetBtn.on('click', _.bind(this.onClickResetBtn, this));

        },

        onClickGoBtn: function () {

            var inputs = this.getInputs(),
                valid = this.validateInput(inputs);

            if (valid === true) {

                this.lockForm();

                this.resetError();

                this.resetCourtesyMessage();

                this.createRequest(inputs);

                this.search();

            } else {

                this.printError(valid);
            }
        },

        onClickResetBtn: function () {

            this.printDefaultSelection();

            this.resetResults();

            this.resetError();
        },

        /* Data request process */

        validateInput: function (inputs) {

            var errors = [];

            if (!inputs.hasOwnProperty("country") || !inputs.hasOwnProperty("indicator") || !inputs.hasOwnProperty("qualifier") || !inputs.hasOwnProperty("year") ) {
                errors.push("no_input");
            }

            if (inputs.country.length < 1 ) {
                errors.push("country_empty");
            }

            if (inputs.indicator.length < 1 ) {
                errors.push("indicator_empty");
            }

            if (inputs.qualifier.length < 1 ) {
                errors.push("qualifier_empty");
            }

            if (inputs.year.length < 1 ) {
                errors.push("year_empty");
            }

            return (Object.keys(errors).length === 0) ? true : errors;
        },

        printError: function (errors) {

            var template = Handlebars.compile(errorTemplate);
            this.$errorHolder.html(template({error: i18Errors[errors[0]]}));
        },

        printCourtesyMessage: function () {

            var template = Handlebars.compile(courtesyMessageTemplate);
            this.$courtesyMessageHolder.html(template(i18nLabels));
        },

        lockForm: function () {

            this.$goBtn.attr('disabled', 'disabled');
            this.$resetBtn.attr('disabled', 'disabled');
        },

        unlockForm: function () {

            this.$goBtn.removeAttr('disabled');
            this.$resetBtn.removeAttr('disabled');
        },

        getInputs: function () {

           return this.subview('selectors').getInputs();
        },

        createRequest: function (inputs) {

            this.currentRequest = {
                inputs: inputs,
                processedInputs: prepareInputsForWds(inputs)
            };

            function prepareInputsForWds(inputs) {

                var result = {},
                    keys = Object.keys(inputs);

                _.each(keys, function (k) {
                    result[k] = Array.isArray(inputs[k]) ? processArray(inputs[k]) : inputs[k];
                });

                return result;
            }

            function processArray(input) {

                var result = '',
                    concat = ",";

                _.each(input, function (item) {
                    result += item + concat;
                });

                return result.substring(0, result.length - concat.length);
            }
        },

        search: function () {

            this.WDSClientOlap.retrieve({
                payload: {
                    query:  Services.DOWNLOAD_SEARCH,
                    queryVars: this.currentRequest.processedInputs
                },
                success: _.bind(this.onSearchSuccess, this),
                error: _.bind(this.onSearchError, this)
            });
        },

        onSearchError: function () {

            this.unlockForm();
            this.printError(['request_error']);
        },

        onSearchSuccess: function (response) {

            this.currentRequest.response = response;

            this.unlockForm();

            if (this.currentRequest.response.length === 0) {
                this.printCourtesyMessage();
            } else {
                this.appendResult();
            }
        },

        /* Results rendering */
        appendResult: function () {

            if(!window.fx_rlm_dynamic_id){
                window.fx_rlm_dynamic_id = 0;
            }

            window.fx_rlm_dynamic_id ++  ;

            //Add here the result header
            var template = Handlebars.compile(resultTemplate),
                id = 'rlm-dynamic-pivot-' +  window.fx_rlm_dynamic_id,
                $result = this.appendDynamicId($(template()), id),
                pivot;

            // add to packery layout
            this.$resultsContainer.append($result).packery('appended', $result);

            pivot = this.initOlapCreator(id);

            this.bindResultEventListeners($result, pivot,  this.currentRequest);
        },

        bindResultEventListeners : function ($result, pivot, currentRequest) {

            var request = $.extend(true, {}, currentRequest);

            $result.find(s.BTN_DOWNLOAD_PIVOT).on('click', _.bind(function (e) {
                this.onClickDownloadPivot($(e.currentTarget).data('download'), pivot);
            }, this));

            $result.find(s.BTN_REMOVE_RESULT).on('click', _.bind(function () {
                this.removeResult($result);
                pivot.destroy();
            }, this));

            $result.find(s.BTN_METADATA).on('click', _.bind(function () {
                this.onModalMetadataBtnClick(request);
            }, this));

        },

        onClickDownloadPivot : function (output, pivot){

            switch (output.toUpperCase()) {
                case 'CSV': pivot.exportCSV(); break;
                case 'XLS': pivot.exportExcel(); break;
            }
        },

        onModalMetadataBtnClick : function (request) {

            var self = this;

            this.$modalMetadata.modal('show');

            loadMetadata('Pov_Inc').then(function (data) {
                var metadata = new MetadataViewer();

                metadata.init({
                    lang: 'en',
                    data : JSON.parse(data),
                    //domain: request.inputs.indicator[0],
                    placeholder : self.$modalMetadata.find(s.MODAL_METADATAVIEWER_CONTAINER)
                });
            });

            function loadMetadata( id ) {

                return Q.Promise(function(resolve, reject, notify) {
                    var request = new XMLHttpRequest();

                    request.open("GET", Config.SERVICE_BASE_ADDRESS + '/resources/metadata/uid/'+ id + '?full=true', true);
                    request.onload = onload;
                    request.onerror = onerror;
                    request.onprogress = onprogress;
                    request.send();

                    function onload() {
                        if (request.status === 200) {
                            resolve(request.responseText);
                        } else {
                            reject(new Error("Status code was " + request.status));
                        }
                    }

                    function onerror() {
                        reject(new Error("Can't XHR " + JSON.stringify(url)));
                    }

                    function onprogress(event) {
                        notify(event.loaded / event.total);
                    }
                });
            }

        },
        removeResult : function ($item){

            this.$resultsContainer.packery('remove', $item);
            this.$resultsContainer.packery();
        },

        appendDynamicId : function ($result, id) {

            $result.find(s.RESULT_OLAP_CONTAINER).attr('id', id);

            return $result;

        },

        initOlapCreator: function (id) {

            var pivot = new Pivot(),
                pivotDataConf = $.extend(true, {}, pivotDataConfig);

            this.pivots.push(pivot);

            pivotDataConf.rendererDisplay = pivotRenderers;

            pivotDataConf.aggregatorDisplay = pivotAggregators;

            pivot.render( id, this.currentRequest.response, pivotDataConf );

            return pivot;
        },

        resetResults: function () {

            //Destroy charts
            _.each(this.pivots, function (p) {

                if (p.hasOwnProperty('destroy')) {
                    p.destroy();
                }

            });
            this.pivots = [];

            //Clear packery
            var $packeryItems = this.$resultsContainer.find(s.RESULT_SELECTOR);
            this.$resultsContainer.packery('remove', $packeryItems);
            this.$resultsContainer.packery();
        },

        /* Utils */

        resetError: function () {

            this.$errorHolder.empty();
        },

        resetCourtesyMessage: function () {

            this.$courtesyMessageHolder.empty();
        },

        /* Disposition */

        unbindEventListeners: function () {

            this.$goBtn.off();
            this.$resetBtn.off();

        },

        dispose: function () {

            this.resetResults();

            this.resetCourtesyMessage();

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }

    });

    return DownloadSurveyView;
});

