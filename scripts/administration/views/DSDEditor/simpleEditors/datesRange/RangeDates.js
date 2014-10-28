define([
'jquery',
 'jqxall',
 'text!templates/DSDEdit/simpleEditors/datesRange/RangeDates.htm'
  ],
function ($, jqx, rangeDatesHTML) {
    var RangeYears = function () {
        this.$container;

        this.$from;
        this.$to;

        this.dateMin = new Date(1900, 0, 1);
        this.dateMax = new Date(2015, 11, 31);
    };

    RangeYears.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(rangeDatesHTML);

        this.$from = this.$container.find('#divRngFrom');
        this.$to = this.$container.find('#divRngTo');
        this.$from.jqxCalendar({ min: this.dateMin, max: this.dateMax });
        this.$to.jqxCalendar({ min: this.dateMin, max: this.dateMax });
        this.reset();

        var me = this;
        this.$from.on('change', function () { me.checkFromTo('f'); });
        this.$to.on('change', function () { me.checkFromTo('t'); });
    }
    RangeYears.prototype.reset = function () {
        var d = new Date();
        this.$from.jqxCalendar('setDate', d);
        this.$to.jqxCalendar('setDate', d);
    }
    RangeYears.prototype.setRange = function (rng) {
        this.reset();
        if (!rng)
            return;

        this.$from.jqxCalendar('setDate', D3SDateToDate(rng.from));
        this.$to.jqxCalendar('setDate', D3SDateToDate(rng.to));
    }
    RangeYears.prototype.getRange = function () {
        var f = this.$from.jqxCalendar('getDate');
        var t = this.$to.jqxCalendar('getDate');
        return { from: dateToD3SDate(f), to: dateToD3SDate(t) };
    }
    RangeYears.prototype.checkFromTo = function (changed) {
        var f = this.$from.jqxCalendar('getDate');
        var t = this.$to.jqxCalendar('getDate');
        if (changed == 't') {
            if (t < f)
                this.$from.jqxCalendar('setDate', t);
        }
        else if (changed == 'f')
            if (f > t)
                this.$to.jqxCalendar('setDate', f);
    }

    var dateToD3SDate = function (date) {
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (m < 10)
            m = "0" + m;
        if (d < 10)
            d = "0" + d;
        return date.getFullYear() + "" + m + "" + d;
    }
    var D3SDateToDate = function (d) {
        return new Date(d.substring(0, 4), d.substring(4, 6) - 1, d.substring(6, 8));
    }

    return RangeYears;
});