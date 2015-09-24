/*global define*/
define([
    'controllers/base/controller',
    'views/modules-view'
], function (Controller, View) {
    'use strict';

    var ModulesController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return ModulesController;
});
