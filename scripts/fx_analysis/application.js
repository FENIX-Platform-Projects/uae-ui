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

        this.analysis = new Analysis().init();

        this.catalog = new Catalog().init({
            BLANK_FILTER: 'config/submodules/catalog/uae-catalog-blank-filter.json',
            container: document.querySelector('#catalogContainer'),
            results: {
                actions: {
                    SELECT_RESOURCE: {
                        event: 'open',
                        labels : {
                            EN : 'Open Resource'
                        }
                    }
                }
            }

        });

        this.filter = new Filter();
    };

    Application.prototype.bindEventListeners = function () {

        var self = this;

        amplify.subscribe('fx.widget.catalog.open', function(){
            console.log("open catalog")
            //that.closeOverlay();

            //here

        })


/*        *//*Event triggered by the catalog when "Open Data" button is clicked*//*
        $(this.o.selectors.EVENTS_LISTENERS).on('analyze', function (e, payload) {

            that.getData(payload, $.proxy(that.addItemToDesk, that))
        });*/


    };



    Application.prototype.initAnimation = function () {

        var that = this;

        $('.overlay-content').hide();

        $("#btn").on('click', that.openOverlay);

        $(".closeOverlay").on('click', function (e) {
            console.log("close overlay")
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
                    console.log("on complete open the catalog")
                    $('.overlay-content').fadeIn('fast');
                }
            });
    };

    Application.prototype.closeOverlay = function () {
        $('.overlay-content').fadeOut("fast", function () {
            console.log("fadeout fast")

            $('.overlay-content').hide();
            TweenLite.to($("#overlay"), 1, { width: "0%", height: "0%", ease: Power2.easeInOut});

        })
    };

    //FILTER FUNCTION
    Application.prototype.filterApply = function () {
        var that = this;

        // Object { code_ITEM=[2], code_FLAG=[1], year_TIME=[2]}
        $('.overlay-content').fadeOut("fast", function () {
            $('.overlay-content').hide();
            TweenLite.to($("#overlay"), 1, { width: "0%", height: "0%", ease: Power2.easeInOut});
            //that.getData(payload, $.proxy(that.addItemToDesk, that));
//            that.showFilter();

            var selected_filter_values = that.filter.getValues(true);
            console.log("selected_filter_values")
            console.log(selected_filter_values)
            var original_data = that.filter.original_data;
            var filtered_data = that.filter.dataParser(selected_filter_values);

            that.addItemToDesk(filtered_data);
        })
    };


    return Application;

});
