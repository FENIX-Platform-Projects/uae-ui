define([
'jquery',
'i18n!nls/ML_DataUpload',
 'jqxall',
 'views/DataUpload/simpleEditors/fUpload',
 'root/utils/CSVToStringArray',
 'root/utils/CSVToDataset',
 'models/validators/CSV_Validator',
 'text!templates/DataUpload/DataUpload.htm'
  ],
function ($, mlRes, jqx, fUpload, CSVToStringArray, CSVToDataset, CSV_Validator, DataUploadHTML) {
    var DataUpload = function () {
        this.widgetName = "DataUpload";
        this.$container;
        this.$uploadInput;
        this.fUpload;

        //this.DSDEditor = new DSDEditorWr();
        //this.DataEdit = new DataEditWr();

        this.columns;
        this.data;

        this.lang = 'EN';
    };

    //Render - creation
    DataUpload.prototype.render = function (container, subjects, datatypes, codelists, lang) {
        if (lang) this.lang = lang;
        this.$container = container;
        this.$container.html(DataUploadHTML);

        this.$uploadInput = this.$container.find('#divUploadInput');
        this.fUpload = new fUpload();
        this.fUpload.render(this.$uploadInput);

        var me = this;
        this.$uploadInput.on('textFileUploaded.fUpload.fenix', function (evt, d) { me.dataUploaded(d); });
        this.setLang(this.lang);
    }

    /*DataUpload.prototype.switchVisibility = function (toShow) {
    this.$container.find('#divNewOldDataset').hide();
    this.$container.find('#divDSDEdit').hide();
    this.$container.find('#divUploadInput').hide();
    this.$container.find('#divDataEdit').hide();
    switch (toShow) {
    case 'newOld':
    this.$container.find('#divNewOldDataset').show();
    break;
    case 'DSDEdit':
    this.$container.find('#divDSDEdit').show();
    break;
    case 'upload':
    this.$container.find('#divUploadInput').show();
    break;
    case 'dataEdit':
    this.$container.find('#divDataEdit').show();
    break;
    }
    }*/

    DataUpload.prototype.dataUploaded = function (data) {
        var conv = new CSVToStringArray();
        var dataArr = conv.toArray(data);

        this.columns = stringArrToColumns(dataArr);
        this.data = stringArrToData(dataArr);

        this.$container.trigger("dataUploaded." + this.widgetName + ".fenix");

        //this.editDSD(this.columns);

        //this.switchVisibility('DSDEdit');
    }

    DataUpload.prototype.getColumns = function ()
    { return this.columns; }
    DataUpload.prototype.getData = function ()
    { return this.data; }

    /*DataUpload.prototype.editDSD = function (toEdit) {
    this.DSDEditor.setColumns(toEdit);

    this.DSDEditor.ColumnAddDeleteEnabled(false);
    }*/

    /*DataUpload.prototype.colEditDone = function (args) {
    var val = new CSV_Validator();
    this.columns = this.DSDEditor.getColumns();

    this.switchVisibility('dataEdit');
    this.DataEdit.setCodelistUrlFinder({ get: function (system, version) { return "http://hqlprfenixapp2.hq.un.fao.org:7777/msd/cl/system/" + system + "/" + version; } });
    this.DataEdit.setColsAndData(this.columns, this.data);
    }*/

    var stringArrToColumns = function (arr) {
        var conv = new CSVToDataset();
        return conv.parseColumns(arr, "EN");
    }
    var stringArrToData = function (arr) {
        var conv = new CSVToDataset();
        return conv.parseData(arr);
    }


    //MultiLang
    DataUpload.prototype.setLang = function (langCode) {
        /*  this.lang = langCode;
        var me = this;
        $.i18n.properties({
        name: 'ML_DataEdit',
        path: 'js/ml/DataEdit/',
        mode: 'map',
        language: langCode,
        callback: function () { me.updateML($.i18n.map, langCode); }
        });*/
    }

    DataUpload.prototype.updateML = function (i18nMap, langCode) {
        //this.dataEditor.setLang(langCode);

        //this.$dataEditor.find('#btnAddRow').attr('value', i18nMap.msg_add);
        //this.$dataEditor.find('#btnDelRow').attr('value', i18nMap.msg_delete);
    }
    //END Multilang

    return DataUpload;
});