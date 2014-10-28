define([
'jquery',
 'jqxall',
 'views/DSDEditor/simpleEditors/CodelistSelector',
 'views/DSDEditor/simpleEditors/CodesSelectionEditor',
 'views/DSDEditor/simpleEditors/DatesRangeSelector',
 'resources/DataServices',
 'text!templates/DSDEdit/simpleEditors/DomainEditor.htm'
  ],
function ($, jqx, CodelistSelector, CodesSelectionEditor, DatesRangeSelector, DataServices, domainEditorHTML) {

    var DomainEditor = function () {
        this.$container;

        this.$divNoDatatype;
        this.$divNoDomain;
        this.$divDomainEditor;

        this.mode = '';

        this.cLists;
        this.codelistSelector;
        this.datesSelector;
    };

    var MODES = {
        code: 'code',
        year: 'year',
        month: 'month',
        date: 'date'
    };

    DomainEditor.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(domainEditorHTML);

        this.$divNoDatatype = this.$container.find('#domEdit_noDatatype');
        this.$divNoDomain = this.$container.find('#domEdit_noDomain');
        this.$divDomainEditor = this.$container.find('#domEdit_editor');
        this.$divNoDatatype.show();
        this.$divNoDomain.hide();
        this.$divDomainEditor.hide();

        var me = this;
        //this.$divDomainEditor.on('codelistChange', function () { me.$container.trigger('domainChange'); return false; });
    }
    DomainEditor.prototype.reset = function () {
        this.setMode('');
    }
    DomainEditor.prototype.setCodelists = function (codelists) {
        this.cLists = codelists;

        if (this.codelistSelector)
            this.codelistSelector.setCodelists(this.cLists);
    }
    DomainEditor.prototype.getCodelists = function () { return this.cLists; }


    DomainEditor.prototype.setMode = function (mode) {
        this.mode = mode;
        this.$divDomainEditor.empty();
        this.$divDomainEditor.hide();
        this.$divNoDomain.hide();
        this.$divNoDatatype.hide();

        switch (mode) {
            case '':
                this.$divDomainEditor.hide();
                this.$divNoDatatype.show();
                break;
            case MODES.code:
                this.$divDomainEditor.show();
                this.codelistSelector = new CodelistSelector();
                this.codelistSelector.render(this.$divDomainEditor);
                this.codelistSelector.setCodelists(this.cLists);
                break;
            case MODES.year:
            case MODES.month:
            case MODES.date:
                this.$divDomainEditor.show();
                this.datesSelector = new DatesRangeSelector();
                this.datesSelector.render(this.$divDomainEditor);
                this.datesSelector.setMode(mode);
                break;
            default:
                this.$divNoDomain.show();
                break;
        }
    }

    DomainEditor.prototype.setDomain = function (domain) {
        switch (this.mode) {
            case MODES.code:
                this.codelistSelector.setDomain(domain);
                break;
            case MODES.year:
            case MODES.month:
            case MODES.date:
                this.datesSelector.setRange(domain.period);
                break;
        }
    }

    DomainEditor.prototype.getDomain = function () {
        switch (this.mode) {
            case MODES.code:
                return { codeSystem: this.codelistSelector.getDomain() };
                break;
            case MODES.year:
            case MODES.month:
            case MODES.date:
                var rng = this.datesSelector.getRange();
                if (!rng) return null;
                return { period: rng };
                break;
        }
    }

    DomainEditor.prototype.setCodelistSubject = function (subject) {
        if (this.mode == MODES.code)
            this.codelistSelector.limitOnSubject(subject);
    }

    return DomainEditor;
});