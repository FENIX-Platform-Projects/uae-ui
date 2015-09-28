/*global define, _:false, $, console, amplify, FM*/
define([
    'views/base/view',
    'config/Config',
    'config/Queries',
    'config/Events',
    'text!templates/home/home.hbs',
    'i18n!nls/home',
    'handlebars',
    'fx-common/WDSClient',
    'swiper',
    'highcharts',
    'amplify'
], function (View, C, Q, E, template, i18nLabels, Handlebars, WDSClient, Swiper) {

    'use strict';

    var s = {};

    var HomeView = View.extend({

        autoRender: true,

        className: 'home',

        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish(E.STATE_CHANGE, {menu: 'home'});

            this.initVariables();

            this.initComponents();

            this.bindEventListeners();

            this.configurePage();
        },

        initVariables: function () {
        },

        initComponents: function () {

            this.WDSClient = new WDSClient({
                serviceUrl: C.WDS_URL,
                datasource: C.DB_NAME,
                outputType: C.WDS_OUTPUT_TYPE
            });
        },

        configurePage: function () {
            this.initBannerSwiper();

            this.initChartSwiper();

            //very temp solution
            this.initCharts();

        },

        bindEventListeners: function () {
            var self = this;

            $('#home-charts-tab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                self.initCharts();
            });

        },

        initChartSwiper: function () {

            var mySwiper = new Swiper('#swiper-charts', {
                slidesPerView: 1,
                roundLengths: true,
                autoplay: 10000,
                simulateTouch: false,
                watchActiveIndex: true,
                loopAdditionalSlides: 0,
                loop: true,
                autoplayDisableOnInteraction: true,
                onSwiperCreated: function (Swiper) {
                    renderChart(Swiper.activeSlide());
                },
                onSlideChangeStart: function (Swiper) {
                    renderChart(Swiper.activeSlide());
                }
            });
            $('.arrow-left').on('click', function (e) {
                e.preventDefault();
                mySwiper.swipePrev()
            });
            $('.arrow-right').on('click', function (e) {
                e.preventDefault();
                mySwiper.swipeNext()
            });

            function renderChart(activeSlide) {

                $(activeSlide).find('.chart-container').highcharts(AMIS_home_charts[activeSlide.data('chart')])
            }


        },

        initBannerSwiper: function () {

            var bannerSwiper = new Swiper('#swiper-banner', {
                keyboardControl: false,
                autoplay: 5000,
                loop: true,
                autoplayDisableOnInteraction: false

            });

        },

        initCharts: function () {

            $('#chart1').highcharts({
                title: {
                    text: 'Gross Domestic Product'
                },
                credits: {
                    enabled: false
                },
                colors: [ //Colori delle charts
                    '#ca1a33',
                    '#986e2e',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                xAxis: {
                    categories: [
                        '2001',
                        '2002',
                        '2003',
                        '2004',
                        '2005',
                        '2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010',
                        '2011',
                        '2012',
                        '2013'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Million AED'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'UAE',
                    data: [379411.97, 403299.59, 456662.43, 542884.56, 663317.65, 815722.97, 947197.06, 1158580.53, 931152.67, 1050516.19, 1276025.00, 1367323.00, 1477594.25]

                }]
            });

            $('#chart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Trade'
                },
                credits: {
                    enabled: false
                },
                colors: [ //Colori delle charts
                    '#ca1a33',
                    '#986e2e',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                xAxis: {
                    categories: ['2001',
                        '2002',
                        '2003',
                        '2004',
                        '2005',
                        '2006',
                        '2007',
                        '2008',
                        '2009',
                        '2010', '2011']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Trade, World (value in AED)'
                    }
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'Re-Export',
                    data: [31444008427.00, 41124922234.00, 50696679981.00, 69515225632.00, 97043197533.00, 95580167401.00, 128338414920.29, 162844575681.00, 147693366837.24, 185863253742.03, 210842814591.00]
                }, {
                    name: 'Export',
                    data: [7535955504.00, 8649496688.00, 10588599116.00, 14615221779.00, 16462607861.00, 29232285857.00, 36262324842.00, 60359055129.00, 65278896533.54, 83077687322.91, 114038287878.38]
                },
                    {
                        name: 'Import',
                        data: [147775800078.00, 202896419979.00, 247589715083.00, 291048964687.00, 388356836394.00, 565719823370.00, 447393840482.09, 485413921745.90, 602757314852.26, 667520204394.26, 685068106621.00]
                    }]
            });

            $('#chart2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Arable and Permanent Crop Land Area, 1000 ha'
                },
                credits: {
                    enabled: false
                },
                colors: [ //Colori delle charts
                    '#ca1a33',
                    '#986e2e',
                    '#744490',
                    '#E10079',
                    '#2D1706',
                    '#F1E300',
                    '#F7AE3C',
                    '#DF3328'
                ],
                xAxis: {
                    categories: ['2010',
                        '2011',
                        '2012',
                        '2013']
                },
                yAxis: {
                    min: 0
                },
                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
                    shared: true
                },
                plotOptions: {
                    column: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'UAE',
                    data: [92.53, 88.50, 76.63, 77.24]
                }]
            });
        },

        unbindEventListeners: function () {

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }
    });


    return HomeView;
});
