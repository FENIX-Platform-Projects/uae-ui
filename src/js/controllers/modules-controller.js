/*global define*/
define([
    'controllers/base/controller',
    'views/modules-view'
], function (Controller, HomeView) {
    'use strict';

    var HomeController = Controller.extend({

        show: function (params) {

            this.view = new HomeView({
                region: 'main'
            });
        }
    });

    return HomeController;
});
