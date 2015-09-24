/*global define, amplify*/
define([
    'views/base/view',
    'text!templates/404.hbs',
    'amplify'
], function (View, template) {

    'use strict';

    var HomeView = View.extend({

        // Automatically render after initialize
        autoRender: true,

        className: '404',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish('voh.state.change', {menu: '404'});

        }
    });

    return HomeView;
});
