/*global require*/


// relative or absolute path of Components' main.js

define(['module'], function (module) {

    var userConfig = module.config();

    var override = {

        "fenix-ui-topmenu": '../components/fenix-ui-topmenu',
        'jqxall': "http://fenixapps.fao.org/repository/js/jqwidgets/3.1/jqx-all",
        'jquery': '../../node_modules/jquery/dist/jquery.min',
        'bootstrap': '../../node_modules/bootstrap/dist/js/bootstrap.min'
    };

    require(['../../submodules/fenix-ui-metadata-editor/js/paths',
        '../../submodules/fenix-ui-DSDEditor/js/paths',
        '../../submodules/fenix-ui-DataEditor/js/paths'
    ], function (MetadataEditor, Editor, DataEditor) {

        // NOTE: This setTimeout() call is used because, for whatever reason, if you make
        //       a 'require' call in here or in the Cart without it, it will just hang
        //       and never actually go fetch the files in the browser. There's probably a
        //       better way to handle this, but I don't know what it is.
        setTimeout(function () {

            /*
             @param: prefix of Components paths to reference them also in absolute mode
             @param: paths to override
             @param: options passed in to override defaults
             @param: callback function
             */
            MetadataEditor.initialize('../../submodules/fenix-ui-metadata-editor/js', override, userConfig, function () {

                Editor.initialize('../../submodules/fenix-ui-DSDEditor/js', override, function () {

                    DataEditor.initialize('../../submodules/fenix-ui-DataEditor/js', null, function () {




                        require([
                            'fx-editor/start',
                            'fenix-ui-topmenu/main',
                            'fx-DSDEditor/start',
                            'fx-DataEditor/start'
                        ], function (StartUp, TopMenu, E, DE) {

                            new StartUp().init(userConfig);

                            new TopMenu({
                                url: 'json/fenix-ui-topmenu_config.json', active: "createdataset"
                            });

                            E.init();

                            DE.init();

                            window.setTimeout(function () {

                                $('#DSDEditorContainer').hide();
                                $('#DataEditorContainer').hide();
                            }, 2000);

                            document.body.addEventListener("fx.editor.finish", function (e) {
                                console.log(e.detail.data);

                                $('#metadataEditorContainer').hide();
                                $('#DSDEditorContainer').show();

                            }, false);

                            $('body').on("columnEditDone.DSDEditor.fenix", function (e, p) {
                                //$('#DSDEditorContainer').hide();
                                //$('#DataEditorContainer').show();
                                location.reload();
                                //DE.set({"dsd": {columns: p.payload}  });
                            })

                            $('#createDatasetEnd').on('click', function () {
                                location.reload();
                            })

                        });






                    });

                });

            });

        }, 0);
    });

});
