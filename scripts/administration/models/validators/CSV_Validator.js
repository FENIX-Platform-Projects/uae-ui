define(['jquery'
],
function ($) {

    //Columns/headers validation
    function CSV_Validator() {
    };

    CSV_Validator.prototype.validateColumns = function (DSDColumns, headers) {
        var toRet = [];
        if (!DSDColumns)
            throw new Error("DSDColumns cannot be null");
        if (!headers)
            toRet.push({ level: 'error', message: 'ColumnCountNotMatching' });
        else {
            if (DSDColumns.length != headers.length)
                toRet.push({ level: 'error', message: 'ColumnCountNotMatching' });
            var blanks = checkBlanks(headers);
            var duplicates = checkDuplicates(headers);
            var missingHeaders = checkMissingHeaders(DSDColumns, headers);

            /*
            if (blanks.length > 0)
                toRet.push(blanks);
            if (duplicates.length > 0)
                toRet.push(duplicates);
            if (missingHeaders.length > 0)
                toRet.push(missingHeaders);
                */
        }
        return toRet;
    }

    var checkBlanks = function (headers, toRet) {
        for (var i = 0; i < headers.length; i++)
            if (headers == "")
                toRet.push({ level: 'error', message: 'blankHeaderName' });
    }

    var checkDuplicates = function (headers,toRet) {
        for (var i = 0; i < headers.length; i++) {
            for (var j = 0; j < headers.length; j++) {
                if (i != j)
                    if (headers[i] == headers[j])
                        toRet.push({ level: 'error', message: 'duplicateHeaders', name: headers[i] });
            }
        }
    }

    var checkMissingHeaders = function (DSDColumns, headers, toRet) {
        for (var i = 0; i < DSDColumns.length; i++)
            if (!$.inArray(DSDColumns[i].id, headers))
                toRet.push({ level: 'error', message: 'missingHeader', name: DSDColumns[i].id });
    }
    var checkUnknownHeaders = function (DSDColumns, headers, toRet) {
        for (var i = 0; i < headers.length; i++)
            if (inDSDCol(DSDColumns, headers[i]) == -1)
                toRet.push({ level: 'error', message: 'header not found in DSD', name: headers[i] });
    }
    var inDSDCol = function (DSDCols, id) {
        if (!DSDCols)
            return -1;
        for (var i = 0; i < DSDCols.length; i++)
            if (DSDCols[i].id == id)
                return i;
        return -1;
    }

    //END Columns/headers validation

    return CSV_Validator;
});