/*global define, amplify*/
define([
    'jquery',
    'chaplin',
    'underscore',
    'config/Config',
    'config/Events',
    'globals/State',
    'views/base/view',
    'fx-menu/start',
    'fx-common/AuthManager',
    'i18n!nls/site',
    'text!templates/site.hbs'
], function ($, Chaplin, _, Config, E, State, View, Menu, AuthManager, i18nLabels, template) {

    'use strict';

    var s = {
        TOP_MENU_CONTAINER: '#top-menu-container',
        BREADCRUMB_CONTAINER: "#breadcrumb-container",
        FOOTER_MENU_CONTAINER: "#footer-menu-container"
    };

    var SiteView = View.extend({

        container: 'body',

        id: 'site-container',

        regions: {
            main: '#main-container'
        },

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            this.bindEventListeners();

            this.initComponents();
        },

        bindEventListeners: function () {
            amplify.subscribe(E.STATE_CHANGE, this, this.onStateUpdate);
        },

        initComponents: function () {

            var self = this,
                menuConf = {

                    url: Config.TOP_MENU_CONFIG,
                    template: 'fx-menu/templates/blank-fluid.html',
                    
                    //active: State.menu,
                    container: s.TOP_MENU_CONTAINER,
                    callback: _.bind(this.onMenuRendered, this),
                    breadcrumb: {
                        active: true,
                        container: s.BREADCRUMB_CONTAINER,
                        showHome: true
                    },
                    footer: {
                        active: true,
                        container: s.FOOTER_MENU_CONTAINER
                    }
                },
                menuConfAuth = _.extend({}, menuConf, {
                    hiddens: ['login']
                }),
                menuConfPub = _.extend({}, menuConf, {
                    hiddens: ['datamng', 'upload', 'logout']
                });

            this.authManager = new AuthManager({
                onLogin: function () {
                    self.topMenu.refresh(menuConfAuth);
                },
                onLogout: function () {
                    self.topMenu.refresh(menuConfPub);
                }
            });

            //Top Menu
            this.topMenu = new Menu(this.authManager.isLogged() ? menuConfAuth : menuConfPub);
        },

        onMenuRendered: function () {

            this.onMenuUpdate();

            amplify.subscribe(E.MENU_UPDATE, this, this.onMenuUpdate);
        },

        onStateUpdate: function (s) {

            State = $.extend(true, State, s);

            amplify.publish(E.MENU_UPDATE);
        },

        onMenuUpdate: function () {

            this.topMenu.select(State.menu);
        }
    });

    return SiteView;
});
