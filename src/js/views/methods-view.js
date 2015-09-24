/*global define, amplify*/
define([
    'jquery',
    'backbone',
    'views/base/view',
    'text!templates/methods/methods.hbs',
    'i18n!nls/methods',
    'handlebars',
    'lib/utils',
    'config/Config',
    'config/Events',
    'q',
    'jstree',
    'amplify',
    'jqwidgets'
], function ($,Backbone,View, template, i18nLabels, Handlebars, Utils, C,E, Q) {

    'use strict';

    var s = {
        STANDARD_LIST: "#standards-list",
        STANDARD_CONTAINERS: "#standards-container",
        TREE_CONTAINER: '#codelist-tree-container',
        TREE_TITLE : '#codelist-title'
    };

    var MethodsView = View.extend({

        initialize : function ( o ) {
            View.prototype.initialize.call(this, arguments);

            $.extend(true, this, o);
        },

        // Automatically render after initialize
        autoRender: true,

        className: 'methods',

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
            amplify.publish(E.STATE_CHANGE, {menu: 'methods'});
            this.initVariables();
            this.initComponents();
            this.bindEventListeners();
            this.configurePage();

        },
        initVariables: function () {

            this.$standardsList = this.$el.find(s.STANDARD_LIST);
            this.$standardsCodelistTitle = this.$el.find(s.TREE_TITLE);
            this.$standardsTreeContainer =  this.$el.find(s.TREE_CONTAINER);
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


        _onStartingSelected : function(id) {
            var self = this;
            $.ajax({
                url : C.CODELIST_URL+ id
            }).done(function(data){
                self._onTakingCodelist(data);

            })
        },


        bindEventListeners: function () {
            var self = this;

            this.$standardsList.on("changed.jstree", _.bind(function (e, data) {
                e.preventDefault();
                var id = data.selected[0];
                this.$titleCodelist = data.node.text;

                if(this.$treeHolder) {
                    this.$treeHolder.jqxTreeGrid('destroy')
                }

                Backbone.history.navigate('#methods/' + id, {trigger: false});

                self._onStartingSelected(id);

            }, this));
        },

        _onTakingCodelist: function(data) {
            this.$lang = (requirejs.s.contexts._.config.i18n.locale).toUpperCase();
            this.$dataToBePrepared  = this._onPrepareData(data);
            this._onCreatingTree();
        },

        _onPrepareData : function( data) {

            var result = [];
            for(var i= 0, length = data.length; i<length; i++) {

              var element = {
                    'code' : data[i].code,
                    'title': data[i].title[this.$lang]
                }
                if(data[i].children && data[i].children.length >0) {
                    element['expanded'] = false
                    element['children']= this._onPrepareData(data[i].children);
                }
                result.push(element);
            }
            return result;
        },

        _onCreatingTree : function (  ) {

            var self = this;

            if(this.$standardsCodelistTitle.text()){
                this.$standardsCodelistTitle.text('')
            }
            this.$standardsCodelistTitle.text(this.$titleCodelist);

            var source =
            {
                dataType: "array",
                dataFields: [
                    { name: 'code', type: 'string' },
                    { name: 'title', type: 'string' },
                    { name: 'children', type: 'array' },
                    { name: 'expanded', type: 'bool' }
                ],
                hierarchy:
                {
                    root: 'children'
                },
                id: 'children',

                localData: this.$dataToBePrepared
            };
            var dataAdapter = new $.jqx.dataAdapter(source);

            this.$standardsTreeContainer.append('<div id="tree-holder"></div>');
            this.$treeHolder =  this.$el.find('#tree-holder');

            // create Tree Grid
            this.$treeHolder.jqxTreeGrid(
                {
                    width: 600,
                    source: dataAdapter,
                    sortable: true,
                    columns: [
                        { text: 'Code', dataField: 'code' },
                        { text: 'Title', dataField: 'title'},
                    ]

                });
        },


        configurePage: function () {

            if (this.id !== undefined) {
                this._onStartingSelected(this.id);
            }
        },

        unbindEventListeners: function () {

            this.$standardsList.jstree('destroy');
            this.$standardsList.off();

            if(this.$treeHolder) {
                this.$treeHolder.jqxTreeGrid('destroy');
            }
        },

        dispose: function () {
            this.unbindEventListeners();
            View.prototype.dispose.call(this, arguments);
        }


    });

    return MethodsView;
});
