/*global define*/
define([
    'backbone',
    'chaplin',
    'controllers/base/controller',
    'views/methods-view',
    'text!json/methods/models.json',
    'q',
    'amplify'
], function (Backbone,Chaplin,Controller, View, MethodsCollection, Q) {

    'use strict';

    var MethodsController = Controller.extend({

        beforeAction: function (params) {

            Controller.prototype.beforeAction.call(this, arguments);

            return this.performAccessControlChecks(params).then( _.bind(this.allowAccess, this), _.bind(this.denyAccess, this));
        },

        denyAccess: function () {

            this.validstandardId = false;
        },

        allowAccess: function () {

            this.validstandardId = true;
        },

        performAccessControlChecks: function (params) {

            return new Q.Promise(_.bind(function (fulfilled, rejected) {

                this.collection = JSON.parse(MethodsCollection);

                var model = _.findWhere(this.collection, {id: params.id});

                if (model === undefined) {
                    //It is NOT a valid standards id
                    rejected();

                } else {
                    //It is a valid standards id
                    fulfilled();
                }

            }, this));
        },

        show: function (params) {

            if (this.validMethodId === false) {
                Chaplin.utils.redirectTo({controller: 'methods', action: 'show'});
            }

            var conf = {
                region: 'main',
                standardCollection: this.collection
            };

            //Pass the valid id to view if valid
            if (this.validstandardId === true) {
                conf.id = params.id;
            } else {
                Backbone.history.navigate('#methods/' , {trigger: false});
            }

            this.view = new View(conf);
        }

    });


    return MethodsController;
});
