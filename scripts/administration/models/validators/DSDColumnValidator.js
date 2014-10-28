define([
],
function () {

    function DSDColumnValidator() { };

    DSDColumnValidator.prototype.validateColumns = function (cols) {
        if (!cols)
            return null;
        var toRet = [];
        for (var i = 0; i < cols.length; i++) {
            var colValRes = this.validateColumn(cols[i]);
            if (colValRes.length > 0)
                toRet.push({ colId: cols[i].id, validationResults: colValRes });
        }
        return toRet;
    }

    DSDColumnValidator.prototype.validateColumn = function (col) {
        var toRet = [];
        if (!col) {
            toRet.push({ level: 'error', message: 'nullColumn' });
            return toRet;
        }

        arrAppend(toRet, this.validateTitle(col.title));
        arrAppend(toRet, this.validateDimension(col));
        arrAppend(toRet, this.validateDatatype(col));
        arrAppend(toRet, this.validateDomain(col));
        return toRet;
    }

    DSDColumnValidator.prototype.validateTitle = function (toVal) {
        if ($.isEmptyObject(toVal))
            return { field: 'title', level: 'error', message: 'empty' };
        return null;
    }
    DSDColumnValidator.prototype.validateDimension = function (toVal) {
        if (toVal.dimension) {
            if (toVal.dataType)
                if (toVal.dataType == 'number' || toVal.dataType == 'string' || toVal.dataType == 'label' || toVal.dataType == 'boolean' || toVal.dataType == 'percentage' || toVal.dataType == 'period')
                    return { field: 'dimension', level: 'error', message: 'DimensionDataTypeConflict' };
        }
        return null;
    }
    DSDColumnValidator.prototype.validateDatatype = function (toVal) {
        if (!toVal.dataType) {
            return { field: 'dataType', level: 'error', message: 'empty' };
        }
    }
    DSDColumnValidator.prototype.validateDomain = function (toVal) {
        if (!toVal.dataType)
            return;
        if (toVal.dataType == 'code') {
            if (!toVal.domain)
                return { field: 'domain', level: 'error', message: 'empty' };
            if (!toVal.domain.codeSystem)
                return { field: 'domain', level: 'error', message: 'empty' };
            if (!toVal.domain.codeSystem.system)
                return { field: 'domain', level: 'error', message: 'empty codesystem system' };
            if (!toVal.domain.codeSystem.version)
                return { field: 'domain', level: 'error', message: 'empty codesystem version' };
        }
    }

    var arrAppend = function (arr1, arr2) {
        if (!arr1)
            arr1 = [];
        if (!arr2)
            return;
        arr1.push(arr2);
    }

    return DSDColumnValidator;
});