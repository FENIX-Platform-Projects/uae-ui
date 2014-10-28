define(['jquery', 'jqxall'],
function ($, jqx) {
    var SubjectSelector = function () {
        this.widgetName = 'subjectSelector';
        this.$container;
        this.subjects;

        this.lang = 'EN';
    };

    SubjectSelector.prototype.render = function (container, lang) {
        if (lang)
            this.lang = lang;
        this.$container = container;
        this.$container.jqxDropDownList({ displayMember: 'text', valueMember: 'val', autoDropDownHeight: true });
        this.updateDDL();

        var me = this;

        this.$container.on('change', function (evt) { me.subjectChanged(evt.args.item.value); });
    }

    SubjectSelector.prototype.setSubjects = function (subjects) {
        this.subjects = subjects;
        this.updateDDL();
    }
    SubjectSelector.prototype.updateDDL = function () {
        if (!this.$container)
            return;
        if (!this.subjects)
            return;

        var DS = { localdata: this.subjects, datatype: 'array', datafields: [{ name: 'val', type: 'string' }, { name: 'text', type: 'string', map: 'text>' + this.lang}] };
        var DA = new $.jqx.dataAdapter(DS);
        this.$container.jqxDropDownList({ source: DA });
    }

    SubjectSelector.prototype.getSubjects = function ()
    { return this.subjects; }

    SubjectSelector.prototype.subjectChanged = function (val) {
        var subj = getSubjectByVal(val, this.subjects);
        this.$container.trigger("changed." + this.widgetName + ".fenix", subj);
    }

    SubjectSelector.prototype.getSelectedSubject = function () {
        if (!this.$container.jqxDropDownList('getSelectedItem'))
            return getSubjectByVal(null, this.subjects);
        var val = this.$container.jqxDropDownList('getSelectedItem').value;
        return getSubjectByVal(val, this.subjects);
    }
    SubjectSelector.prototype.setSelectedValue = function (val) {
        if (val)
            this.$container.jqxDropDownList('val', val);
        else
            this.$container.jqxDropDownList('clearSelection');
    }

    var getSubjectByVal = function (val, subjs) {
        if (!val)
            return null;
        for (var i = 0; i < subjs.length; i++)
            if (subjs[i].val == val)
                return subjs[i];
        return null;
    }

    return SubjectSelector;
});