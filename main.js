/*global require*/

require([
    './submodules/fenix-ui-common/js/Compiler',
    './submodules/fenix-ui-common/js/paths',
    './submodules/fenix-ui-menu/js/paths',
    './submodules/fenix-ui-analysis/js/paths',
    './submodules/fenix-ui-catalog/js/paths',
    './submodules/fenix-ui-DataEditor/js/paths',
    './submodules/fenix-ui-DSDEditor/js/paths',
/*
    './submodules/fenix-ui-dataUpload/js/paths',
*/
    './submodules/fenix-ui-metadata-editor/js/paths',
    './submodules/fenix-ui-metadata-viewer/js/paths',
    './submodules/json-editor-faostat-theme/src/js/paths',
    './submodules/fenix-ui-map-creator/src/js/paths',
    './submodules/fenix-ui-chart-creator/src/js/paths',
    './submodules/fenix-ui-table-creator/src/js/paths',
    './submodules/fenix-ui-reports/src/js/paths',
    './submodules/fenix-ui-dashboard/src/js/paths',
    './submodules/fenix-ui-filter/src/js/paths'

], function (Compiler, Common, Menu, Analysis, Catalog,
             DataEditor, DSDEditor, /*DataUpload,*/MetadataEditor, MetadataViewer,FAOSTAT_THEME,
             MapCreator,ChartCreator, TableCreator, FenixReport, Dashboard, Filter  ) {

    'use strict';



    var submodules_path = '../../submodules/';

    var commonConfig = Common;
    commonConfig.baseUrl = submodules_path + 'fenix-ui-common/js';

    var menuConfig = Menu;
    menuConfig.baseUrl = submodules_path + '/fenix-ui-menu/js';

    var analysisConfig = Analysis;
    analysisConfig.baseUrl = submodules_path +'fenix-ui-analysis/js/';

    var catalogConfig = Catalog;
    catalogConfig.baseUrl = submodules_path +'fenix-ui-catalog/js/';

    var dataEditorConfig = DataEditor;
    dataEditorConfig.baseUrl = submodules_path +'fenix-ui-DataEditor/js/';

    var dsdEditorConfig = DSDEditor;
    dsdEditorConfig.baseUrl = submodules_path +'fenix-ui-DSDEditor/js/';
/*
    var dataUploadConfig = DataUpload;
    dataUploadConfig.baseUrl = submodules_path + 'fenix-ui-dataUpload/js/';*/

    var metadataEditorConfig = MetadataEditor;
    metadataEditorConfig.baseUrl = submodules_path +'fenix-ui-metadata-editor/js/';

    var metadataViewerConfig = MetadataViewer;
    metadataViewerConfig.baseUrl= submodules_path +'fenix-ui-metadata-viewer/js/';

    var faostatThemeConfig = FAOSTAT_THEME;
    faostatThemeConfig.baseUrl = submodules_path + 'json-editor-faostat-theme/src/js';

    var mapCreatorConfig = MapCreator;
    mapCreatorConfig.baseUrl= submodules_path +'fenix-ui-map-creator/src/js/';

    var chartCreatorConfig = ChartCreator;
    chartCreatorConfig.baseUrl= submodules_path +'fenix-ui-chart-creator/src/js/';

    var tableCreatorConfig = TableCreator;
    tableCreatorConfig.baseUrl= submodules_path +'fenix-ui-table-creator/src/js/';

    var fenixReportConfig = FenixReport;
    fenixReportConfig.baseUrl= submodules_path +'fenix-ui-reports/src/js/';

    var dashboardConfig = Dashboard;
    dashboardConfig.baseUrl= submodules_path +'fenix-ui-dashboard/src/js/';

    var filterConfig = Filter;
    filterConfig.baseUrl =  submodules_path +'fenix-ui-filter/';

    Compiler.resolve([commonConfig, menuConfig, analysisConfig,catalogConfig,
            dataEditorConfig,dsdEditorConfig,/*dataUploadConfig,*/metadataEditorConfig,metadataViewerConfig,faostatThemeConfig,
            mapCreatorConfig,chartCreatorConfig,tableCreatorConfig,fenixReportConfig,filterConfig, dashboardConfig],
        {
            placeholders: {"FENIX_CDN": "//fenixrepo.fao.org/cdn"},

            config: {

                //Set the config for the i18n
                i18n: {
                    locale: 'en'
                },

                // The path where your JavaScripts are located
                baseUrl: './src/js',

                // Specify the paths of vendor libraries
                paths: {
                    bootstrap: "{FENIX_CDN}/js/bootstrap/3.3.4/js/bootstrap.min",
                    underscore: "{FENIX_CDN}/js/underscore/1.7.0/underscore.min",
                    backbone: "{FENIX_CDN}/js/backbone/1.1.2/backbone.min",
                    handlebars: "{FENIX_CDN}/js/handlebars/2.0.0/handlebars",
                    chaplin: "{FENIX_CDN}/js/chaplin/1.0.1/chaplin.min",
                    domReady: "{FENIX_CDN}/js/requirejs/plugins/domready/2.0.1/domReady",
                    i18n: "{FENIX_CDN}/js/requirejs/plugins/i18n/2.0.4/i18n",
                    text: '{FENIX_CDN}/js/requirejs/plugins/text/2.0.12/text',
                    rsvp: '{FENIX_CDN}/js/rsvp/3.0.17/rsvp',
                    "bootstrap-list-filter" :'{FENIX_CDN}/js/bootstrap-list-filter/0.2.1/bootstrap-list-filter.min',
                    "highcharts" : '//code.highcharts.com/highcharts',
                    "swiper" :"{FENIX_CDN}/js/swiper/3.0.7/dist/js/swiper.min",
                    amplify: '{FENIX_CDN}/js/amplify/1.1.2/amplify.min',

                    nls: "../../i18n",
                    config: "../../config",
                    json: "../../json",

                    'webix' : 'http://fenixrepo.fao.org/cdn/js/webix/2.2.1/js/webix',

                    'fx-common/config/auth_users' : '../../config/auth_users.json',

                    "fx-cat-br/config/fx-catalog-blank-filter": '../../config/submodules/fx-catalog/blankFilter',

                    'fx-ana/config/services' : '../../config/submodules/fx-analysis/Config',

                    'fx-filter/config/config' : '../../config/submodules/fx-filter/Config',

                    'fx-cat-br/config/config': '../../config/submodules/fx-catalog/configAnalisi',

                    'fx-ds/config/config' : '../../config/submodules/fx-dashboard/config'

                },

                // Underscore and Backbone are not AMD-capable per default,
                // so we need to use the AMD wrapping of RequireJS
                shim: {
                    bootstrap: {
                        deps: ["jquery"]
                    },
                    underscore: {
                        exports: '_'
                    },
                    backbone: {
                        deps: ['underscore', 'jquery'],
                        exports: 'Backbone'
                    },
                    handlebars: {
                        exports: 'Handlebars'
                    }
                }
                // For easier development, disable browser caching
                // Of course, this should be removed in a production environment
                //, urlArgs: 'bust=' +  (new Date()).getTime()
            }
        });

    // Bootstrap the application
    require([
        'application',
        'routes',
        'config/Config',
        'domReady!'
    ], function (Application, routes, C) {

        var app = new Application({
            routes: routes,
            controllerSuffix: C.CHAPLINJS_CONTROLLER_SUFFIX,
            root: C.CHAPLINJS_PROJECT_ROOT,
            pushState: C.CHAPLINJS_PUSH_STATE,
            scrollTo: C.CHAPLINJS_SCROLL_TO
        });
    });
});