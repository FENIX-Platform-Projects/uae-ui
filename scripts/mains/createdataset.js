/*global require*/
// relative or absolute path of Components' main.js
require([
    '../../submodules/fenix-ui-DSDEditor/js/paths'
], function (Editor) {


    var override = {

        "fenix-ui-topmenu": '../components/fenix-ui-topmenu',
        'jqxall': "http://fenixapps.fao.org/repository/js/jqwidgets/3.1/jqx-all",
        'jquery': '../../node_modules/jquery/dist/jquery.min',
        'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap.min'
    };



// NOTE: This setTimeout() call is used because, for whatever reason, if you make
// a 'require' call in here or in the Cart without it, it will just hang
// and never actually go fetch the files in the browser. There's probably a
// better way to handle this, but I don't know what it is.
    setTimeout(function () {
        /*
         @param: prefix of Components paths to reference them also in absolute mode
         @param: paths to override
         @param: callback function
         */
        Editor.initialize('../../submodules/fenix-ui-DSDEditor/js', override, function () {
            require([
                'fx-DSDEditor/start'
                , 'fenix-ui-topmenu/main'
            ], function (E,TopMenu) {
                E.init();

                new TopMenu({
                    url: 'json/fenix-ui-topmenu_config.json', active: "createdataset"
                });

            });
        });
    }, 0);
});