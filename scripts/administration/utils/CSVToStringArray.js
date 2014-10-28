define([],
function () {
    function CSV_StringToArray() {
        this.defParams = {
            'fSep': ',',
            'rSep': '\r\n',
            'quot': '"',
            'head': false,
            'trim': false
        }
    };

    CSV_StringToArray.prototype.toArray = function (str, o) {
        if (o) {
            for (var i in this.defParams) {
                if (!o[i]) o[i] = this.defParams[i];
            }
        } else {
            o = this.defParams;
        }
        var a = [['']];
        for (var r = f = p = q = 0; p < str.length; p++) {
            switch (c = str.charAt(p)) {
                case o.quot:
                    if (q && str.charAt(p + 1) == o.quot) {
                        a[r][f] += o.quot;
                        ++p;
                    } else {
                        q ^= 1;
                    }
                    break;
                case o.fSep:
                    if (!q) {
                        if (o.trim) {
                            a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        }
                        a[r][++f] = '';
                    } else {
                        a[r][f] += c;
                    }
                    break;
                case o.rSep.charAt(0):
                    if (!q && (!o.rSep.charAt(1) || (o.rSep.charAt(1) && o.rSep.charAt(1) == str.charAt(p + 1)))) {
                        if (o.trim) {
                            a[r][f] = a[r][f].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        }
                        a[++r] = [''];
                        a[r][f = 0] = '';
                        if (o.rSep.charAt(1)) {
                            ++p;
                        }
                    } else {
                        a[r][f] += c;
                    }
                    break;
                default:
                    a[r][f] += c;
            }
        }
        if (o.head) {
            a.shift()
        }
        if (a[a.length - 1].length < a[0].length) {
            a.pop()
        }
        return a;
    }

    return CSV_StringToArray;
});