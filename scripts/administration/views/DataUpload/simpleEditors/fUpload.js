define(['jquery'],
function ($) {
    function fx_DataUpload() {
        this.widgetName = 'fUpload';
        this.html = '<input type="file" name="filename" class="btn btn-default" id="fName"/>';
        this.$container;
        this.$uploadInput;
    };

    fx_DataUpload.prototype.render = function (container) {
        this.$container = container;
        this.$container.html(this.html);
        this.initUploadInput();
    }

    fx_DataUpload.prototype.initUploadInput = function () {
        this.$uploadInput = this.$container.find('#fName');
        var me = this;
        this.$uploadInput.change(function (e) {
            var ext = me.$uploadInput.val().split(".").pop().toLowerCase();

            //Checking for CSV, extend to any text files (csv,txt...)
            if ($.inArray(ext, ["csv"]) == -1) {
                alert('Upload CSV');
                return false;
            }

            if (e.target.files != undefined) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var str = e.target.result;
                    me.$container.trigger('textFileUploaded.' + me.widgetName + '.fenix', str);
                };
                reader.readAsText(e.target.files.item(0));
            }
            return false;
        });
    }

    return fx_DataUpload;
});