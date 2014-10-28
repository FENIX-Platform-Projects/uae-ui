define([
'jquery',
 'jqxall',
  'text!templates/DSDEdit/simpleEditors/CodesSelectionEditor.htm'
  ],
function ($, jqx, CodesSelectionEditorHTML) {
    var CodesSelectionEditor = function () {
        this.$container;

        this.$lList;
        this.$rList;
    };

    CodesSelectionEditor.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(CodesSelectionEditorHTML);

        this.$lList = this.$container.find('#codeSelEditorL');
        this.$rList = this.$container.find('#codeSelEditorR');

        this.$lList.jqxListBox({ multipleextended: true });
        this.$rList.jqxListBox({ multipleextended: true });

        var me = this;
        $('#codeSelEditLToR').click(function () { moveItems(me.$lList, me.$rList) });
        $('#codeSelEditRToL').click(function () { moveItems(me.$rList, me.$lList) });
    }
    CodesSelectionEditor.prototype.setSelected = function (items) {
        setItems(items, this.$rList);
    }
    CodesSelectionEditor.prototype.setUnSelected = function (items) {
        setItems(items, this.$lList);
    }
    var setItems = function (items, listBox) {
        var dS = { localdata: items, datafields:
        [{ name: 'code', type: 'string' },
        { name: 'title', type: 'string', map: 'title>EN'}]
        };
        var dA = new $.jqx.dataAdapter(dS);
        //this.$lList.jqxListBox('clear');
        listBox.jqxListBox({ source: dA, displayMember: "title", valueMember: "code" });
    }

    CodesSelectionEditor.prototype.getSelected = function (items) { return getItems(this.$rList); }
    CodesSelectionEditor.prototype.getUnSelected = function (items) { return getItems(this.$lList); }

    var getItems = function (listBox) {
        var selItems = listBox.jqxListBox('getSelectedItems');
        if (!selItems)
            return null;
        var toRet = [];
        for (var i = 0; i < selItems.length; i++) {
            toRet.push({ code: selItems[i].value, label: selItems[i].label });
        }
        return toRet;
    }

    var moveItems = function (from, to) {
        var selItems = from.jqxListBox('getSelectedItems');
        if (selItems) {
            for (var i = 0; i < selItems.length; i++) {
                from.jqxListBox('removeItem', selItems[i]);
                to.jqxListBox('addItem', selItems[i]);
            }
            from.jqxListBox('clearSelection');
            to.jqxListBox('clearSelection');
        }
    }

    return CodesSelectionEditor;
});