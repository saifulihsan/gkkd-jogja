jun.store =  new Ext.data.JsonStore({
    //autoDestroy:true,
    root:'data',
    storeId: 'myStore',
    //scope:jun.NotaDtlGrid,
    url:'user/NotaDtl/create',
    //idProperty: 'item_id',
    fields:['barang_id','barang_name','nota_id',
        {name:'jml',type:'float'},
        {name:'harga_satuan',type:'float'},
        {name:'total_harga_1',type:'float'},
        {name:'disc_per',type:'float'},
        {name:'disc_rp',type:'float'},
        {name:'total_harga_2',type:'float'}],
    //data:[],
    autoLoad:false,
    autoSave: false,
    writer : new Ext.data.JsonWriter({
        encode : true,
        writeAllFields : true
    }),
    refreshData: function(){
        Ext.get('total_1id').set({value:this.sum('total_harga_1')});
        Ext.get('discid').set({value:this.sum('disc_rp')});
        Ext.get('total_2id').set({value:this.sum('total_harga_2')});
    },
    saveData: function(id){
        this.root = 'data';
        for(i=0; i<this.data.length; i++)
        {
            this.data.items[i].data.nota_id = id;
        }
    }
});

var fm = Ext.form;

jun.comboRenderer = function(combo){
    return function(value){
        var storeBarang = jun.rztBarang;
        var index = storeBarang.find('barang_id',value);
        var record = storeBarang.getAt(index);
        return record.data.ref;
    }
}

