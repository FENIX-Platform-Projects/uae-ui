define([
    'jquery',
    'views/DataUpload/DataUpload',
    'views/DSDEditor/DSDEditorWr',
    'views/DataEdit/DataEditWr',
    'domReady!',
    'bootstrap'
], function( $, DataUpload, DSDEditorWr, DataEditorWr ){

    var dsdEditor;
    var dataEditor;
    var $containerLoading;
    var $containerActionSelection;
    var $containerDSDEditor;
    var $containerDataEditor;
    var csvData = [];

    function startDemo() {
        $containerLoading = $('#divLoading');
        $containerActionSelection = $('#divActionSelection');
        $containerDSDEditor = $('#divTableEditor');
        $containerDataEditor = $('#divDataEditor');

        switchVisibility($containerActionSelection);

        var dataUpload = new DataUpload();

        var $dataUploadContainer = $('#dataUploadContainer');
        dataUpload.render($dataUploadContainer);

        $dataUploadContainer.on('textFileUploaded.fUpload.fenix', function () {
            csvData = dataUpload.getData();

            switchVisibility($containerDSDEditor);
            dsdEditor = new DSDEditorWr();
            dsdEditor.render($('#containerDSDEditor'));
            dsdEditor.setColumns(dataUpload.getColumns());
        });

        $('#btnNewStructure').click(function (args) { newStructure(); });
        $('#btnTableEditorBack').click(function (args) { tableEditorBack(); });
        $('#btnDataEditorBack').click(function (args) { dataEditorBack(); });

        $containerDSDEditor.on('columnEditDone.DSDEditor.fenix', function () { DSDEditDone(); });

    }

    function switchVisibility(cnt) {
        $containerLoading.hide();
        $containerActionSelection.hide();
        $containerDSDEditor.hide();
        $containerDataEditor.hide();
        cnt.show();
    }

    function newStructure() {
        switchVisibility($containerDSDEditor);
        dsdEditor = new DSDEditorWr();
        dsdEditor.render($('#containerDSDEditor'));
    }

    function DSDEditDone() {
        var cols = dsdEditor.getColumns();
        if (!cols || cols.length == 0) {
            alert("Define at least one Column");
            return;
        }

        dataEditor = new DataEditorWr();
        dataEditor.setCodelistUrlFinder({ get: function (system, version) { return "http://faostat3.fao.org:7788/msd/cl/system/" + system + "/" + version; } });
        switchVisibility($containerDataEditor);
        dataEditor.render($('#containerDataEditor'));
        var meta = { "dsd": { "columns": cols} };

        dataEditor.setMeta(meta);
        dataEditor.setData(csvData);
    }

    var setLang = function (lang) {
        var loc = localStorage.getItem('locale');
        if (loc.toUpperCase() == lang)
            return;
        localStorage.setItem('locale', lang.toLowerCase());
        location.reload();
    }

    function tableEditorBack() {
        var cols = dsdEditor.getColumns();
        if (cols && cols.length > 0)
            if (!confirm("Are you sure?"))
                return;
        //remove from the DOM
        $('#containerDSDEditor').empty();
        switchVisibility($containerActionSelection);
    }
    function dataEditorBack() {
        var data = dataEditor.getData();
        if (data && data.length > 0)
            if (!confirm("Are you sure?"))
                return;
        //remove from the DOM
        $('#containerDataEditor').empty();
        switchVisibility($containerDSDEditor);
    }

    return {
        init : startDemo
    };
	
});