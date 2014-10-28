define([
'jquery',
 'jqxall',
 'views/DSDEditor/simpleEditors/ColumnEditorComponents/LimitedDDL',
 'text!templates/DSDEdit/simpleEditors/CodelistSelector.htm'
  ],
function ($, jqx, LimitedDDL, codelistSelectorHTML) {

    var CodelistSelector = function () {
        this.$container;
        this.codelists;
        this.codelistsDDL = new LimitedDDL();
    };

    CodelistSelector.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(codelistSelectorHTML);
        this.codelistsDDL.render(this.$container.find('#clSel_div_codelist'));
        this.updateCodelistsDDL();
    }

    CodelistSelector.prototype.setCodelists = function (cl) {
        this.codelists = cl;
        this.updateCodelistsDDL();
    }
    CodelistSelector.prototype.updateCodelistsDDL = function () {
        if (!this.$container)
            return;
        if (!this.codelists)
            return;
        this.codelistsDDL.setItems(this.codelists);
    }

    CodelistSelector.prototype.limitOnSubject = function (subject) {
        if (!this.codelists)
            return;
        if (!subject) {
            this.codelistsDDL.limitItems(null);
            return;
        }
        var limitVals = [];
        for (var i = 0; i < this.codelists.length; i++) {
            if (this.codelists[i].subject == subject)
                limitVals.push(this.codelists[i].val);
        }
        this.codelistsDDL.limitItems(limitVals);
    }
    CodelistSelector.prototype.removeLimit = function (subject) {
        this.codelistsDDL.limitItems(null);
    }

    CodelistSelector.prototype.setDomain = function (domain) {
        var clValue = domain.codeSystem.system + "|" + domain.codeSystem.version;
        this.codelistsDDL.setSelectedValue(clValue);
    }
    CodelistSelector.prototype.getDomain = function () {
        var selVal = this.codelistsDDL.getSelectedValue();
        if (!selVal)
            return null;
        var split = selVal.split('|');
        return { system: split[0], version: split[1] };
    }

    return CodelistSelector;
});