define(['jquery', 'jqxall'],
function ($, jqx) {
    var LimitedDDL = function () {
        this.$container;
        this.items;
        this.limit;

        this.ddlItems = [];
        this.itemsDA;
        this.lang = 'EN';
    };

    LimitedDDL.prototype.render = function (container, lang) {
        if (lang) this.lang = lang;
        this.$container = container;
        this.$container.jqxDropDownList({ displayMember: 'text', valueMember: 'val', autoDropDownHeight: true });
        this.updateDDL();
    }
    LimitedDDL.prototype.setItems = function (items) {
        this.items = items;
        filterItems(this.items, this.ddlItems, null);

        this.updateDDL();
    }
    LimitedDDL.prototype.getItems = function () { return this.items; }
    LimitedDDL.prototype.getSelectedItem = function () {
        if (!this.$container.jqxDropDownList('getSelectedItem'))
            return null;

        var val = this.$container.jqxDropDownList('getSelectedItem').value;
        if (!this.items)
            return val;
        for (var i = 0; i < this.items.length; i++)
            if (this.items[i].val == val)
                return this.items[i];
        return null;
    }

    LimitedDDL.prototype.updateDDL = function () {
        if (!this.$container)
            return;
        if (!this.ddlItems)
            return;

        var itemsDS = { localdata: this.ddlItems, datatype: 'array', datafields: [{ name: 'val', type: 'string' }, { name: 'text', type: 'string', map: 'text>' + this.lang}] };
        this.itemsDA = new $.jqx.dataAdapter(itemsDS, { autobind: true });
        this.$container.jqxDropDownList({ source: this.itemsDA });

    }
    LimitedDDL.prototype.limitItems = function (limit) {
        this.limit = limit;

        var preSelected = this.$container.jqxDropDownList('val');
        filterItems(this.items, this.ddlItems, limit);
        this.$container.jqxDropDownList({ source: this.itemsDA });
        if (preSelected)
            this.$container.jqxDropDownList('val', preSelected);
        if (preSelected != this.$container.jqxDropDownList('val'))
            this.clearSelection();
    }
    LimitedDDL.prototype.getSelectedValue = function () {
        return this.$container.jqxDropDownList('val');
    }
    LimitedDDL.prototype.setSelectedValue = function (toSet) {
        this.$container.jqxDropDownList('val', toSet);
    }
    LimitedDDL.prototype.clearSelection = function () {
        this.$container.jqxDropDownList('clearSelection');
    }
    var filterItems = function (src, dest, limit) {
        if (!dest)
            dest = [];
        dest.length = 0;

        if (src) {
            if (!limit)
                for (var i = 0; i < src.length; i++)
                    dest.push(src[i]);
            else
                for (var i = 0; i < src.length; i++)
                    if (limit.indexOf(src[i].val) != -1)
                        dest.push(src[i]);
        }
    }

    return LimitedDDL;
});