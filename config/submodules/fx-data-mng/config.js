/*global define*/
define(['jquery',
        'fx-submodules/config/baseConfig'],
    function ($, config_base) {

        'use strict';

        var cfg = {};
        $.extend(cfg, config_base);

        cfg.TOP_MENU = {
            url: './config/submodules/fx-menu/top_menu_data_mng.json',
            active: "datamng",
            template: 'fx-menu/templates/blank-fluid.html',
            container: "#top-menu-container"
        };

        cfg.DSD_EDITOR_CONTEXT_SYSTEM = "UAE";
        cfg.DSD_EDITOR_DATASOURCES = ["D3S"];

        cfg.METADATA_EDITOR_AJAX_EVENT_CALL = "./config/submodules/fx-data-mng/fx-metadata-editor-ajax-config.json";

        return cfg;
    });