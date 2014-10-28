define([
'jquery',
'views/DSDEditor/DSDEditor',
'text!templates/DSDEdit/Subjects.json',
'text!templates/DSDEdit/Datatypes.json',
'text!templates/DSDEdit/Codelists.json'
],
function ($, DSDEditor, subjects, dataTypes, codelists) {
    var DSDEditorWr = function () {
        this.subjects;
        this.dataTypes;
        this.codelists;

        this.DSDEditor = new DSDEditor();
    };

    //Render - creation
    DSDEditorWr.prototype.render = function (container, langCode) {
        this.DSDEditor.render(container, langCode);
        this.DSDEditor.setSubjects(JSON.parse(subjects));
        this.DSDEditor.setDataTypes(JSON.parse(dataTypes));
        this.DSDEditor.setCodelists(JSON.parse(codelists));
    }

    //DSDEditorWr.prototype.validateDSD = function () { this.DSDEditor.validateDSD(); }

    //Get/Set cols
    DSDEditorWr.prototype.setColumns = function (columns) { this.DSDEditor.setColumns(columns); }
    DSDEditorWr.prototype.getColumns = function () { return this.DSDEditor.getColumns(); }

    DSDEditorWr.prototype.setDataAdapter = function (adapter) { this.load(adapter.source); }
    DSDEditorWr.prototype.load = function (metaAdapter) {
        var me = this;
        $.ajax({
            url: source.url,
            data: source.data,
            crossDomain: true,
            dataType: "json",
            success: function (data) { me.dataLoaded(data); },
            error: function (jqXHR, textStatus, errorThrown) { throw new Error(jqXHR, textStatus, errorThrown); }
        });
    }
    DSDEditorWr.prototype.dataLoaded = function (data) { this.DSDEditor.setColumns(data); }

    DSDEditorWr.prototype.reset = function () { this.DSDEditor.reset(); }

    DSDEditorWr.prototype.ColumnAddDeleteEnabled = function (enabled) { this.DSDEditor.ColumnAddDeleteEnabled(enabled); }

    return DSDEditorWr;
});