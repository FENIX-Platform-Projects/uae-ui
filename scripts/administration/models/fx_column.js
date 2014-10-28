define([],
function () {

    var column = function () {
        this.id;
        this.title = {};
        this.subject = '';
        this.dataType;
        this.values;
        this.domain;
        //this.columnLink;
        this.key = false;
        //this.transposed;
        //this.virtual;
        this.supplemental;
    };
    return column;
});