// relative or absolute path of Components' main.js
//risoluzione delle dipendenze relativa alla posizione del file questo
require([
    '../../submodules/fenix-ui-catalog/js/paths',
    '../../submodules/fenix-ui-analysis/js/paths',
    '../../submodules/fenix-ui-filter/src/js/paths',
    '../../submodules/fenix-ui-common/js/Compiler'
], function (Catalog, Analysis, Filter, Compiler) {

    var override = {
        "fenix-ui-topmenu": '../components/fenix-ui-topmenu'
    };

    var catalogConfig = Catalog;
    catalogConfig['baseUrl'] = '../../submodules/fenix-ui-catalog/js';

    var analysisConfig = Analysis;
    analysisConfig['baseUrl'] = '../../submodules/fenix-ui-analysis/js/';
    //analysisConfig['override'] = override;

    var filtersConfig = Filter;
    filtersConfig['baseUrl'] = '../../submodules/fenix-ui-filter/src/js/';
    filtersConfig['override'] = override;

    Compiler.resolve([catalogConfig, analysisConfig, filtersConfig], {"FENIX_CDN": "//fenixapps.fao.org/repository"});

    require(["fenix-ui-topmenu/main"], function (TopMenu) {

        new TopMenu({
            url: 'json/fenix-ui-topmenu_config.json', active: "analysis"
        });

        require(['fx-ana/start', 'fx-cat-br/start', 'fx-filter/start'],
            function (Analysis, Catalog, Filter) {

                //new Filter ( your config)

            new Analysis().init({
                catalog: new Catalog({
                    catalog: {
                        BLANK_FILTER: 'config/submodules/catalog/uae-catalog-blank-filter.json'
                    },
                    results: {
                        actions: {
                            EDIT_METADATA: {}
                        }
                    }
                })
            });

        }); //end require FENIX component

    });  //end require Top Menu
});