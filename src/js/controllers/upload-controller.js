/*global define*/
define([
    'controllers/base/controller',
    'views/upload-view'
], function (Controller, View) {
    'use strict';

    var UploadController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return UploadController;
});
