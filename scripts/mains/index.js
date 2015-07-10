/*global require*/
require([
    '../../submodules/fenix-ui-common/js/Compiler',
    '../../submodules/fenix-ui-common/js/paths',
    '../../submodules/fenix-ui-menu/js/paths'
], function (Compiler, Common, Menu) {

    'use strict';

    var menuConfig = Menu;
    menuConfig.baseUrl = '../../submodules/fenix-ui-menu/js';

    var commonConfig = Common;
    commonConfig.baseUrl = '../../submodules/fenix-ui-common/js';

    Compiler.resolve([menuConfig, commonConfig],
        {
            placeholders: {"FENIX_CDN": "//fenixapps.fao.org/repository"},

            config: {

                //Set the config for the i18n
                i18n: {
                    locale: 'en'
                },

                "paths": {
                    "host": '../index/host',
                    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
                    "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
                    "highcharts" : '//code.highcharts.com/highcharts',
                    "swiper" :"{FENIX_CDN}/js/swiper/3.0.7/dist/js/swiper.min"
                },

                shim: {
                    "bootstrap": {
                        deps: ["jquery"]
                    },
                    "highcharts": {
                        deps: ["jquery"]
                    }
                }
            }
        });

    require(['host', 'bootstrap', 'domReady!'], function (Host) {

        var host = new Host();
        host.initFenixComponent();

    });
});