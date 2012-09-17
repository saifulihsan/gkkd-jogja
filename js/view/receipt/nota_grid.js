jun.salesRenderer = function (text) {
    return function (value) {
        var store = jun.rztSales;
        var index = store.find('sales_id', value);
        var record = store.getAt(index);
        return record.data.name;
    }
}

jun.custRenderer = function (text) {
    return function (value) {
        var store = jun.rztCustomers;
        var index = store.find('customer_id', value);
        var record = store.getAt(index);
        return record.data.name;
    }
}

jun.NotaGrid = Ext.extend(Ext.grid.EditorGridPanel, {
    title:"Daftar Nota",
    id:'docs-jun.NotaGrid',
    width:400,
    height:250,
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'ID',
            sortable:true,
            resizable:true,
            dataIndex:'nota_id',
            width:50
        },
        {
            header:'Salesman',
            sortable:true,
            resizable:true,
            dataIndex:'sales_id',
            editor:new fm.TextField({
                readOnly:true,
            }),
            width:100,
            renderer:new jun.salesRenderer(this.editor)
        },
//                                {
//			header:'term',
//			sortable:true,
//			resizable:true,
//                        dataIndex:'term',
//			width:100
//		},
//                                {
//			header:'warehouse',
//			sortable:true,
//			resizable:true,
//                        dataIndex:'warehouse',
//			width:100
//		},
//                                {
//			header:'status',
//			sortable:true,
//			resizable:true,
//                        dataIndex:'status',
//			width:100
//		},
//                                {
//			header:'currency',
//			sortable:true,
//			resizable:true,
//                        dataIndex:'currency',
//			width:100
//		},
        /*
         {
         header:'notes',
         sortable:true,
         resizable:true,
         dataIndex:'notes',
         width:100
         },
         {
         header:'rate',
         sortable:true,
         resizable:true,
         dataIndex:'rate',
         width:100
         },
         {
         header:'doc_date',
         sortable:true,
         resizable:true,
         dataIndex:'doc_date',
         width:100
         },*/
        {
            header:'Referensi',
            sortable:true,
            resizable:true,
            dataIndex:'doc_ref',
            width:100
        },
        {
            header:'Pelanggan',
            sortable:true,
            resizable:true,
            dataIndex:'customer_id',
            width:100,
            editor:new fm.TextField({
                readOnly:true,
            }),
            renderer:new jun.custRenderer(this.editor)
        },
        {
            header:'Tgl Transaksi',
            sortable:true,
            resizable:true,
            dataIndex:'trans_date',
            width:100
        },
        {
            header:'Total',
            sortable:true,
            resizable:true,
            dataIndex:'total_1',
            width:100
        },
        {
            header:'Diskon',
            sortable:true,
            resizable:true,
            dataIndex:'disc',
            width:100
        },
        {
            header:'Grand Total',
            sortable:true,
            resizable:true,
            dataIndex:'total_2',
            width:100
        }


    ],
    initComponent:function () {
        this.store = jun.rztNota;
        this.bbar = {
            items:[
                {
                    xtype:'paging',
                    store:this.store,
                    displayInfo:true,
                    pageSize:10
                }
            ]
        };

        this.tbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Buat Nota Baru',
                    ref:'../btnAdd'
                },
                {
                    xtype:'button',
                    text:'Lihat Nota',
                    ref:'../btnEdit'
                },
                {
                    xtype:'button',
                    text:'Void Nota',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.NotaGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
        this.on('beforeclose', this.beforeClose, this);

    },

    beforeClose:function(p,anim){
        this.getSelectionModel().clearSelections();
    },

    getrow:function (sm, idx, r) {
        this.record = r;

        var selectedz = this.sm.getSelections();
    },

    loadForm:function () {
        //var form = new jun.Nota({modez:0});
        //jun.NotaDtlGrid.reconfigure(store);
        var form = new jun.NotaWin({modez:0,id:0});
        form.show();
        //form.destroy();
    },

    loadEditForm:function () {

        var selectedz = this.sm.getSelected();

        //var dodol = this.store.getAt(0);
        if (selectedz == null) {
            Ext.MessageBox.alert("Warning", "Anda belum memilih nota");
            return;
        }

        var idz = selectedz.json.nota_id;
        var form = new jun.NotaWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
//        this.getSelectionModel().clearSelections();
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
            url:'user/Nota/delete/id/' + record.json.nota_id,
            //url: 'api/Nota/delete/' + record[0].json.nosjp,
            method:'POST',

            success:function (response) {
                jun.rztNota.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });

    }
})
