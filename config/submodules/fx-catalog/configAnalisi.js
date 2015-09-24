/*global define*/
define([], function () {

    'use strict';

    //Use the following example to override properties:
    //services.SERVICES_BASE_ADDRESS = "http://fenix.fao.org/d3s_dev2/msd";

    var services = {

        SERVICES_BASE_ADDRESS : 'http://fenix.fao.org/d3s/msd',
        CATALOG_BLANK_FILTER : 'config/submodules/catalog/afg-catalog-blank-filter.json'

        };

    return services;
});