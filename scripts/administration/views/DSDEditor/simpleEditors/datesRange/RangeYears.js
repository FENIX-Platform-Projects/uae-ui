define([
'jquery',
 'jqxall',
 'text!templates/DSDEdit/simpleEditors/datesRange/RangeYears.htm'
  ],
function ($, jqx, rangeYearsHTML) {
    var RangeYears = function () {
        this.$container;
        this.$from;
        this.$to;
        this.yMin = 1000;
        this.yMax = 3000;
    };

    RangeYears.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(rangeYearsHTML);

        this.$from = this.$container.find('#divRngYearsFrom');
        this.$to = this.$container.find('#divRngYearsTo');

        this.$from.jqxNumberInput({ width: 40, min: this.yMin, max: this.yMax, decimalDigits: 0, digits: 4, groupSeparator: '', promptChar: ' ' });
        this.$to.jqxNumberInput({ width: 40, min: this.yMin, max: this.yMax, decimalDigits: 0, digits: 4, groupSeparator: '', promptChar: ' ' });
        this.reset();

        var me = this;
        this.$from.on('change', function () { me.checkFromTo('f'); });
        this.$to.on('change', function () { me.checkFromTo('t'); });
    }
    RangeYears.prototype.reset = function () {
        var Y = new Date().getFullYear();
        this.$from.jqxNumberInput({ value: Y });
        this.$to.jqxNumberInput({ value: Y + 1 });
    }

    RangeYears.prototype.setRange = function (rng) {
        this.reset();
        if (!rng)
            return;

        var f = rng.from;
        var t = rng.to;
        if (f.length > 4)
            f = f.substring(0, 4);
        if (t.length > 4)
            t = t.substring(0, 4);

        this.$from.jqxNumberInput({ value: f });
        this.$to.jqxNumberInput({ value: t });
    }

    RangeYears.prototype.getRange = function () {
        return { from: this.$from.jqxNumberInput('value').trim(), to: this.$to.jqxNumberInput('value').trim() };
    }

    RangeYears.prototype.checkFromTo = function (fOrT) {
        var f = parseInt(this.$from.jqxNumberInput('value').trim());
        var t = parseInt(this.$to.jqxNumberInput('value').trim());

        if (f > t)
            if (fOrT == 'f')
                this.$to.jqxNumberInput({ value: f });
            else
                this.$from.jqxNumberInput({ value: t });
    }

    return RangeYears;
});