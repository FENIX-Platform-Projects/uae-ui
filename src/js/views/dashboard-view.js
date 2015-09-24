/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'fx-ds/start',
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
], function ($, View, Dashboard, template, basesTemplate, i18nLabels, E, LateralMenuConfig, PC, Handlebars, _) {

    'use strict';

    var s = {
        CONTENT: "#profile-content",
        SEARCH_FILTER_INPUT: "#searchinput",
        COUNTRY_LIST: '#list-countries',
        SEARCH_ITEM_CHILD: 'a',
        SEARCH_ITEM_EL: '.country-item',
        DASHBOARD_CONTENT: "#dashboard-content",
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
            amplify.publish(E.STATE_CHANGE, {menu: 'profile'});

            this._initVariables();

            this._printCountryDashboard();

        },

        _initVariables: function () {

            this.$content = this.$el.find(s.CONTENT);

        },

        _printCountryDashboard: function () {

            var self = this;

            //this.$content.html(dashboardTemplate);

            this.$lateralMenu = this.$el.find(s.LATERAL_MENU);

            //print jstree
            this.$lateralMenu.jstree(JSON.parse(LateralMenuConfig))

                //Limit selection e select only leafs for indicators
                .on("select_node.jstree", _.bind(function (e, data) {

                    if ( !data.instance.is_leaf(data.node) ) {

                        self.$lateralMenu.jstree(true).deselect_node(data.node, true);

                        self.$lateralMenu.jstree(true).toggle_node(data.node);

                    } else {

                        self._onChangeDashboard(data.selected[0]);

                    }

                }, this));

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

            var conf = this._getDashboardConfig(item);

            this._renderDashboard(conf);
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

            var base = PC[id],
                conf;

            if (!base) {
                alert("Impossible to load dashboard configuration for [" + id + "]");
            }

            conf = $.extend(true, {}, base);

            return conf;
        },

        _renderDashboard: function (config) {

            if (this.unecaDashboard && this.unecaDashboard.destroy) {
                this.unecaDashboard.destroy();
            }

            this.unecaDashboard = new Dashboard({
                layout: "injected"
            });

            this.unecaDashboard.render(config);

        }

    });

    return ProfileView;
});