jun.NotaDtlGrid = Ext.extend(Ext.grid.EditorGridPanel, {
    title:"NotaDtl",
    id:'docs-jun.NotaDtlGrid',
    anchor:'100%',
    clicksToEdit: 2,
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    region:'center',
    margins: '0 5 5 5',
    frameHeader:false,
    header:false,
    y:55,
    height:250,
    modez:0,
    initComponent:function () {
        this.store = jun.store;
        jun.store.removeAll();
        if(this.modez > 0){
            var getStore = new jun.NotaDtlReader({url: 'user/NotaDtl/view/id/' + this.modez + '/?output=json'});
            getStore.on({
                'load':{
                    fn: function(store, records, options){
                        //store is loaded, now you can work with it's records, etc.
//                        console.info('store load, arguments:', arguments);
//                        console.info('Store count = ', store.getCount());
                        store.each(function(record){
                            var detil = jun.store.recordType;
                            var e = new detil({
                                barang_id: record.data.barang_id,
                                jml:record.data.jml,
                                barang_name:'',
                                harga_satuan:parseFloat(record.data.total_harga_1),
                                total_harga_1:parseFloat(record.data.total_harga_1),
                                disc_per:record.data.disc_per,
                                disc_rp:parseFloat(record.data.disc_rp),
                                total_harga_2:parseFloat(record.data.total_harga_2)
                            });
                            jun.store.insert(0, e);
                        },this);
                    },
                    scope:this
                },
                'loadexception':{
                    //consult the API for the proxy used for the actual arguments
                    fn: function(obj, options, response, e){
                        console.info('store loadexception, arguments:', arguments);
                        console.info('error = ', e);
                    },
                    scope:this
                }
            });
            getStore.load();
            this.modez = 0;
            //getStore.reload();
            //var count = getStore.getTotalCount();

        }

        this.cm = new Ext.grid.ColumnModel({
            columns:[
                new Ext.grid.RowNumberer(),
                {
                    header:'Item',
//                    id:'combo',
                    resizable:true,
                    sortable:false,
                    dataIndex:'barang_id',
                    width:160,
                    editor:new fm.ComboBox({
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender:true,
                        //mode: 'local',
                        store: jun.rztBarang,
                        valueField: 'barang_id',
                        displayField: 'ref',
                    }),
//                    editor: combo,
                    renderer: jun.comboRenderer(this.editor)
                },
                {
                    header:'Deskripsi',
                    resizable:true,
                    sortable:false,
                    dataIndex:'barang_name',
                    width:160,
                    editor:new fm.TextField({
                        readOnly:true,
                    })
                },
                {
                    header:'Qty',
                    resizable:true,
                    sortable:false,
                    dataIndex:'jml',
                    width:30,
                    editor: new fm.NumberField({
                        //xtype: 'textfield',
                        decimalPrecision:1,
                        allowNegative:false,
                        allowBlank: false
                    })
                },
                {
                    header:'Harga',
                    resizable:true,
                    sortable:false,
                    dataIndex:'harga_satuan',
                    width:100,
                    editor: new fm.NumberField({
                        //xtype: 'textfield',
                        decimalPrecision:2,
                        allowNegative:false,
                        allowBlank: false
                    })
                },
                {
                    header:'Jumlah Harga',
                    resizable:true,
                    sortable:false,
                    dataIndex:'total_harga_1',
                    width:100,
                    editor: new fm.NumberField({
                        // xtype: 'textfield',
                        decimalPrecision:2,
                        allowNegative:false,
                        allowBlank: false
                    })
                },

                {
                    header:'Diskon %',
                    resizable:true,
                    sortable:false,
                    dataIndex:'disc_per',
                    width:100,
                    editor: new fm.NumberField({
                        //readOnly:true,
                        allowBlank: false
                    })
                },
                {
                    header:'Diskon',
                    resizable:true,
                    sortable:false,
                    dataIndex:'disc_rp',
                    width:100,
                    editor: new fm.NumberField({
                        //readOnly:true,
                        allowBlank: false
                    })
                },
                {
                    header:'Total',
                    resizable:true,
                    sortable:false,
                    dataIndex:'total_harga_2',
                    width:100,
                    editor: new fm.NumberField({
                        //xtype: 'textfield',
                        readOnly:true,
                        allowBlank: false
                    })
                }


            ]
        });
        this.tbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    //iconCls: 'silk-add',
                    text:'Add',
                    ref:'../btnAdd'
                },
                {
                    xtype:'button',
                    text:'Delete',
                    ref:'../btnDelete'
                }

            ]
        };

        jun.NotaDtlGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
        this.on('afteredit', this.afterEdit, this );
    },

    afterEdit:function(e) {
        //alert(e.value + ' - ' + e.originalValue);
        if(e.field == "barang_id"){
            var storeBarang = jun.rztBarang;
            var index = storeBarang.find('barang_id', e.value);
            var record = storeBarang.getAt(index);
            e.record.data['barang_name'] = record.data.desc;
            e.record.data['harga_satuan'] = record.data.harga;
        }

        e.record.data['total_harga_1'] = e.record.data['jml'] * e.record.data['harga_satuan'];
        if(e.record.data['disc_per'] > 0)
        {
            e.record.data['disc_rp'] = (e.record.data['disc_per']/100) * e.record.data['total_harga_1'];
        }
        e.record.data['total_harga_2'] = e.record.data['total_harga_1'] - e.record.data['disc_rp'];
        e.grid.getStore().refreshData();
        e.grid.getView().refresh();
        e.grid.getSelectionModel().selectRow(0);
    },

    getrow:function (sm, idx, r) {
        this.record = r;

        var selectedz = this.sm.getSelections();
    },
//
    loadForm:function () {
//        var form = new jun.NotaDtlWin({modez:0});
//        form.show();
        var storeBarang = jun.rztBarang;
        var index = storeBarang.find('barang_id',2);
        var record = storeBarang.getAt(index);
        //var my = this.getStore().data;
        var detil = this.getStore().recordType;
        var e = new detil({
            barang_id: 2,
            jml:1,
            barang_name:record.data.desc,
            harga_satuan:parseFloat(record.data.harga),
            total_harga_1:parseFloat(record.data.harga),
            disc_per:0,
            disc_rp:parseFloat(0),
            total_harga_2:parseFloat(record.data.harga)
        });
            this.stopEditing();
            this.store.insert(0, e);
            //this.store.add(e);
            this.getView().refresh();
            this.getSelectionModel().selectRow(0);
            this.startEditing(0, 0);
            this.getStore().refreshData();
        },
    deleteRec:function () {
        this.stopEditing();
                var s = this.getSelectionModel().getSelections();
                for (var i = 0, r; r = s[i]; i++) {
                    this.store.remove(r);
                }
    },
})