//276 Lines

define([
'jquery',
'i18n!nls/ML_DSDEdit',
 'jqxall',
  'views/DSDEditor/simpleEditors/MLTextEditor',
  'views/DSDEditor/simpleEditors/DomainEditor',
  'views/DSDEditor/simpleEditors/ColumnEditorComponents/LimitedDDL',
  'views/DSDEditor/simpleEditors/ColumnEditorComponents/SubjectSelector',
  'text!templates/DSDEdit/ColumnEditor.htm'
],
function ($, mlRes, jqx, MLTextEditor, DomainEditor, LimitedDDL, SubjectSelector, columnEditorHTML) {
    function ColumnEditor() {
        this.$container;

        this.colId = "";

        this.mlEditorTitle = new MLTextEditor();
        this.subjectSelector = new SubjectSelector();

        this.dataTypeSelector = new LimitedDDL();

        this.$dimension;

        this.domainEditor = new DomainEditor();
        this.mlEditorSupplemental = new MLTextEditor();

        //Link here        
    };

    ColumnEditor.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(columnEditorHTML);
        this.mlEditorTitle.render(this.$container.find('#colEditTitle'));
        this.mlEditorTitle.setWidth(350);

        var $dataType = this.$container.find('#colEditDataType');
        this.dataTypeSelector.render($dataType);
        var $subject = this.$container.find('#colEditSubject');
        this.subjectSelector.render($subject);


        this.domainEditor.render(this.$container.find('#colEditDomain'));

        this.mlEditorSupplemental.render(this.$container.find('#colEditSupplemental'));
        this.mlEditorSupplemental.setWidth(350);

        //Link here

        this.doML();

        //Evts
        var me = this;
        $subject.on('changed.subjectSelector.fenix', function (evt, param) { me.subjectChanged(param); });
        $dataType.on('change', function (evt) { me.dataTypeChanged(evt.args.item.value); });
    }

    ColumnEditor.prototype.setSubjects = function (subjects) { this.subjectSelector.setSubjects(subjects); }
    ColumnEditor.prototype.getSubjects = function () { this.subjectSelector.getSubjects(); }

    ColumnEditor.prototype.setDataTypes = function (dataTypes) { this.dataTypeSelector.setItems(dataTypes); }
    ColumnEditor.prototype.getDataTypes = function () { this.dataTypeSelector.getItems(); }

    ColumnEditor.prototype.setCodelists = function (cl) { this.domainEditor.setCodelists(cl); }
    ColumnEditor.prototype.getCodelists = function () { return this.domainEditor.getCodelsits(); }

    ColumnEditor.prototype.setCodelists = function (codelists) {
        this.domainEditor.setCodelists(codelists);
    }

    ColumnEditor.prototype.reset = function () {
        this.validationActive = false;
        this.colId = "";
        this.mlEditorTitle.reset();
        this.dimensionEnabled(true);
        $('#colEditKey').prop('checked', false);
        this.dataTypeSelector.clearSelection();
        this.dataTypeSelector.limitItems(null);
        this.subjectSelector.setSelectedValue('');
        this.domainEditor.reset();
        this.mlEditorSupplemental.reset();
        //Link here
        this.resetValidationResults();
        this.validationActive = true;
    }

    ColumnEditor.prototype.setColumn = function (col) {
        this.reset();
        this.validationActive = false;

        this.colId = col.id;
        if (col.title)
            this.mlEditorTitle.setLabels(col.title);
        if (col.dataType)
            this.dataTypeSelector.setSelectedValue(col.dataType);
        if (col.subject && col.subject.uid)
            this.subjectSelector.setSelectedValue(col.subject.uid);
        if (col.domain)
            this.setDomain(col.dataType, col.domain);
        if (col.key)
            $('#colEditKey').prop('checked', col.key);
        if (col.supplemental)
            this.mlEditorSupplemental.setLabels(col.supplemental);
        //Link here
        this.validationActive = true;
    }
    ColumnEditor.prototype.getColumn = function () {
        var toRet = {};
        toRet.id = this.colId;
        toRet.title = this.mlEditorTitle.getLabels();
        toRet.key = $('#colEditKey').is(':checked');
        toRet.dataType = this.dataTypeSelector.getSelectedValue();
        toRet.domain = this.domainEditor.getDomain();
        var subj = this.subjectSelector.getSelectedSubject();
        if (subj)
            toRet.subject = { uid: subj.val };
        toRet.supplemental = this.mlEditorSupplemental.getLabels();

        //Link here
        return toRet;
    }

    ColumnEditor.prototype.showValidationResults = function (valRes) {
        this.resetValidationResults();

        if (valRes)
            for (var i = 0; i < valRes.length; i++) {
                switch (valRes[i].field) {
                    case 'title':
                        this.$container.find('#lTD_Title').css('background-color', '#f00');
                        break;
                    case 'dimension':
                        this.$container.find('#lTD_Dimension').css('background-color', '#f00');
                        break;
                    case 'dataType':
                        this.$container.find('#lTD_DataType').css('background-color', '#f00');
                        break;
                    case 'domain':
                        this.$container.find('#lTD_Domain').css('background-color', '#f00');
                }
            }
    }

    ColumnEditor.prototype.resetValidationResults = function () {
        this.$container.find('#lTD_Title').css('background-color', '');
        this.$container.find('#lTD_Dimension').css('background-color', '');
        this.$container.find('#lTD_DataType').css('background-color', '');
        this.$container.find('#lTD_Domain').css('background-color', '');
    }

    ColumnEditor.prototype.setDomain = function (dataType, domain) {
        this.domainEditor.setMode(dataType);
        this.domainEditor.setDomain(domain);
    }

    //Evts
    ColumnEditor.prototype.dimensionChanged = function () {
    }
    ColumnEditor.prototype.dataTypeChanged = function (newDataType) {
        this.domainEditor.setMode(newDataType);
        var subj = this.subjectSelector.getSelectedSubject();
        if (newDataType == 'code')
            this.limitCodelists(subj);

        var dT = this.dataTypeSelector.getSelectedItem();
        if (dT)
            this.dimensionEnabled(dT.canBeDimension);
        else
            this.dimensionEnabled(true);
    }
    ColumnEditor.prototype.subjectChanged = function (newSubj) {
        this.limitDataTypes(newSubj);
        this.limitCodelists(newSubj);
    }
    ColumnEditor.prototype.dimensionEnabled = function (enabled) {
        if (enabled)
            $('#colEditKey').removeAttr('disabled');
        else {
            $('#colEditKey').prop('checked', false);
            $('#colEditKey').prop('disabled', true);
        }
    }

    ColumnEditor.prototype.limitDataTypes = function (subj) {
        if (subj)
            this.dataTypeSelector.limitItems(subj.dataTypes);
        else
            this.dataTypeSelector.limitItems(null);
    }
    ColumnEditor.prototype.limitCodelists = function (subj) {
        if (subj)
            this.domainEditor.setCodelistSubject(subj.codelistSubject);
        else
            this.domainEditor.setCodelistSubject(null);
    }

    //Multilang
    ColumnEditor.prototype.doML = function () {
        this.$container.find('#lTD_Title').html(mlRes.title);
        this.$container.find('#lTD_Subject').html(mlRes.subject);
        this.$container.find('#lTD_DataType').html(mlRes.datatype);
        this.$container.find('#lTD_Domain').html(mlRes.domain);
        this.$container.find('#lTD_key').html(mlRes.key);
        this.$container.find('#lTD_Supplemental').html(mlRes.supplemental);
    }
    //END Multilang

    return ColumnEditor;
});