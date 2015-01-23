// relative or absolute path of Components' main.js
//risoluzione delle dipendenze relativa alla posizione del file questo
require([
    '../../submodules/fenix-ui-catalog/js/paths',
    '../../submodules/fenix-ui-analysis/js/paths',
   '../../submodules/fenix-ui-filter/src/js/paths',
    '../../submodules/fenix-ui-common/js/Compiler'
], function (Catalog, Analysis, Filter, Compiler) {
//], function (Catalog, Analysis, Compiler) {


    var override = {
        "fenix-ui-topmenu": '../components/fenix-ui-topmenu'
    };

    var catalogConfig = Catalog;
    catalogConfig['baseUrl'] = '../../submodules/fenix-ui-catalog/js';

    var analysisConfig = Analysis;
    analysisConfig['baseUrl'] = '../../submodules/fenix-ui-analysis/js/';
    analysisConfig['override'] = override;

    var filtersConfig = Filter;
    filtersConfig['baseUrl'] = '../../submodules/fenix-ui-filter/';
    filtersConfig['override'] = override;

    Compiler.resolve([catalogConfig, analysisConfig, filtersConfig],{
        placeholders:  {"FENIX_CDN": "//fenixapps.fao.org/repository"},
        config: {

            // The path where your JavaScripts are located
            //baseUrl: '../scripts/analysi',

            // Specify the paths of vendor libraries
            paths: {
                'amplify' : '{FENIX_CDN}/js/amplify/1.1.2/amplify.min'
            },

            // Underscore and Backbone are not AMD-capable per default,
            // so we need to use the AMD wrapping of RequireJS
            shim: {
            }
            // For easier development, disable browser caching
            // Of course, this should be removed in a production environment
            //, urlArgs: 'bust=' +  (new Date()).getTime()
        }
    });
//    Compiler.resolve([catalogConfig, analysisConfig], {"FENIX_CDN": "//fenixapps.fao.org/repository"});

    require(["fenix-ui-topmenu/main", "../fx_analysis/application"], function (TopMenu, Application) {

        new TopMenu({
            url: 'json/fenix-ui-topmenu_config.json', active: "analysis"
        });

        var app = new Application();

        app.init();

//        require(['fx-ana/start', 'fx-cat-br/start', 'fx-filter/start'],
////        require(['fx-ana/start', 'fx-cat-br/start'],
//            function (Analysis, Catalog, Filter) {
//
//                //new Filter ( your config)
//
//                console.log("Before filter2!!!")
//            new Analysis().init({
//                catalog: new Catalog({
//                    catalog: {
//                        BLANK_FILTER: 'config/submodules/catalog/uae-catalog-blank-filter.json'
//                    },
//                    results: {
//                        actions: {
//                            EDIT_METADATA: {}
//                        }
//                    }
//                }),
//                filter: new Filter().init()
//            });
//
//        }); //end require FENIX component

    });  //end require Top Menu
});