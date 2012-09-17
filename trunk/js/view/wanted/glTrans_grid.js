jun.glTransStore = new Ext.data.JsonStore({
    //autoDestroy:true,
    root:'data',
    storeId:'glTransStore',
    //scope:jun.NotaDtlGrid,
    url:'Wanted/GlTrans/view',
    //idProperty: 'item_id',
    fields:[
        {name:'tgl'},
        {name:'type'},
        {name:'ref'},
        {name:'amount'},
        {name:'memo'},
        {name:'type_no'},
        {name:'person'}
    ],
    //data:[],
    autoLoad:false,
    autoSave:false,

});

jun.GlTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"GL Inquiry",
    id:'docs-jun.GlTransGrid',
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'Tanggal',
            //sortable:true,
            resizable:true,
            dataIndex:'tgl',
        },
        {
            header:'Tipe',
//			sortable:true,
            resizable:true,
            dataIndex:'type',
        },
        {
            header:'Reference',
//			sortable:true,
            resizable:true,
            dataIndex:'ref',
        },
        {
            header:'Jumlah',
//			sortable:true,
            resizable:true,
            dataIndex:'amount',
            align:'right'
        },
        {
            header:'Memo',
//			sortable:true,
            resizable:true,
            dataIndex:'memo',
        },

        /*
         {
         header:'amount',
         sortable:true,
         resizable:true,
         dataIndex:'amount',
         width:100
         },
         {
         header:'dimension_id',
         sortable:true,
         resizable:true,
         dataIndex:'dimension_id',
         width:100
         },
         {
         header:'dimension2_id',
         sortable:true,
         resizable:true,
         dataIndex:'dimension2_id',
         width:100
         },
         {
         header:'person_type_id',
         sortable:true,
         resizable:true,
         dataIndex:'person_type_id',
         width:100
         },
         */
        {
            header:'Pengguna',
//			sortable:true,
            resizable:true,
            dataIndex:'person',
        },

    ],
    initComponent:function () {
        //this.store = jun.rztGlTrans;
        this.store = jun.glTransStore;
//        this.bbar = {
//            items:[
//                {
//                    xtype:'paging',
//                    store:this.store,
//                    displayInfo:true,
//                    pageSize:25
//                }
//            ]
//        };

        this.tbar = {
            xtype:'toolbar',
            buttonAlign:'center',
            items:[' Dari : ',
                {
                    xtype:'datefield',
                    name:'from_date_gltrans',
                    id:'from_date_gltrans',
                    format:'d/m/Y',
                    value:new Date()
                },
                {
                    xtype:'tbseparator',
                    //hidden: true,

                }, ' Sampai : ',
                {
                    xtype:'datefield',
                    name:'to_date_gltrans',
                    id:'to_date_gltrans',
                    format:'d/m/Y',
                    value:new Date()
                },
                {
                    xtype:'tbseparator',
                    //hidden: true,

                },
                {
                    xtype:'button',
                    text:'Proses',
                    ref:'../btnRefresh'
                }
            ]
        };

        this.store.on('beforeload', function (store, options) {
            options.params = {
                from_date:(new Date(Ext.getCmp('from_date_gltrans').getValue())).dateFormat('Y-m-d'),
                to_date:(new Date(Ext.getCmp('to_date_gltrans').getValue())).dateFormat('Y-m-d'),
            };
        });

        jun.GlTransGrid.superclass.initComponent.call(this);
//	        this.btnAdd.on('Click', this.loadForm, this);
//                this.btnEdit.on('Click', this.loadEditForm, this);
//                this.btnDelete.on('Click', this.deleteRec, this);
        this.btnRefresh.on('click', this.onbtnRefreshClick, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },

    onbtnRefreshClick:function () {
        this.store.load();
    },

    getrow:function (sm, idx, r) {
        this.record = r;

        var selectedz = this.sm.getSelections();
    },

    loadForm:function () {
        var form = new jun.GlTransWin({modez:0});
        form.show();
    },

    loadEditForm:function () {

        var selectedz = this.sm.getSelected();

        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.GlTransWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },

    deleteRec:function () {
        Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
    },

    deleteRecYes:function () {

        var record = this.sm.getSelected();

        // Check is list selected
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Jenis Pelayanan");
            return;
        }

        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'Wanted/GlTrans/delete/id/' + record.json.id,
            //url: 'index.php/api/GlTrans/delete/' + record[0].json.nosjp,
            method:'POST',

            success:function (response) {
                jun.rztGlTrans.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });

    }
})
