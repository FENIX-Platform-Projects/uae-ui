/*global define, _:false, amplify, $*/
define([
    'handlebars',
    'views/base/view',
    'config/Config',
    'config/Services',
    'config/Events',
    'text!templates/download/selectors.hbs',
    'i18n!nls/download-selectors',
    'fx-common/WDSClient',
    'jstree',
    'jstreegrid',
    'amplify'
], function (Handlebars, View, Config, Services, E, template, i18nLabels, WDSClient) {

    'use strict';

    var s = {
        SELECTOR_INDICATOR: '.selector-indicator',
        SELECTOR_COUNTRY: '.selector-country',
        SELECTOR_YEAR: '.selector-year',
        SELECTOR_QUALIFIER: '.selector-qualifier',
        SELECTOR_BTN_ALL: '[data-select="all"]',
        SELECTOR_BTN_NONE: '[data-select="none"]',

        SELECTORS: '[data-role="selectors"]',
        SELECTOR_CONTAINER_COUNTRY: '[data-selector="country"]',

        SELECTOR_FILTER: '[data-role="filter"]',

        SELECTOR_INFO_BTN: '.fx-selector-info'
    };

    var SelectorsView = View.extend({

        initialize: function (options) {
            $.extend(true, this, options);
        },

        // Automatically render after initialize
        autoRender: true,

        className: 'download-selectors',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        manipulateTemplate: function () {

            switch (this.section) {

                case Config.DOWNLOAD_BY_COUNTRY :
                    this.$selectors.prepend(this.$selectorContainerCountry);
                    break;

            }
        },

        initVariables: function () {

            //Selectors
            this.$selectorIndicator = this.$el.find(s.SELECTOR_INDICATOR);
            this.$selectorCountry = this.$el.find(s.SELECTOR_COUNTRY);
            this.$selectorYear = this.$el.find(s.SELECTOR_YEAR);
            this.$selectorQualifier = this.$el.find(s.SELECTOR_QUALIFIER);

            this.selector2$node = {
                'indicator': this.$selectorIndicator,
                'country': this.$selectorCountry,
                'year': this.$selectorYear,
                'qualifier': this.$selectorQualifier
            };

            this.$selectors = this.$el.find(s.SELECTORS);
            this.$filters = this.$selectors.find(s.SELECTOR_FILTER);
            this.$selectorContainerCountry = this.$el.find(s.SELECTOR_CONTAINER_COUNTRY);

            //Codelists
            this.cachedCodelist = [];

            this.codelists_conf = {
                cl_indicator: Services.CL_INDICATOR,
                cl_country: Services.CL_COUNTRY,
                cl_qualifier: Services.CL_QUALIFIER
            };

            this.codelists = Object.keys(this.codelists_conf);

            this.selectorsReady = 0;

            this.selectorsAmount = Object.keys(this.selector2$node).length;

            this.refreshSettings = Config.SELECTOR_REFRESH_SETTINGS[this.section.toUpperCase()];

        },

        initComponents: function () {

            this.WDSClient = new WDSClient({
                serviceUrl: Config.WDS_URL,
                datasource: Config.DB_NAME,
                outputType: Config.WDS_OUTPUT_TYPE
            });

        },

        initJsTreeSelector: function (selector, cl) {

            //Init country selector
            var data = [],
                $container = this.selector2$node[selector],
                self = this,
                multiple = isMultiSelection(selector);

            _.each(cl || amplify.store.sessionStorage('cl_' + selector), function (n) {

                var node = createNode(n);

                if (node !== null) {
                    data.push(node);
                }

            });

            var jstree_conf = {
                "core": {
                    "multiple": multiple,
                    "animation": 0,
                    "themes": {
                        "responsive": true
                    },
                    'data': data
                },
                grid: {
                    columns: [
                        {width: '80px'},
                        {width: '20px', value: "info", cellClass: s.SELECTOR_INFO_BTN.substring(1)}
                    ]
                },
                "types": {
                    "default": {
                    },
                    "External": {
                        "icon": "glyphicon glyphicon-ok"
                    }

                },
                "plugins": ["types", "wholerow", "search", "checkbox" /*, "grid" */],
                "search": {
                    show_only_matches: true
                }

            };

            if (selector.toUpperCase() === 'INDICATOR') {
                $.extend(true,
                    jstree_conf,
                    {
                        checkbox: {
                            three_state: false
                        }
                    });

            }

            //Clear jsTree
            $container.jstree('destroy');

            $container.empty();

            $container.jstree(jstree_conf);

            $container.on('ready.jstree', function () {
                self.onJsTreeReady();
                initInfoButtons($container);
            });

            $container.on('select_cell.jstree-grid', function (e, data) {

                console.log($(data.node).attr('id'))

            });

            //Limit selection e select only leafs for indicators
            $container.on("select_node.jstree", _.bind(function (e, data) {

                if (data.selected.length > Config.SELECTOR_THRESHOLD) {
                    $container.jstree(true).deselect_node(data.node);
                    return;
                }

                if (selector.toUpperCase() === 'INDICATOR' && !data.instance.is_leaf(data.node)) {
                    self.indicatorSelectorParentDeselection = true;
                    $container.jstree(true).deselect_node(data.node, true);
                    $container.jstree(true).toggle_node(data.node);
                    console.log("Select 3")
                    return;
                }

                amplify.publish(E.SELECTOR_SELECT, selector, data.node);

            }, this));

            $container.on("deselect_node.jstree", _.bind(function (e, data) {

                if (self.indicatorSelectorParentDeselection === true) {
                    self.indicatorSelectorParentDeselection = false;
                    return;
                }

                var previousState,
                    sequence = $.map(self.refreshSettings.SEQUENCE || [], function(item) {
                        return item.toUpperCase();
                    }),
                    currentStateIndex = sequence.indexOf(selector.toUpperCase()),
                    previousStateIndex = currentStateIndex > 0 ? currentStateIndex - 1 : 0;

                previousState = sequence[previousStateIndex];

                if (data.selected.length === 0) {

                    amplify.publish(E.SELECTOR_SELECT, previousState, data.node);
                } else {
                    amplify.publish(E.SELECTOR_SELECT, selector, data.node);
                }

            }, this));

            initSearch(selector, $container);

            initBtns(selector, $container, multiple);

            function createNode(item) {

                // Expected format of the node (there are no required fields)
                var config = {
                    id: item.code, // will be autogenerated if omitted
                    parent: item.parent || '#', // required
                    text: item.label, // node text
                    data: {
                        info: "info",
                        type: item.source || 'default'
                    },
                    icon: item.source, // string for custom
                    /* state: {
                     opened: boolean,  // is the node open
                     disabled: boolean,  // is the node disabled
                     selected: boolean  // is the node selected
                     },*/
                    //children    : [],  // array of strings or objects
                    li_attr: {}  // attributes for the generated LI node
                    //a_attr: {}  // attributes for the generated A node
                };

                return item.code ? config : null;
            }

            function initSearch(selector, $container) {
                var to = false,
                    $filter = self.$el.find('[data-selector="' + selector + '"]').find(s.SELECTOR_FILTER);

                $filter.on('change keyup paste mouseup', function () {
                    if (to) {
                        clearTimeout(to);
                    }
                    to = setTimeout(function () {
                        var v = $filter.val() || '';
                        $container.jstree(true).search(String(v).toLocaleLowerCase());
                    }, 250);
                });
            }

            function initBtns(selector, $container, multiple) {

                var $btnSelectAll = self.$el.find('[data-selector="' + selector + '"]').find(s.SELECTOR_BTN_ALL),
                    $btnSelectNone = self.$el.find('[data-selector="' + selector + '"]').find(s.SELECTOR_BTN_NONE);

                if (multiple === false) {
                    $btnSelectAll.hide();
                    $btnSelectNone.hide();
                    return;
                }

                //Remove previous handlers and then apply them again

                $btnSelectAll.off().on('click', function () {
                    $container.jstree("select_all", true);
                    amplify.publish(E.SELECTOR_SELECT, selector);

                });

                $btnSelectNone.off().on('click', function () {
                    $container.jstree("deselect_all", true);
                    amplify.publish(E.SELECTOR_SELECT, selector);
                });
            }

            function isMultiSelection(selector) {

                var multiple = Config.SELECTOR_MULTISELECTION[self.section.toUpperCase()];
                return multiple.indexOf(selector) > -1;
            }

            function initInfoButtons($container) {

                $container.find(s.SELECTOR_INFO_BTN).on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                });

            }
        },

        onJsTreeReady: function () {

            this.selectorsReady++;

            if (this.selectorsReady === this.selectorsAmount) {

                this.onSelectorsReady();
            }

        },

        disableJsTree: function ($c) {

            var nodes,
                $container = typeof $c === 'string' ? this.selector2$node[$c] : $c,
                $btnSelectAll = this.$el.find('[data-selector="' + $c + '"]').find(s.SELECTOR_BTN_ALL),
                $btnSelectNone = this.$el.find('[data-selector="' + $c + '"]').find(s.SELECTOR_BTN_NONE);

            //disable btns
            $btnSelectAll.attr("disabled", true);
            $btnSelectNone.attr("disabled", true);

            $container.jstree("deselect_all");

            nodes = $container.jstree(true).get_json(null, {flat: true});

            _.each(nodes, function (n) {
                $container.jstree(true).disable_node(n);
            });

        },

        enableJsTree: function ($c) {

            var nodes,
                $container = typeof $c === 'string' ? this.selector2$node[$c] : $c,
                $btnSelectAll = this.$el.find('[data-selector="' + $c + '"]').find(s.SELECTOR_BTN_ALL),
                $btnSelectNone = this.$el.find('[data-selector="' + $c + '"]').find(s.SELECTOR_BTN_NONE);

            //disable btns
            $btnSelectAll.removeAttr("disabled");
            $btnSelectNone.removeAttr("disabled");

            $container.jstree("deselect_all");

            //disable tree nodes
            nodes = $container.jstree(true).get_json(null, {flat: true});

            _.each(nodes, function (n) {
                $container.jstree(true).enable_node(n);
            });
        },

        refreshJsTree: function (selector) {

            var self = this;

            this.WDSClient.retrieve({
                payload: {
                    query: Services['REFRESH_' + selector.toUpperCase()],
                    queryVars: this.prepareInputsForWds(this.getInputs())
                },
                success: function (data) {
                    if (Array.isArray(data)) {
                        self.initJsTreeSelector(selector, data);
                    }
                },
                error: _.bind(this.onPreloadCodelistError, this)

            });

        },

        preloadResources: function () {

            _.each(this.codelists, _.bind(function (cd) {

                //Check if codelist is cached otherwise query
                var stored = amplify.store.sessionStorage(cd);

                if (stored === undefined || stored.length < 2) {

                    this.WDSClient.retrieve({
                        payload: {query: this.codelists_conf[cd]},
                        success: _.bind(this.onPreloadCodelistSuccess, this, cd),
                        error: _.bind(this.onPreloadCodelistError, this)
                    });

                } else {
                    this.onCodelistCached(cd);
                }

            }, this));

        },

        onCodelistCached: function (codelist) {

            this.cachedCodelist.push(codelist);

            if (this.cachedCodelist.length === this.codelists.length) {

                this.ready = true;

                this.onReady();
            }
        },

        onPreloadCodelistError: function (e) {
            amplify.publish(E.CODELIST_LOAD_ERROR, e);
        },

        onPreloadCodelistSuccess: function (cd, response) {

            amplify.store.sessionStorage(cd, response);

            this.onCodelistCached(cd);
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this.initVariables();

            this.manipulateTemplate();

            this.bindEventListeners();

            this.initComponents();

            this.preloadResources();

        },

        onReady: function () {

            this.initPage();

            this.unlockForm();
        },

        initPage: function () {

            this.printSelectors();
        },

        printSelectors: function () {

            this.initJsTreeSelector('indicator');

            this.initJsTreeSelector('country');

            var cl = [];

            for (var i = Config.SEL_YEAR_FROM; i < (Config.SEL_YEAR_TO + 1); i++) {
                cl.push({
                    code: i,
                    label: String(i)
                });
            }

            this.initJsTreeSelector('year', cl);

            this.initJsTreeSelector('qualifier');

        },

        onSelectorsReady: function () {

            this.printDefaultSelection();

            this.configureSelectors('INIT');

        },

        printDefaultSelection: function () {
            var self = this;

            this.$selectorIndicator.jstree("deselect_all");
            if (Config.DEFAULT_SEL_INDICATOR && Array.isArray(Config.DEFAULT_SEL_INDICATOR)) {
                _.each(Config.DEFAULT_SEL_INDICATOR, function (v) {
                    self.$selectorIndicator.jstree(true).select_node({id: v});
                });
            }

            this.$selectorCountry.jstree("deselect_all");
            if (Config.DEFAULT_SEL_COUNTRY && Array.isArray(Config.DEFAULT_SEL_COUNTRY)) {
                _.each(Config.DEFAULT_SEL_COUNTRY, function (v) {
                    self.$selectorCountry.jstree(true).select_node({id: v});
                });
            }

            this.$selectorYear.jstree("deselect_all");
            if (Config.DEFAULT_SEL_YEAR && Array.isArray(Config.DEFAULT_SEL_YEAR)) {
                _.each(Config.DEFAULT_SEL_YEAR, function (v) {
                    self.$selectorYear.jstree(true).select_node({id: v});
                });
            }

            this.$selectorQualifier.jstree("deselect_all");
            if (Config.DEFAULT_SEL_QUALIFIER && Array.isArray(Config.DEFAULT_SEL_QUALIFIER)) {
                _.each(Config.DEFAULT_SEL_QUALIFIER, function (v) {
                    self.$selectorYear.jstree(true).select_node({id: v});
                });
            }

            this.$filters.val('').trigger('change');

        },

        configureSelectors: function (state) {

            var settings = this.refreshSettings[state.toUpperCase()],
                toEnable = settings ? settings.ENABLE : [],
                toDisable = settings ? settings.DISABLE : [],
                toRefresh = settings ? settings.REFRESH : [],
                self = this;

            callActionOnJstree(toEnable, this.enableJsTree);

            callActionOnJstree(toDisable, this.disableJsTree);

            callActionOnJstree(toRefresh, this.refreshJsTree);

            function callActionOnJstree(array, action) {

                if (Array.isArray(array)) {
                    for (var i = 0; i < array.length; i++) {
                        if (typeof action === 'function') {
                            $.proxy(action, self)(array[i]);
                        }
                    }
                }
            }
        },

        /* Event binding and callback */

        bindEventListeners: function () {

            amplify.subscribe(E.SELECTOR_SELECT, this, this.onSelectorSelection);
        },

        onSelectorSelection: function (selector) {

            this.configureSelectors(selector);

        },

        /* Data request process */

        validateInput: function (inputs) {

            var errors = [];

            if (inputs.variables.length === 0) {
                errors.push('select_at_least_one_variable');
            }

            if (inputs.geo.length === 0) {
                errors.push('select_at_least_one_geo');
            }

            return (Object.keys(errors).length === 0) ? true : errors;
        },

        lockForm: function () {

        },

        unlockForm: function () {

        },

        getInputs: function () {

            return {
                indicator: this.$selectorIndicator.jstree(true).get_selected(),
                country: this.$selectorCountry.jstree(true).get_selected(),
                year: this.$selectorYear.jstree(true).get_selected(),
                qualifier: this.$selectorQualifier.jstree(true).get_selected()
            };

        },

        /* Utils */
        prepareInputsForWds: function (inputs) {

            var result = {},
                keys = Object.keys(inputs),
                self = this;

            _.each(keys, function (k) {
                result[k] = Array.isArray(inputs[k]) ? self.processArray(inputs[k]) : inputs[k];
            });

            return result;
        },

        processArray: function (input) {

            var result = '',
                concat = ",";

            _.each(input, function (item) {
                result += item + concat;
            });

            return result.substring(0, result.length - concat.length);
        },

        /* Disposition */

        unbindEventListeners: function () {

            //Components disposition
            this.$selectorCountry.jstree('destroy');
            this.$selectorIndicator.jstree('destroy');
            this.$selectorQualifier.jstree('destroy');
            this.$selectorYear.jstree('destroy');

            this.$el.find(s.SELECTOR_BTN_ALL).off();
            this.$el.find(s.SELECTOR_BTN_NONE).off();

            amplify.unsubscribe(E.SELECTOR_SELECT, this.onSelectorSelection);

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }

    });

    return SelectorsView;
});
