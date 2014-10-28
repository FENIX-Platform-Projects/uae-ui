define([
'jquery',
'i18n!nls/ML_DSDEdit',
 'jqxall',
 'models/ColumnIDGenerator',
  'views/DSDEditor/simpleEditors/ColumnEditor',
  'models/validators/DSDColumnValidator',
  'text!templates/DSDEdit/DSDEdit.htm'
  ],
function ($, mlRes, jqx, ColumnIDGenerator, ColumnEditor, DSDColumnValidator, DSDEditHTML) {
    var DSDEditor = function () {
        this.widgetName = "DSDEditor";
        this.$container;
        this.$DSDGrid;
        this.cols = [];

        this.colEditorWindow;
        this.colEditor;

        this.colAddDelEnabled = true;
    };

    //Render - creation
    DSDEditor.prototype.render = function (container, callB) {

        this.$container = container;
        this.$container.html(DSDEditHTML);

        $('#windowColEdit').show();
        this.colEditor = new ColumnEditor();
        //this.colEditor.render($('#divColEdit'));

        $('#divColEdit').show();
        this.colEditor.render($('#cntColEdit'));
        $('#divColEdit').hide();


        /*this.colEditorWindow = $('#windowColEdit').jqxWindow({
        isModal: true, autoOpen: false,
        maxHeight: $(document).height(), maxWidth: $(document).width(), minHeight: 200, minWidth: 200, height: $(document).height() - 50, width: $(document).width() - 50,
        cancelButton: $('#bntColEditCanc'),
        closeButtonAction: 'hide'
        });
        $('#windowColEdit').hide();*/

        var me = this;


        $('#bntColEditOk').click(function () {
            var newCol = me.colEditor.getColumn();

            var val = new DSDColumnValidator();
            var valRes = val.validateColumn(newCol);
            me.colEditor.showValidationResults(valRes);

            if (!valRes || valRes.length == 0) {
                me.colEditorWindow.jqxWindow('close');
                if (newCol.id == "") {
                    //CreateID
                    me.cols.push(newCol);
                    var idGen = new ColumnIDGenerator();
                    me.cols[me.cols.length - 1].id = idGen.generate(me.cols, me.cols.length - 1);
                }
                else {
                    var colIdx = findColIndexById(me.cols, newCol.id);
                    //if (colIdx==-1)
                    me.cols[colIdx] = newCol;
                }
                me.refreshColumns();
            }
        });


        this.$DSDGrid = this.$container.find('#divDSDGrid');
        this.dataSource = createDSDGridDataSource(this.cols);
        this.dataAdapter = createDSDGridDataAdapter(this.dataSource, this.cols);

        var w = this.$container.width();

        this.$DSDGrid.jqxGrid({
            source: this.dataAdapter,
            editable: false,
            autorowheight: true,
            autoheight: true,

            columns: this.createDSDGridCols(),
            width: w,
            //width: $(document).width() - 30,
            rendered: function () { me.validateDSD(); }
        });
        this.$DSDGrid.on('initialized', function () {
            me.ColumnAddDeleteEnabled(me.colAddDelEnabled);
        });

        this.$container.find('#DSDEdit_btnAddCol').click(function () { me.newColumn(); });
        this.$container.find('#btnColsEditDone').click(function () { me.ColsEditDone(); });

        this.doML();
    }

    DSDEditor.prototype.setSubjects = function (subjects) { this.colEditor.setSubjects(subjects); }
    DSDEditor.prototype.setDataTypes = function (dataTypes) { this.colEditor.setDataTypes(dataTypes); }
    DSDEditor.prototype.setCodelists = function (codelists) { this.colEditor.setCodelists(codelists); }

    DSDEditor.prototype.getSubjects = function () { return this.colEditor.getSubjects(); }
    DSDEditor.prototype.getDataTypes = function () { return this.colEditor.getDataTypes(); }
    DSDEditor.prototype.getCodelists = function () { return this.colEditor.getCodelists(); }

    var createDSDGridDataSource = function (data) {
        var toRet = { localdata: data };
        toRet.datafields = [
        { name: 'id', type: 'string' },
        { name: 'MLTitle', type: 'string' },
        { name: 'tmp_subject', type: 'string' },
        { name: 'key', type: 'bool' },
        { name: 'dataType', type: 'string' },
        { name: 'tmp_domain', type: 'string' },
        { name: 'MLSupplemental', type: 'string' }
        ];
        return toRet;
    }

    var createDSDGridDataAdapter = function (datasource, cols) {
        var toRet = new $.jqx.dataAdapter(datasource,
        { beforeLoadComplete: function (rec) {
            for (var i = 0; i < rec.length; i++) {
                var col = findColById(cols, rec[i].id);
                if (col) {
                    rec[i].MLTitle = mlLabelToString(col.title);

                    if (col.domain) {
                        if (col.domain.codeSystem)
                            rec[i].tmp_domain = col.domain.codeSystem.system + " " + col.domain.codeSystem.version;
                        else if (col.domain.period)
                            rec[i].tmp_domain = periodToString(col.domain.period);
                    } else
                        rec[i].tmp_domain = "";

                    if (col.subject) {
                        if (col.subject.uid == "")
                            rec[i].tmp_subject = "";
                        else
                        //Just duplicate, seems a bug in JQXGrid, if empty "[Object][object]" was shown
                            rec[i].tmp_subject = col.subject.uid;
                    }

                    rec[i].MLSupplemental = mlLabelToString(col.supplemental);
                }
                else {
                    rec[i].MLTitle = "";
                    rec[i].MLSupplemental = "";
                    rec[i].tmp_domain = "";
                }
            }
            return rec;
        }
        });

        return toRet;
    }

    DSDEditor.prototype.createDSDGridCols = function () {
        var me = this;
        var toRet = [
        { text: mlRes['edit'], dataField: 'edit', columntype: 'button', cellsrenderer: function () { return mlRes['edit']; }, buttonclick: function (row) { me.rowClicked(row, 'edit'); } },
        { text: 'id', dataField: 'id', displayField: 'id', hidden: true },
        { text: mlRes['title'], dataField: 'MLTitle' },
        { text: mlRes['subject'], dataField: 'tmp_subject' },
        { text: mlRes['key'], dataField: 'key', columntype: 'checkbox' },
        { text: mlRes['datatype'], dataField: 'dataType' },
        { text: mlRes['domain'], dataField: 'tmp_domain' },
        { text: mlRes['supplemental'], dataField: 'MLSupplemental' },
        { text: mlRes['delete'], dataField: 'delete', columntype: 'button', cellsrenderer: function () { return mlRes['delete']; }, buttonclick: function (row) { me.rowClicked(row, 'delete'); } }
        //{ text: 'Link' }
        //{ text: 'Transposed' };
        //{ text: 'Virtual' };
        ];

        return toRet;
    }
    DSDEditor.prototype.rowClicked = function (rowIdx, action) {
        var row = this.$DSDGrid.jqxGrid('getRows')[rowIdx];
        var colId = row.id;
        if (action == 'edit') {
            var col = findColById(this.cols, colId);
            this.colEditor.setColumn(col);
            this.colEditorWindow.jqxWindow('open');
        }
        else if (action == 'delete') {
            var res = confirm("Delete");
            if (res) {
                var colIdx = findColIndexById(this.cols, colId);
                if (colIdx != -1) {
                    this.cols.splice(colIdx, 1);
                    this.refreshColumns();
                }
            }
        }
    }

    //END Render - creation

    //Validation
    DSDEditor.prototype.validateDSD = function () {
        //validate the columns
        var val = new DSDColumnValidator();
        var cols = this.getColumns();
        var valRes;
        if (cols)
            valRes = val.validateColumns(cols);
        this.showValidationResults(valRes);

        return valRes;

        //Validate the whole DSD
    }

    DSDEditor.prototype.showValidationResults = function (valRes) {
        this.resetValidationResults();
        if (!valRes)
            return;
        if (valRes.length == 0)
            return;

        var rows = this.$DSDGrid.jqxGrid('getdisplayrows');
        var htmlRows = this.$DSDGrid.find("div[role='row']");
        for (var i = 0; i < valRes.length; i++) {
            var rIdx = getRowIndexByID(rows, valRes[i].colId);
            if (rIdx != -1)
                changeRowBackgroundColor(htmlRows[rIdx], "Red");
        }
    }
    DSDEditor.prototype.resetValidationResults = function () {
        var htmlRows = this.$DSDGrid.find("div[role='row']");
        if (htmlRows)
            for (var r = 0; r < htmlRows.length; r++)
                changeRowBackgroundColor(htmlRows[r], "");
    }

    var getRowIndexByID = function (rows, id) {
        if (!rows)
            return -1;
        for (var i = 0; i < rows.length; i++)
            if (rows[i].id == id)
                return i;
        return -1;
    }

    function changeRowBackgroundColor(htmlRow, color) {
        var tds = $(htmlRow).find("div[role='gridcell']");
        for (var i = 0; i < tds.length; i++)
            changeCellBackgroundColor(tds[i], color);
    }
    function changeCellBackgroundColorByColId(htmlRow, colId, color) {
        var index = $tblValues.jqxGrid('getcolumnindex', colId);
        var tds = $(htmlRow).find("div[role='gridcell']");
        changeCellBackgroundColor(tds[index], color);
    }
    function changeCellBackgroundColor(htmlCell, color) {
        $(htmlCell).css("background-color", color);
    }
    //END Validation


    //Get/Set cols
    DSDEditor.prototype.setColumns = function (columns) {
        this.cols.length = 0;
        if (columns)
            for (var i = 0; i < columns.length; i++)
                this.cols.push(columns[i]);
        this.refreshColumns();
    }
    DSDEditor.prototype.getColumns = function () {
        //VALIDATE
        return this.cols;
    }

    DSDEditor.prototype.reset = function () {
        this.colAddDelEnabled = true;
        this.cols.length = 0;
        this.refreshColumns();
    }
    DSDEditor.prototype.refreshColumns = function () {
        this.$DSDGrid.jqxGrid({ source: this.dataAdapter });
    }
    DSDEditor.prototype.newColumn = function () {
        var newCol = {};
        newCol.id = "";
        this.colEditor.setColumn(newCol);
        this.colEditorWindow.jqxWindow('open');
    }

    DSDEditor.prototype.ColumnAddDeleteEnabled = function (enabled) {
        this.colAddDelEnabled = enabled;
        if (enabled) {
            this.$container.find('#DSDEdit_btnAddCol').show();
            this.$DSDGrid.jqxGrid('showcolumn', 'delete');
        }
        else {
            this.$container.find('#DSDEdit_btnAddCol').hide();
            this.$DSDGrid.jqxGrid('hidecolumn', 'delete');
        }
    }


    //EVTS
    DSDEditor.prototype.ColsEditDone = function () {
        var valRes = this.validateDSD();
        if (valRes && valRes.length > 0)
            return;
        else
            this.$container.trigger("columnEditDone." + this.widgetName + ".fenix");
    }

    //Helpers
    var findColById = function (cols, id) {
        var idx = findColIndexById(cols, id)
        if (idx == -1)
            return null;
        return cols[idx];
    }
    var findColIndexById = function (cols, id) {
        if (!cols)
            return -1;
        for (var i = 0; i < cols.length; i++)
            if (cols[i].id == id)
                return i;
        return -1;
    }

    var mlLabelToString = function (mlLabel) {
        if (!mlLabel)
            return "";
        var toRet = "";
        for (l in mlLabel)
            toRet += l + ": " + mlLabel[l] + "</br>";
        toRet = toRet.substring(0, toRet.length - ("</br>").length);
        return toRet;
    }
    var periodToString = function (p) {
        //LOCALIZE!
        var toRet;
        switch (p.from.length) {
            case 8:
                toRet = p.from.substring(6, 8) + "/" + p.from.substring(4, 6) + "/" + p.from.substring(0, 4) + " - " + p.to.substring(6, 8) + "/" + p.to.substring(4, 6) + "/" + p.to.substring(0, 4);
                break;
            case 6:
                toRet = p.from.substring(4, 6) + "/" + p.from.substring(0, 4) + " - " + p.to.substring(4, 6) + "/" + p.to.substring(0, 4);
                break;
            case 4:
                toRet = p.from + " - " + p.to;
                break;
        }
        return toRet;
    }

    DSDEditor.prototype.doML = function () {
        this.$container.find('#DSDEdit_btnAddCol').attr('value', mlRes.add);
        this.$container.find('#btnColsEditDone').attr('value', mlRes.done);

        $('#windowColEdit').find('#bntColEditOk').attr('value', mlRes.ok);
        $('#windowColEdit').find('#bntColEditCanc').attr('value', mlRes.cancel);
    }
    //END Multilang

    return DSDEditor;
});