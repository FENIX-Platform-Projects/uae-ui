define([],
function () {
    var MLUtils = function () { };

    //Render - creation
    MLUtils.prototype.getAvailableString = function (ml, lang) {
        var lCode = this.getAvailableLang(ml, lang);
        if (lCode == "")
            return "";
        return ml[lCode];
    }

    MLUtils.prototype.getAvailableLang = function (ml, lang) {
        if (!ml)
            return "";
        if (!lang)
            lang = 'EN';
        lang = lang.toUpperCase();
        if (lang in ml)
            return lang;
        if ('EN' in ml)
            return 'EN';
        for (var langs in ml)
            return langs;
    }

    MLUtils.prototype.getAllMultilanguageString = function (ml, divChar) {
        if (!ml)
            return "";
        var toRet = "";
        if (divChar == undefined)
            divChar = ",";
        for (var k in ml)
            if (toRet == "")
                toRet = '[' + k + '] ' + ml[k];
            else
                toRet = toRet + divChar + '[' + k + '] ' + ml[k];
        return toRet;
    }

    return MLUtils;
});