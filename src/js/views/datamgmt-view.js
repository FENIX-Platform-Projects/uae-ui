/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/datamgmt/datamgmt.hbs',
    'i18n!nls/datamgmt',
    'config/Events',
    'amplify'
], function (View, template, i18nLabels, E) {

    'use strict';

    var DatamgmtView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'protected',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'protected'});

        }
    });

    return DatamgmtView;
});
