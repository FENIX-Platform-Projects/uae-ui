// relative or absolute path of Components' main.js
//risoluzione delle dipendenze relativa alla posizione del file questo
require([
    '../../submodules/fenix-ui-catalog/js/paths',
    '../../submodules/fenix-ui-analysis/js/paths',
   '../../submodules/fenix-ui-filter/src/js/paths',
    '../../submodules/fenix-ui-common/js/Compiler',
    '../../submodules/fenix-ui-menu/js/paths'
], function (Catalog, Analysis, Filter, Compiler, Menu) {

    var catalogConfig = Catalog;
    catalogConfig['baseUrl'] = '../../submodules/fenix-ui-catalog/js';

    var analysisConfig = Analysis;
    analysisConfig['baseUrl'] = '../../submodules/fenix-ui-analysis/js/';

    var filtersConfig = Filter;
    filtersConfig['baseUrl'] = '../../submodules/fenix-ui-filter/';

    var menuConfig = Menu;
    menuConfig['baseUrl'] = '../../submodules/fenix-ui-menu/js';

    Compiler.resolve([catalogConfig, analysisConfig, filtersConfig, menuConfig],{
        placeholders:  {"FENIX_CDN": "//fenixapps.fao.org/repository"},
        config: {

            // The path where your JavaScripts are located
            //baseUrl: '../scripts/analysi',

            // Specify the paths of vendor libraries
            paths: {
                config : '../config',
                'amplify' : '{FENIX_CDN}/js/amplify/1.1.2/amplify.min'
            },

            // Underscore and Backbone are not AMD-capable per default,
            // so we need to use the AMD wrapping of RequireJS
            shim: {
                'amplify' : {
                    deps : ['jquery']
                }
            }
            // For easier development, disable browser caching
            // Of course, this should be removed in a production environment
            //, urlArgs: 'bust=' +  (new Date()).getTime()
        }
    });

    require([ "../fx_analysis/application"], function ( Application) {

        var app = new Application();

        app.init();

    });  //end require Top Menu
});