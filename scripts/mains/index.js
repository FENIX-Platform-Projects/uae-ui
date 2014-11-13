requirejs.config({

    "baseUrl": "scripts/lib",

    "paths": {
        "host": '../index/host',
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        "bootstrap": "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        "fenix-ui-topmenu": '../components/fenix-ui-topmenu',
        "highcharts" : '//code.highcharts.com/highcharts'
    },

    shim: {
        "bootstrap": {
            deps: ["jquery"]
        },
        "highcharts": {
            deps: ["jquery"]
        }
    }
});

require(['host', 'bootstrap', 'domReady!'], function (Host) {

    var host = new Host();
    host.initFenixComponent();

});