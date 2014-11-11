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

                            var uid = "";

                            window.setTimeout(function () {
                                /*E.setColumns([
                                    {"id": "CODE", "title": {"EN": "item"}, "key": true, "dataType": "code", "domain": {"codes": [
                                        {"idCodeList": "ECO_Commodity"}
                                    ]}, "subject": "item", "supplemental": null},
                                    {"id": "YEAR", "title": {"EN": "y"}, "key": true, "dataType": "year", "domain": null, "subject": "time", "supplemental": null},
                                    {"id": "NUMBER", "title": {"EN": "measure"}, "key": false, "dataType": "number", "subject": "value", "supplemental": null},
                                    {"id": "CODE2", "title": {"EN": "area"}, "key": false, "dataType": "code", "domain": {"codes": [
                                        {"idCodeList": "ECO_GAUL"}
                                    ]}, "subject": "geo", "supplemental": null}
                                ]);*/


                                $('#DSDEditorContainer').hide();
                                $('#DataEditorContainer').hide();

                            }, 2000);

                            document.body.addEventListener("fx.editor.finish", function (e) {
                                console.log(e.detail.data);
                                uid = e.detail.data.uid;

                                $('#metadataEditorContainer').hide();
                                $('#DSDEditorContainer').show();

                            }, false);

                            $('body').on("columnEditDone.DSDEditor.fenix", function (e, p) {
                                var newDSD = {"columns": p.payload};
                                //E.updateDSD("dan3", null, newDSD);
                                E.updateDSD(uid, null, newDSD);

                                $('#DSDEditorContainer').hide();
                                $('#DataEditorContainer').show();

                                DE.set({"dsd": newDSD  });
                            })

                            $('#createDatasetEnd').on('click', function () {

                                var data = DE.getData();
                                var meta = DE.getMeta();
                                var distincts = DE.getDistincts();

                                if (distincts) {
                                    for (var colI = 0; colI < meta.dsd.columns.length; colI++) {
                                        var colId = meta.dsd.columns[colI].id;
                                        var colType = meta.dsd.columns[colI].dataType;

                                        if (distincts.hasOwnProperty(colId)) {
                                            var col = meta.dsd.columns[colI];
                                            if (colType == "code") {
                                                var idCL = col.domain.codes[0].idCodeList;
                                                var verCL = col.domain.codes[0].version;

                                                if (verCL)
                                                    col.values = {codes: [
                                                        {idCodeList: idCL, version: verCL}
                                                    ]};
                                                else
                                                    col.values = {codes: [
                                                        {idCodeList: idCL}
                                                    ]};
                                                col.values.codes[0].codes = [];
                                                for (var i = 0; i < distincts[colId].length; i++) {
                                                    col.values.codes[0].codes.push({code: distincts[colId][i]});
                                                }
                                            }
                                            else {
                                                col.values = {timeList: distincts[colId]};
                                            }
                                        }
                                    }

                                }
                                //console.log(meta.dsd);
                                /*console.log("data");
                                console.log(data);*/


                                DE.updateData(uid, null, data, function () {
                                    DE.updateDSD(uid, null, meta.dsd, function () {
                                        window.location.reload();
                                    });
                                });



                            })

                        });


                    });

                });

            });

        }, 0);
    });

});
