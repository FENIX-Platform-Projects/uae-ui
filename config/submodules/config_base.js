/*global define*/
define([], function () {

    'use strict';

    //Use the following example to override properties:
    //services.SERVICE_BASE_ADDRESS = "http://fenix.fao.org/d3s_dev2/msd";
    var services = {
        //Prod server
        //SERVICE_BASE_ADDRESS: "http://fenixservices.fao.org/d3s/msd"
        //SERVICE_BASE_ADDRESS: 'http://fenix.fao.org/d3s_fenix/msd'
        //SERVICE_BASE_ADDRESS: "http://fenix.fao.org/d3s_dev/msd"
        //demo
        //SERVICE_BASE_ADDRESS: "http://fenix.fao.org/d3s/msd",
        SERVICE_BASE_ADDRESS: "http://fenixservices.fao.org/d3s/msd",

        DSD_EDITOR_CODELISTS: "config/submodules/DSDEditor/CodelistsUneca.json"

    };

    return services;
});