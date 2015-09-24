/* global define */
/*global define*/
define(['jquery', 'fx-submodules/config/baseConfig'],
    function ($, config_base) {

        'use strict';

        //Use the following example to override properties:
        //services.SERVICE_BASE_ADDRESS = "http://fenix.fao.org/d3s_dev2/msd";

        /*var services = {

         TOP_MENU: {
         url: 'json/fenix-ui-topmenu_config.json',
         active: "createdataset"
         },
         SERVICE_BASE_ADDRESS: "http://fenix.fao.org/d3s_dev/msd"
         };*/

        var cfg = {};
        $.extend(cfg, config_base);

        // configuration data management
        cfg.DSD_EDITOR_CODELISTS = "config/submodules/DSDEditor/CodelistsUneca.json";
        //cfg.DSD_EDITOR_CONTEXT_SYSTEM = "UNECA";
        cfg.DSD_EDITOR_CONTEXT_SYSTEM = "uneca";

        //cfg.METADATA_EDITOR_AJAX_EVENT_CALL = "config/submodules/metadataEditor/fx-editor-ajax-config_DEMO.json";
        cfg.METADATA_EDITOR_AJAX_EVENT_CALL = "config/submodules/metadataEditor/fx-editor-ajax-config_PROD.json";



        cfg.TOP_MENU= {
            container : '#top-menu-container',
            url: 'config/submodules/fx-menu/top_menu_data_mng.json',
            template: 'fx-menu/templates/blank-fluid.html',
            active: "datamgmt"
        };

        cfg.FAKE_AUTHENTICATION = false;

        return cfg;

});
