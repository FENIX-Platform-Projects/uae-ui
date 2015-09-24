/*global define*/
define([
    'controllers/base/controller',
    'views/analysis-view'
], function (Controller, View) {
    'use strict';

    var
        AnalysisController = Controller.extend({

        show: function (params) {

            this.view = new View({
                region: 'main'
            });
        }
    });

    return AnalysisController;
});
