jun.renderPeChartType = function (val, meta, record) {

    var store = jun.rztPeChartTypes;
    var index = store.find('id', val);
    var record = store.getAt(index);
    return record.data.name;
}
var renderPeChartMaster = function (val, meta, record) {

    var store = jun.rztPeChartMaster;
    var index = store.find('account_code', val);
    var record = store.getAt(index);
    return record.data.account_name;
}
//Ext.ux.GridCombo = Ext.extend(Ext.form.ComboBox, {
//    initList:function () {
//        var tconf = {
//            floating:true,
//            listeners:{
//                click:this.onNodeClick,
//                scope:this
//            },
//            alignTo:function (el, pos) {
//                this.setPagePosition(this.el.getAlignToXY(el, pos));
//            },
//            keys:[
//                {
//                    key:9,
//                    fn:function () {
//                        this.onNodeClick(this.list.getSelectionModel().getSelected());
//                    },
//                    key:27,
//                    fn:function () {
//                        //this.collapse();
//                        this.focus(true, true);
//                    },
//                    scope:this
//                }
//            ]
//        };
//        var reader = new Ext.data.ArrayReader({id:0}, [
//            {name:'metadataId'},
//            {name:'metadataGroupName'},
//            {name:'metadataName'},
//            {name:'metadataType'}
//        ]);
//        var store = new Ext.data.GroupingStore({
//            id:0,
//            reader:reader,
//            sortInfo:{field:'metadataGroupName', direction:"ASC"},
//            groupField:'metadataGroupName'
//        });
//
//        function fillLoader(metadataList) {
//            var loadData = [];
//            for (var i = 0; i     var metadata = metadataList[i];
//            for (var j = 0; j     var obj = [metadata.attributes[j].guid.id, metadata.name, metadata.attributes[j].name, metadata.attributes[j].valueType];
//            loadData.push(obj);
//        }
//    }
//
//    grid.getStore().loadData(loadData, true);
//}
//;
//Ext.Ajax.request({
//    url:'get-metadata-groups-action',
//    success:function (response, options) {
//        var response = Ext.util.JSON.decode(response.responseText);
//        var metadataList = response.MetadataGroups;
//        fillLoader(metadataList);
//    },
//    failure:function (w, e, r) {
//    },
//    scope:this
//});
//var xg = Ext.grid;
//var grid = new xg.GridPanel({
//    store:store,
//    keys:[
//        {
//            key:13,
//            scope:this,
//            fn:function () {
//                var k = grid.getSelectionModel();
//                var data = k.getSelected().get('metadataName');
//                var dataType = k.getSelected().data.metadataType;
//                this.ruleRecord.set(this.ruleRecordField, dataType);
//                this.setValue(data);
//                this.fireEvent('select', this, k.getSelected(), 1);
//            }
//        }
//    ],
//    autoHeight:true,
//    alignTo:function () {
//    },
//    columns:[
//        {
//            id:'metadataGroupName',
//            header:"MetadataGroups",
//            width:20,
//            hidden:true,
//            dataIndex:'metadataGroupName'
//        },
//        {
//            header:"metadataName",
//            width:60,
//            sortable:true,
//            dataIndex:'metadataName'
//        }
//    ],
//    view:new Ext.grid.GroupingView({
//        forceFit:true,
//        hideGroupedColumn:true,
//        startCollapsed:true,
//        groupTextTpl:'{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
//    }),
//    frame:true,
//    width:300,
//    height:400,
//    collapsible:false,
//    animCollapse:false,
//    iconCls:'icon-grid',
//    cls:"ext-sandbox",
//    renderTo:'content',
//    listeners:{
//        scope:this,
//        cellclick:function (grid, rowIndex, columnIndex, e) {
//            //grid.hide();
//            var record = grid.getStore().getAt(rowIndex);
//            var fieldName = grid.getColumnModel().getDataIndex(columnIndex);
//            var data = record.get(fieldName);
//            var dataType = record.data.metadataType;
//            this.ruleRecord.set(this.ruleRecordField, dataType);
//            this.setValue(data);
//            this.fireEvent('select', this, record, columnIndex);
//        }
//    }
//});
//if (this.treeConfig) {
//    Ext.applyIf(tconf, this.treeConfig);
//    if (this.treeConfig.listeners) {
//        Ext.applyIf(tconf.listeners, this.treeConfig.listeners);
//    }
//    if (tconf.loader) {
//        tconf.loader.on("load", this.onGridLoad, this);
//    }
//    if (this.typeAhead) {
//        Ext.Msg.alert('sjdnosdnfc');
//        this.taTask = new Ext.util.DelayedTask(this.onTypeAhead, this);
//    }
//}
//this.list = grid;
//if (!this.list.rendered) {
//    this.list.renderTo(document.body);
//    this.list.setWidth(this.listWidth || this.list.width);
//}
//this.innerList = this.list.body;
//this.list.hide();
//},
//doQuery: function (q, forceAll) {
//    this.expand();
//}
//,
//collapseIf: function (e) {
//    if (!e.within(this.wrap) && !e.within(this.list.el)) {
//        //this.collapse();
//    }
//}
//,
//setParentRecord: function (rec, recField) {
//    this.ruleRecord = rec;
//    this.ruleRecordField = recField;
//}
//,
//selectNext: function () {
//    var sm = this.list.getSelectionModel();
//    if (!sm.getSelectedCell) {
//        sm.selectFirstRow();
//    }
//    sm.selectNext();
//}
//,
//selectPrev: function () {
//    var sm = this.list.getSelectionModel();
//    if (!sm.getSelectedNode()) {
//        sm.select(this.list.getStore().getAt(0), 0);
//    }
//    sm.selectPrevious();
//}
//,
//onViewClick : function (doFocus) {
//    //this.collapse();
//    if (doFocus !== false) {
//        this.el.focus();
//    }
//}
//,
//getList : function () {
//    return this.list;
//}
//,
//onNodeClick: function () {
//    if (grid.getSelectionModel().hasSelection()) {
//        var cell = grid.getSelectionModel().getSelectedCell();
//        var record = grid.getDataSource().getAt(cell[0]);
//    }
//}
//,
//onGridLoad:function (loader, node, response) {
//    if (this.list.getRootNode() == node) {
//        if (this.hiddenField && this.hiddenField.value && this.hiddenField.value != "") {
//            var n = this.list.getNodeById(this.hiddenField.value);
//            if (n) {
//                n.select();
//                this.setRawValue(n.attributes.text);
//            } else {
//                this.list.getSelectionModel().clearSelections();
//                this.setRawValue("");
//                this.hiddenField.value = "";
//            }
//        }
//    }
//}
//})
//;