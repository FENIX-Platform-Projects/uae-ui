/*global define*/
define(function () {

        'use strict';

    var CODELIST_PREFIX = 'http://fenixservices.fao.org/d3s/msd/resources/data/uid/'

        return {

            //Chaplin JS configuration
            CHAPLINJS_CONTROLLER_SUFFIX: '-controller',
            CHAPLINJS_PROJECT_ROOT: '/uneca/',
            CHAPLINJS_PUSH_STATE: false,
            CHAPLINJS_SCROLL_TO: false,
            CHAPLINJS_APPLICATION_TITLE: "UNECA Data Portal",

            //WDS configuration
            //DB_NAME: 'db_name',
            //WDS_URL: 'http://hqlprfenixapp2.hq.un.fao.org:10100/wds-5.2.1/rest/crud',
            //WDS_OUTPUT_TYPE: 'object',
            //WDS_OLAP_OUTPUT_TYPE : 'array',

            //Top Menu configuration
            TOP_MENU_CONFIG: 'config/submodules/fx-menu/top_menu.json',
            TOP_MENU_TEMPLATE: 'fx-menu/templates/blank-fluid.html',
            TOP_MENU_SHOW_BREADCRUMB : true,
            TOP_MENU_SHOW_BREADCRUMB_HOME : true,
            TOP_MENU_SHOW_FOOTER: false,
            TOP_MENU_AUTH_MODE_HIDDEN_ITEMS: ['login'],
            TOP_MENU_PUBLIC_MODE_HIDDEN_ITEMS :['datamgmt', 'logout'],

            SECURITY_NOT_AUTHORIZED_REDIRECTION_LINK : "home",

            COUNTRIES_CODE_LIST : CODELIST_PREFIX + "UNECA_ISO3",
            CODELIST_URL : CODELIST_PREFIX


/*
            CATALOG_BLANK_FILTER: "config/submodules/fx-catalog/blank-filter.json"
*/

        };
    });
