/*global define*/
define([
    'jquery',
    'backbone',
    'chaplin',
    'config/Config',
    'controllers/base/controller',
    'views/profile-view',
    'text!json/methods/models.json',
    'q',
    'amplify'
], function ($, Backbone, Chaplin, C, Controller, View, MethodsCollection, Q) {

    'use strict';

    var ProfileController = Controller.extend({

        beforeAction: function (params) {

            this.currentCountryId  =  params.id;

            Controller.prototype.beforeAction.call(this, arguments);

            //TODO cache codelist

            return this.performAccessControlChecks(params).then( _.bind(this.onSuccess, this), _.bind(this.onError, this));
        },

        onError: function ( ) {

            alert("Impossible to load country list")
        },

        onSuccess: function ( countries ) {

            this.countries = countries;

            var country = _.findWhere(this.countries, { code : this.currentCountryId});

            this.validCountrydId = !!country;

        },

        performAccessControlChecks: function (params) {

            return new Q($.ajax({
                url : C.COUNTRIES_CODE_LIST
            }));
        },

        show: function (params) {

            var conf = {
                region: 'main',
                countries: this.countries
            };

            //Pass the valid id to view if valid
            if (this.validCountrydId === true) {
                conf.id = params.id;
            } else {
                Backbone.history.navigate('#profile/' , {trigger: false});
            }

            this.view = new View(conf);
        }

    });


    return ProfileController;
});
