define([
'jquery',
 'models/fx_column'
 ],
function ($, fx_column) {
    function CSVToDataset() { };

    CSVToDataset.prototype.parseColumns = function (data, langCode) {
        if (!langCode)
            langCode = "EN";
        if (!data)
            throw new Error("Nothing to parse");
        if (!data[0])
            if (!data)
                throw new Error("Nothing to parse");

        var toRet = [];
        for (var i = 0; i < data[0].length; i++) {
            var toAdd = new fx_column();
            var colName = data[0][i].trim();
            if (!colName)
                throw new Error("Column name cannot be empty");
            toAdd.id = colName;
            toAdd.title[langCode] = colName;
            toRet.push(toAdd);
        }
        return toRet;
    }

    CSVToDataset.prototype.parseData = function (data) {
        var toRet = [];
        for (var i = 1; i < data.length; i++)
            toRet.push(this.csvRowToDataRow(data[0], data[i]));
        return toRet;
    }

    CSVToDataset.prototype.csvRowToDataRow = function (header, row) {
        var toRet = {};
        for (var i = 0; i < header.length; i++)
            toRet[header[i].trim()] = row[i].trim();
        return toRet;
    }

    return CSVToDataset;
});