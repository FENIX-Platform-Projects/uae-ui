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
        FILTER_BTN : '#get_filter_values',
        events: {
            FILTER_OPEN_WRAPPER_APP: "filterOpenWrapperApp"
        }
    };

    function Application(options) {

        if (this.o === undefined) {
            this.o = {};
        }
        $.extend(true, this.o, s, options);
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

//        this.filterUtils = new FilterUtils();
//
//        this.filter = new Filter();
//        this.filter.init({
//            container: s.FILTER_CONTAINER,
//            plugin_prefix: '../../../submodules/fenix-ui-filter/'
//        });

        //TopMenu
        this.topMenu = new Menu({
            url: 'config/submodules/fx-menu/uae-topmenu-config.json',
            active: "createdataset"
        });
    };

    Application.prototype.addToFilter = function (resource) {

        this.resource = {original_data :resource};
        this.recreateFilter(this, this.resource);
    };


    Application.prototype.bindEventListeners = function () {

        var that = this;
        amplify.subscribe('fx.widget.catalog.open', this, function (resource) {
            $(s.CATALOG_CONTAINER).hide();
            this.analysis.getData(resource, $.proxy(this.addToFilter, this))
        });

        $(s.FILTER_BTN).on('click', $.proxy(this.filterResource , this));

        amplify.subscribe(that.o.events.FILTER_OPEN_WRAPPER_APP, function (container, model) {
            that.resource = model;
            that.recreateFilter(that, model);
        });
    };

    Application.prototype.recreateFilter = function (obj, model) {

        this.openOverlay(function() {

            $(s.FILTER_HOLDER).show();
            $(s.CATALOG_CONTAINER).hide();

            obj.filter = new Filter();
            obj.filter.init({
                container: s.FILTER_CONTAINER,
                plugin_prefix: '../../../submodules/fenix-ui-filter/'
            });

            obj.filter.original_data = model.original_data;

            this.filterUtils = new FilterUtils();

            this.filter.add(this.filterUtils.createConfiguration(model));
        });
    }

    Application.prototype.filterResource = function () {
        var selected_data = this.filter.getValues();
        var filtered = (this.filterUtils.filterData(this.resource, this.filter.getValues())).original_data;

        var objectToAnalysis = {};
        $.extend(true, objectToAnalysis, {original_data : this.resource.original_data, filtered_data : filtered, selected_data : selected_data});

        this.analysis.add(objectToAnalysis);
        this.closeOverlay();
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

    Application.prototype.openOverlay = function (cb) {

        //var callback=  $.proxy(cb, this);
        var callback = typeof  cb === 'function' ? $.proxy(cb, this) : null;

        TweenLite.to(
            document.querySelector("#overlay"), 1,
            {
                width: "100%",
                height: "100%",
                ease: Power2.easeInOut,
                onComplete: function () {
                    $('.overlay-content').fadeIn('fast');
                    //callback();
                    if (callback)
                        {callback();}
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

//    //FILTER FUNCTION
//    Application.prototype.filterApply = function () {
//        var that = this;
//
//        // Object { code_ITEM=[2], code_FLAG=[1], year_TIME=[2]}
//        $('.overlay-content').fadeOut("fast", function () {
//            $('.overlay-content').hide();
//            TweenLite.to($("#overlay"), 1, {width: "0%", height: "0%", ease: Power2.easeInOut});
//            var selected_filter_values = that.filter.getValues(true);
//            var original_data = that.filter.original_data;
//
//            console.log("After GetValues click")
//            console.log(selected_filter_values)
//            var filtered_data = that.filter.dataParser(selected_filter_values);
//            that.addItemToDesk(filtered_data);
//        })
//    };

    return Application;

});
