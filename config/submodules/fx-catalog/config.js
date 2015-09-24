/*global define*/
define(['jquery', 'fx-submodules/config/baseConfig'],
    function ($, config_base) {

        'use strict';

        console.log(config_base)
        //Use the following example to override properties:
        //services.SERVICE_BASE_ADDRESS = "http://fenix.fao.org/d3s_dev2/msd";

        /*var services = {

         //SERVICE_BASE_ADDRESS : 'http://fenix.fao.org/d3s_fenix/msd'
         SERVICE_BASE_ADDRESS: 'http://fenix.fao.org/d3s_dev/msd'

         };*/
        var services = {};
        $.extend(services, config_base);

        services.CATALOG_BLANK_FILTER = 'config/submodules/fx-catalog/blank-filter.json';

        return services;
    });