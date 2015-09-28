/*global define, amplify, alert*/
define([
    'jquery',
    'views/base/view',
    'fx-ds/start',
    'fx-filter/start',
    'fx-filter/Fx-filter-configuration-creator',
    'text!templates/dashboard/dashboard.hbs',
    'text!templates/dashboard/bases.hbs',
    //'text!templates/dashboard/profile.hbs',
    'i18n!nls/dashboard',
    'config/Events',
    'text!config/dashboard/lateral_menu.json',
    'config/dashboard/Config',
    'handlebars',
    'underscore',
    'amplify',
    'jstree'
], function ($, View, Dashboard, Filter, FilterConfCreator, template, basesTemplate, i18nLabels, E, LateralMenuConfig, PC, Handlebars, _) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        DASHBOARD_CONTENT: "#dashboard-content",
        FILTER_CONTENT: "filter-content",
        FILTER_BTN: "#filter-btn",
        LATERAL_MENU: '#lateral-menu'
    };

    var ProfileView = View.extend({

        initialize: function (params) {

            this.countries = params.countries;

            View.prototype.initialize.call(this, arguments);

        },

        // Automatically render after initialize
        autoRender: true,

        className: 'dashboard',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'dashboard'});

            this._initVariables();

            this._printCountryDashboard();

            this._bindEventListeners();
        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

            this.$filterBtn = this.$el.find(s.FILTER_BTN);

        },

        _bindEventListeners : function () {

            var self = this;

            this.$filterBtn.on('click', function (e, data) {

                var filter = {};
                var values = self.filter.getValues();
                // TODO: funzione per distruggere dashboard e ricrearla con gli items giusti:

                /*                 var filteredConfig = self._getFilteredConfig(values, self.$faostatDashboardConfig);
                 self._renderFaostatDashboard(filteredConfig);
                 self.faostatDashboard.filter([values]);
                 */

                // TODO: it's an array
                self.dashboard.filter([values]);
            });

        },

        _printCountryDashboard: function () {

            var self = this;

            //this.$content.html(dashboardTemplate);

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

            //print jstree
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))

                .on("select_node.jstree", _.bind(function (e, data) {

                    self._onChangeDashboard(data.selected[0]);


                }, this))
                .on("loaded.jstree", function (event, data) {

                    self.$lateralMenu.jstree(true)
                        .select_node('trade');
                });

            //this._printDashboard('resume');

            //bind events from tree click to dashboard refresh
            /*
             * - destroy current dashboard
             * - inject new template    this._printDashboardBase( jstree item selected );
             * - render new dashboard
             *
             * */

        },

        _printDashboard : function ( item ) {

            this._printDashboardBase(item);

            var confDashboard = this._getDashboardConfig(item),
                confFilter = this._getFilterConfig(item);

            this._renderDashboard(confDashboard);

            this._renderFilter(confFilter);
        },

        _onChangeDashboard: function (item) {

            this._printDashboard(item);

        },

        _printDashboardBase: function (id) {

            //Inject HTML
            var source = $(basesTemplate).find("[data-dashboard='" + id + "']"),
                template = Handlebars.compile(source.prop('outerHTML')),
                html = template({});

            this.$el.find(s.DASHBOARD_CONTENT).html(html);
        },

        _getDashboardConfig: function (id) {

            //get from PC the 'id' conf

            var base = PC[id].dashboard,
                conf;

            if (!base) {
                alert("Impossible to load dashboard configuration for [" + id + "]");
            }

            conf = $.extend(true, {}, base);

            return conf;
        },

        _getFilterConfig: function (id) {

            //get from PC the 'id' conf

            var base = PC[id].filter;

            if (!base) {
                alert("Impossible to load dashboard configuration for [" + id + "]");
            }

            return base;
        },

        _renderDashboard: function (config) {

            if (this.dashboard && this.dashboard.destroy) {
                this.dashboard.destroy();
            }

            this.dashboard = new Dashboard({
                layout: "injected"
            });

            this.dashboard.render(config);

        },

        _renderFilter: function (config) {

            var self = this;

            this.filterConfCreator = new FilterConfCreator();

            this.filterConfCreator.getConfiguration(config)
                .then(function (c) {

                    self.filter = new Filter();

                    self.filter.init({
                        container: s.FILTER_CONTENT,
                        layout: 'fluidGrid'
                    });

                    var adapterMap = {};

                    self.filter.add(c, adapterMap);

                });

        }

    });

    return ProfileView;
});
