/*global define, requirejs*/
define([
    'handlebars',
    'underscore',
    'chaplin'
], function (Handlebars, _, Chaplin) {

    'use strict';

    // Application-specific utilities
    // ------------------------------

    // Delegate to Chaplin’s utils module
    var utils = Chaplin.utils.beget(Chaplin.utils);

    // Add additional application-specific properties and methods

    // _(utils).extend({
    //   someProperty: 'foo',
    //   someMethod: function() {}
    // });

    Handlebars.registerHelper('isI18n', function (keyword) {

        if (typeof keyword === 'object') {

            var lang = requirejs.s.contexts._.config.i18n.locale;
            return keyword[lang.toUpperCase()];
        }
        else {
            return keyword;
        }
    });

    Handlebars.registerHelper('i18n', function (keyword) {

        var lang = requirejs.s.contexts._.config.i18n.locale;

        return keyword[lang.toUpperCase()];
    });


    Handlebars.registerHelper("each_with_index_1", function(array, fn) {

        var result = '';
        var lang = requirejs.s.contexts._.config.i18n.locale;
        var index = array.data.index +1

        if(index ===1 || index%4 === 1 ){

        }

        // return the finished buffer
        return result;

    });

    Handlebars.registerHelper("list_countries_creator", function(array, fn) {

        var countries= array.data.root.countries;
        var lang = requirejs.s.contexts._.config.i18n.locale;
        lang = lang.toUpperCase();
        var result = '';

        var firstDone = false;
        var secondDone = false;
        for(var i = 0, length = countries.length; i<length; i++) {
            // first
            if(i===0 || i %3 ===0){
                //result+= '<div>';
                result+= '<div class="col-md-4 country-item">' +
                    '<a href="profile/'+countries[i].code+'">'
                    +countries[i].title[lang]+'</a></div>';
                firstDone = true;
            }else if(i===1 || firstDone) {
                result+= '<div class="col-md-4 country-item">' +
                    '<a href="profile/'+countries[i].code+'">'
                    +countries[i].title[lang]+'</a></div>';
                firstDone = false;
                secondDone  =true;
            }else if (i===2 || secondDone) {
                result+= '<div class="col-md-4 country-item">' +
                    '<a href="profile/'+countries[i].code+'">'
                    +countries[i].title[lang]+'</a></div>';
                //result+= '</div>';
                secondDone  =false;
            }
        }
       /* if(length%3 !== 0) {
            result+= '</div>';
        }*/
        return new Handlebars.SafeString(result);

    });




    utils.getLabel = function (obj) {
        return obj[requirejs.s.contexts._.config.i18n.locale.toUpperCase()];
    };
    

    return utils;
});
