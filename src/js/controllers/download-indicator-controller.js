/*global define, Backbone*/
define([
    'chaplin',
    'config/Config',
    'controllers/base/controller',
    'views/download/download-view'
], function (Chaplin, Config, Controller, View) {

    'use strict';

    var DownloadCountryController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main',
                params: params,
                section : Config.DOWNLOAD_BY_INDICATOR
            });
        }
    });

    return DownloadCountryController;
});
