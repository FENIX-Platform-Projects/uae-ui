define(['jqxall'],
function (jqx) {
    function MLTextEditor() {
        this.$container;
        this.defLangs = ['EN', 'FR'];

        this.lCodeColWidth = 30;
    };


    MLTextEditor.prototype.render = function (container) {
        this.$container = container;
        createGrid(this.$container, this.defLangs);
    }

    MLTextEditor.prototype.setLanguages = function (langs) {
        createGrid(this.$container, langs);
    }

    MLTextEditor.prototype.setWidth = function (width) {
        this.$container.jqxGrid({ width: width });
    }

    var createGrid = function (cnt, langs) {
        var labelsData = [];
        for (var i = 0; i < langs.length; i++)
            labelsData.push({ lCode: langs[i], label: '' });

        var dSource = { localdata: labelsData, datatype: "array", datafields: [{ name: 'lCode', type: 'string' }, { name: 'label', type: 'string'}] };
        var dAdapter = new $.jqx.dataAdapter(dSource);

        cnt.jqxGrid({ editable: true, source: dAdapter,
            columns: [{ text: 'code', datafield: 'lCode', editable: false, width:30 },
            { text: 'label', datafield: 'label', editable: true}],
            showheader: false, autoheight: true
        });
        cnt.jqxGrid('setcolumnproperty', 'lCode', 'width', 30);
    }

    MLTextEditor.prototype.reset = function () {
        var rows = this.$container.jqxGrid('getrows');
        for (var r = 0; r < rows.length; r++)
            this.$container.jqxGrid('updaterow', r, { lCode: rows[r].lCode, label: '' });
    }
    MLTextEditor.prototype.setLabels = function (labels) {
        this.reset();

        if (!labels)
            return;

        for (var lCode in labels) {
            var idx = this.getRowIndexByCode(lCode);
            if (idx == -1) {
                try {
                    this.$container.jqxGrid('addrow', null, { lCode: lCode, label: labels[lCode] });
                } catch (e) { }
            }
            else { this.$container.jqxGrid('updaterow', idx, { lCode: lCode, label: labels[lCode] }); }
        }
    }
    MLTextEditor.prototype.getRowIndexByCode = function (code) {
        var rows = this.$container.jqxGrid('getrows');
        for (var i = 0; i < rows.length; i++)
            if (rows[i].lCode == code)
                return i;
        return -1;
    }

    MLTextEditor.prototype.getLabels = function () {
        var toRet = {};
        var rows = this.$container.jqxGrid('getrows');
        for (var i = 0; i < rows.length; i++)
            if (rows[i].label.trim() != "")
                toRet[rows[i].lCode] = rows[i].label;
        return toRet;
    }

    return MLTextEditor;
});