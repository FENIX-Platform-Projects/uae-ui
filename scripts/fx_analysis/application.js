/*global define, TweenLite*/

define([
    'jquery',
    'fx-ana/start',
    'fx-cat-br/start',
    'fx-filter/start',
    'fx-filter/utils',
    'fx-menu/start',
    'amplify'
], function ($, Analysis, Catalog, Filter, FilterUtils, Menu) {

    'use strict';

    var s = {
        CATALOG_CONTAINER: '#catalogContainer',
        FILTER_CONTAINER: '#filterContainer',
        FILTER_HOLDER : '#filterHolder',
        FILTER_BTN : '#get_filter_values'
    };

    function Application(options) {

        if (this.o === undefined) {
            this.o = {};
        }
        //$.extend(true, this.o, defaultOptions, options);
    }

    Application.prototype.init = function () {

        this.bindEventListeners();
        this.initFxComponents();
        this.initAnimation();
    };

    Application.prototype.initFxComponents = function () {

        this.analysis = new Analysis().init();

        this.catalog = new Catalog().init({
            bridge: {
                blankFilter : 'config/submodules/catalog/uae-catalog-blank-filter.json'
            },
            container: document.querySelector(s.CATALOG_CONTAINER),
            results: {
                actions: {
                    SELECT_RESOURCE: {
                        event: 'open',
                        labels: {
                            EN: 'Open Resource'
                        }
                    }
                }
            }

        });

        this.filter = new Filter();
        this.filter.init({
            container: s.FILTER_CONTAINER,
            plugin_prefix: '../../../submodules/fenix-ui-filter/'
        });

        //TopMenu
        this.topMenu = new Menu({
            url: 'config/submodules/fx-menu/uae-topmenu-config.json',
            active: "createdataset"
        });
    };

    Application.prototype.addToFilter = function (resource) {

        this.resource = resource;

        this.filter.add(FilterUtils.createConfiguration(resource));
    };


    Application.prototype.bindEventListeners = function () {

        amplify.subscribe('fx.widget.catalog.open', this, function (resource) {


            $(s.CATALOG_CONTAINER).hide();

            this.analysis.getData(resource, $.proxy(this.addToFilter, this))

        });

        $(s.FILTER_BTN).on('click', $.proxy(this.filterResource , this));


        /*        */
        /*Event triggered by the catalog when "Open Data" button is clicked*/
        /*
         $(this.o.selectors.EVENTS_LISTENERS).on('analyze', function (e, payload) {

         that.getData(payload, $.proxy(that.addItemToDesk, that))
         });*/


        /*
         * FILTER
         *
         *
         *         $('body').on("fx.host.component.ready", function (event, properties) {

         //The host can set now the domain
         fc.setDomain("FirstComponent", [{"label": "l10", "value":"v10"}, {"label": "l20", "value":"v20"}]);
         });
         * */


    };

    Application.prototype.filterResource = function () {
        var filtered = FilterUtils.filterData(this.resource, this.filter.getValues());
        this.analysis.add(filtered);
        this.closeOverlay();
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
                    $('.overlay-content').fadeIn('fast');
                }
            });
    };

    Application.prototype.closeOverlay = function () {
        $('.overlay-content').fadeOut("fast", function () {

            $('.overlay-content').hide();
            TweenLite.to($("#overlay"), 1, {
                width: "0%", height: "0%", ease: Power2.easeInOut, onComplete: function () {

                    $(s.FILTER_HOLDER).hide();
                    $(s.CATALOG_CONTAINER).show();
                }
            });

        })
    };

    //FILTER FUNCTION
    Application.prototype.filterApply = function () {
        var that = this;

        // Object { code_ITEM=[2], code_FLAG=[1], year_TIME=[2]}
        $('.overlay-content').fadeOut("fast", function () {
            $('.overlay-content').hide();
            TweenLite.to($("#overlay"), 1, {width: "0%", height: "0%", ease: Power2.easeInOut});
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
