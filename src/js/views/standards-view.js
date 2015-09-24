/*global define, _:false, $, amplify*/
define([
    'backbone',
    'views/base/view',
    'text!templates/standards/standards.hbs',
    'text!templates/standards/standard_item.hbs',
    'i18n!nls/standards',
    'handlebars',
    'lib/utils',
    'jstree',
    'amplify'
], function (Backbone, View, template, itemTemplate, i18nLabels, Handlebars, Utils) {

    'use strict';

    var s = {
        STANDARD_LIST: "#standards-list",
        STANDARD_CONTAINERS: "#standards-container",
        STANDARD_PLACEHOLDER: "#standards-placeholder"
    };

    var StandardsView = View.extend({

        initialize : function ( o ) {
            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, o);
        },

        // Automatically render after initialize
        autoRender: true,

        className: 'standards',

        // Save the template string in a prototype property.
        // This is overwritten with the compiled template function.
        // In the end you might want to used precompiled templates.
        template: template,

        getTemplateData: function () {
            return i18nLabels;
        },

        attach: function () {

            View.prototype.attach.call(this, arguments);

            //update State
            amplify.publish('voh.state.change', {menu: 'standards'});

            this.initVariables();
            this.initComponents();
            this.bindEventListeners();
            this.configurePage();
        },

        initVariables: function () {

            this.$standardsList = this.$el.find(s.STANDARD_LIST);
            this.$standardsContainers = this.$el.find(s.STANDARD_CONTAINERS);
            this.$standardPlaceholder = this.$standardsContainers.find(s.STANDARD_PLACEHOLDER);
        },

        initComponents: function () {

            this.initStandardsList();
        },

        initStandardsList: function () {

            var self = this;

            this.$standardsList.jstree({
                'core': {
                    'data': this.formatModelForJsTree()
                },
                "plugins": ["wholerow"]
            }).on('ready.jstree', function (e, data) {

                //data.instance.open_node(["id1","id2","id3"]);

                if (self.hasOwnProperty("id")){
                    data.instance.select_node([self.id]);
                }

            });
        },

        formatModelForJsTree : function () {

            var result = [];

            _.each(this.standardCollection, function (s) {
                s.text = Utils.getLabel(s.model.title);
                result.push(s);
            });

            return result;
        },

        printStandard: function (id) {

            var model = _.findWhere(this.standardCollection, {id: id}),
                template,
                $compiled;

            if (model !== undefined) {

                template = Handlebars.compile(itemTemplate);
                $compiled = template(model);
                this.$standardsContainers.append($compiled);

            } else {
                 //Show placeholder
                this.$standardPlaceholder.show();
            }

        },

        bindEventListeners: function () {

            this.$standardsList.on("changed.jstree", _.bind(function (e, data) {
                var id = data.selected[0];

                Backbone.history.navigate('#standards/' + id, {trigger: false});

                this.onStandardSelect(id);
            }, this));
        },

        onStandardSelect : function ( id ) {

            var $candidateStandard;

            // Clear the standards container
            this.$standardsContainers.children().hide();

            //Search if the Standards is already printed
            $candidateStandard = this.$standardsContainers.find('[data-standard="'+id+'"]');

            if ($candidateStandard.length > 0) {
                //Standard was already printed so show it
                $candidateStandard.show();
                return;
            }

            //The standards has to be printed
            this.printStandard(id);

        },

        configurePage: function () {

            if (this.id !== undefined) {
                this.onStandardSelect(this.id);
            }
        },

        unbindEventListeners: function () {

            this.$standardsList.jstree('destory');
            this.$standardsList.off();

        },

        dispose: function () {

            this.unbindEventListeners();

            View.prototype.dispose.call(this, arguments);
        }

    });

    return StandardsView;
});
