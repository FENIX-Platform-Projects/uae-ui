define([
    'fx-ana/start',
    'fx-cat-br/start',
    'fx-filter/start',
    'amplify'
], function (Analysis, Catalog, Filter) {

    function Application(options) {

        if (this.o === undefined) {
            this.o = {};
        }
        //$.extend(true, this.o, defaultOptions, options);
    }

    Application.prototype.init = function () {

        this.bindEvents();
        this.initFxComponents();
    };

    Application.prototype.initFxComponents = function () {

        console.log("Before filter2!!!")
        new Analysis().init({
            catalog: new Catalog({
                catalog: {
                    BLANK_FILTER: 'config/submodules/catalog/uae-catalog-blank-filter.json'
                },
                results: {
                    actions: {
                        EDIT_METADATA: {}
                    }
                }
            })
        });

        var filter = new Filter().init();
    };

    Application.prototype.bindEvents = function () {

    };

    return Application;

});
