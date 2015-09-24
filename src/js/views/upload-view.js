/*global define, amplify*/
define([
    'jquery',
    'views/base/view',
    'text!templates/upload/upload.hbs',
    'i18n!nls/upload',
    'config/Events',
    'fx-common/fx-upload-client',
    'amplify'
], function ($, View, template, i18nLabels, E, Uploader) {

    'use strict';

    var s = {
        UPLOAD_CONTAINER: '#uploader-container'
    };

    var UploadView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: 'upload',

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
            amplify.publish(E.STATE_CHANGE, {menu: 'upload'});

            this.initUploadComponent();

        },

        initUploadComponent: function() {

            this.uploader = new Uploader();

            this.uploader.render({
                container : s.UPLOAD_CONTAINER
            });


        }
    });

    return UploadView;
});
