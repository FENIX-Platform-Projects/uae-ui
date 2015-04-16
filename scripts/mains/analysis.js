/*global require*/
require([
    '../../submodules/fenix-ui-catalog/js/paths',
    '../../submodules/fenix-ui-analysis/js/paths',
    '../../submodules/fenix-ui-menu/js/paths',
    '../../submodules/fenix-ui-table-creator/src/js/paths',
    '../../submodules/fenix-ui-common/js/Compiler'
], function (Catalog, Analysis, Menu, TableCreator, Compiler) {

    'use strict';

    var catalogConfig = Catalog;
    catalogConfig.baseUrl = '../../submodules/fenix-ui-catalog/js';

    var analysisConfig = Analysis;
    analysisConfig.baseUrl = '../../submodules/fenix-ui-analysis/js/';

    var menuConfig = Menu;
    menuConfig.baseUrl = '../../submodules/fenix-ui-menu/js';

    var tableCreatorConfig = TableCreator;
    tableCreatorConfig.baseUrl = '../../submodules/fenix-ui-table-creator/src/js';

    Compiler.resolve([catalogConfig, analysisConfig, menuConfig, tableCreatorConfig], {
        placeholders: {"FENIX_CDN": "//fenixapps.fao.org/repository"},
        config: {

            // Specify the paths of vendor libraries
            paths: {
                host: '../analysis/host',
                underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",

                //Components configuration
                'fx-cat-br/config/services' : '../../config/submodules/catalog/services',
                'fx-ana/config/services' : '../../config/submodules/analysis/services'
            },

            // Underscore and Backbone are not AMD-capable per default,
            // so we need to use the AMD wrapping of RequireJS
            shim: {
                underscore: {
                    exports: '_'
                }
            }
            // For easier development, disable browser caching
            // Of course, this should be removed in a production environment
            //, urlArgs: 'bust=' +  (new Date()).getTime()
        }
    });

    require(['host'], function (Host) {

        new Host().start();

    });
});