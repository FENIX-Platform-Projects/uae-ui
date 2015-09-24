/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/Config',
    'config/Services',
    'config/Events',
    'text!templates/home/home.hbs',
    'text!templates/home/database_update_item.hbs',
    'i18n!nls/home',
    'handlebars',
    'text!json/home/database_updates.json',
    'fx-common/WDSClient',
    'progressbar',
    'amplify',
    'fenix-ui-map'
], function (View, Config, Services, E, template, dbUpdatesTemplate, i18nLabels, Handlebars, dbUpdatesModels, WDSClient, ProgressBar) {

    'use strict';

    var s = {
        DB_UPDATES_LIST: '#db-updates-list',
        PIE_CHART_MAIN : "#pie-chart-main",
        PIE_CHART_PREVALENCE: "#pie-chart-prevalence"
    };

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {

            //database updates
            this.$dbUpdatesList = this.$el.find(s.DB_UPDATES_LIST);

        },

        initComponents: function () {

            this.initDatabaseUpdatesList();

            this.WDSClient = new WDSClient({
                serviceUrl: Config.WDS_URL,
                datasource: Config.DB_NAME,
                outputType : Config.WDS_OUTPUT_TYPE
            });
        },

        configurePage: function () {

            var c ={
                color: '#2ab896',
                strokeWidth: 10,
                trailWidth: 9,
                trailColor: "#ededed",
                duration: 1500,
                easing : 'easeOut',
                text: {
                    value: '0'
                },
                step: function(state, bar) {
                    bar.setText((bar.value() * 100).toFixed(0));
                }
            };

            var circle = new ProgressBar.Circle(s.PIE_CHART_MAIN, c);

            circle.animate(0.58);

            var circle_two = new ProgressBar.Circle(s.PIE_CHART_PREVALENCE, c);

            circle_two.animate(0.42);

        },

        bindEventListeners: function () {

        },

        //Page section initialization
        initDatabaseUpdatesList: function () {

            _.each(JSON.parse(dbUpdatesModels), _.bind(this.printDatabaseUpdate, this));
        },

        printDatabaseUpdate: function (u) {

            var template = Handlebars.compile(dbUpdatesTemplate);
            this.$dbUpdatesList.append(template(u));
        },


        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });

    return HomeView;
});
