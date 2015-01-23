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
        this.initAnimation();
        this.bindEventListeners();
        this.initFxComponents();
    };

    Application.prototype.initFxComponents = function () {

        this.analysis = new Analysis().init({
            results: {
                actions: {
                    EDIT_METADATA: {}
                }
            }
        });

        this.catalog = new Catalog().init({
            BLANK_FILTER: 'config/submodules/catalog/uae-catalog-blank-filter.json',
            container: document.querySelector('#catalogContainer')

        });

        this.filter = new Filter().init();
    };

    Application.prototype.bindEventListeners = function () {

        amplify.subscribe('fx.widget.catalog.', function(){
            alert()
        })


/*        *//*Event triggered by the catalog when "Open Data" button is clicked*//*
        $(this.o.selectors.EVENTS_LISTENERS).on('analyze', function (e, payload) {
            that.closeOverlay();
            that.getData(payload, $.proxy(that.addItemToDesk, that))
        });*/


    };



    Application.prototype.initAnimation = function () {

        var that = this;

        $('.overlay-content').hide();

        $("#btn").on('click', that.openOverlay);

        $(".closeOverlay").on('click', function (e) {
            e.stopPropagation();
            that.closeOverlay();
        });
    };

    Application.prototype.openOverlay = function () {

        TweenLite.to(
            document.querySelector("#overlay"), 1,
            {
                width: "100%",
                height: "100%",
                ease: Power2.easeInOut,
                onComplete: function () {
                    $('.overlay-content').fadeIn('fast');
                }
            });
    };

    Application.prototype.closeOverlay = function () {
        $('.overlay-content').fadeOut("fast", function () {

            $('.overlay-content').hide();
            TweenLite.to($("#overlay"), 1, { width: "0%", height: "0%", ease: Power2.easeInOut});

        })
    };

    return Application;

});
