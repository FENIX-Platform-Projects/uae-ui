define([
'jquery',
 'jqxall',
 'views/DSDEditor/simpleEditors/datesRange/RangeYears',
 'views/DSDEditor/simpleEditors/datesRange/RangeMonths',
 'views/DSDEditor/simpleEditors/datesRange/RangeDates',
 'text!templates/DSDEdit/simpleEditors/DatesRangeSelector.htm'
  ],
function ($, jqx, RangeYears, RangeMonths, RangeDates, datesRangeSelectorHTML) {
    var DatesRangeSelector = function () {
        this.$container;

        this.$datesRangeSelector;
        this.$chkLimit;
        this.mode = '';

        this.modeDate = 'date';
        this.modeMonth = 'month';
        this.modeYear = 'year';

        this.rangeSelector;
    };

    DatesRangeSelector.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(datesRangeSelectorHTML);

        this.$datesRangeSelector = this.$container.find('#divDatesRange');

        var me = this;
        this.$chkLimit = this.$container.find('#datesRangeChkLimit');
        this.$chkLimit.change(function () {
            if (me.$chkLimit.prop('checked'))
                me.$datesRangeSelector.show();
            else
                me.$datesRangeSelector.hide();
        });
    }
    DatesRangeSelector.prototype.reset = function () {
        this.$chkLimit.prop('checked', '');
        this.$datesRangeSelector.hide();
        if (this.rangeSelector)
            this.rangeSelector.reset();
    }

    DatesRangeSelector.prototype.setMode = function (mode) {
        this.mode = mode;
        switch (mode) {
            case this.modeYear:
                this.rangeSelector = new RangeYears();
                this.rangeSelector.render(this.$datesRangeSelector);
                break;
            case this.modeMonth:
                this.rangeSelector = new RangeMonths();
                this.rangeSelector.render(this.$datesRangeSelector);
                break;
            case this.modeDate:
                this.rangeSelector = new RangeDates();
                this.rangeSelector.render(this.$datesRangeSelector);
                break;
        }
    }

    DatesRangeSelector.prototype.setRange = function (rng) {
        if (!rng) {
            this.$chkLimit.prop('checked', '');
            this.$datesRangeSelector.hide();
        }
        else {
            this.$chkLimit.prop('checked', 'checked');
            this.$datesRangeSelector.show();
            this.rangeSelector.setRange(rng);
        }
    }
    DatesRangeSelector.prototype.getRange = function (rng) {
        if (!this.$chkLimit.prop('checked'))
            return null;
        return this.rangeSelector.getRange();
    }

    return DatesRangeSelector;
});