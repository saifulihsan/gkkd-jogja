jun.PahKasMasukGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Daftar Kas Masuk",
    id:'docs-jun.PahKasMasukGrid',
//	width:400,
//	height:250,
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'kas_masuk_id',
            sortable:true,
            resizable:true,
            dataIndex:'kas_masuk_id',
            hidden:true,
            width:100
        },
        {
            header:'Tanggal Transaksi',
            sortable:true,
            resizable:true,
            dataIndex:'trans_date',
            width:100
        },
        {
            header:'Ref. Dokumen',
            sortable:true,
            resizable:true,
            dataIndex:'doc_ref',
            width:100
        },

        {
            header:'No. Bukti',
            sortable:true,
            resizable:true,
            dataIndex:'no_bukti',
            width:100
        },
        {
            header:'Jumlah',
            sortable:true,
            resizable:true,
            dataIndex:'amount',
            width:100
        },
//                                {
//			header:'Tanggal Entry',
//			sortable:true,
//			resizable:true,
//            dataIndex:'entry_time',
//			width:100
//		},

        /*
         {
         header:'trans_via',
         sortable:true,
         resizable:true,
         dataIndex:'trans_via',
         width:100
         },
         {
         header:'pah_donatur_id',
         sortable:true,
         resizable:true,
         dataIndex:'pah_donatur_id',
         width:100
         },
         {
         header:'pah_chart_master_account_code',
         sortable:true,
         resizable:true,
         dataIndex:'pah_chart_master_account_code',
         width:100
         },
         {
         header:'pah_bank_accounts_id',
         sortable:true,
         resizable:true,
         dataIndex:'pah_bank_accounts_id',
         width:100
         },
         {
         header:'users_id',
         sortable:true,
         resizable:true,
         dataIndex:'users_id',
         width:100
         },
         */

    ],
    initComponent:function () {
        this.store = jun.rztPahKasMasuk;
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
                    text:'Tambah Kas Masuk',
                    ref:'../btnAdd'
                },
//                    {
//                        xtype:'tbseparator',
//                    },
//                    {
//                        xtype: 'button',
//                        text: 'Ubah',
//                        ref: '../btnEdit'
//                    },
//                    {
//                        xtype:'tbseparator',
//                    },
//                    {
//                        xtype: 'button',
//                        text: 'Hapus',
//                        ref: '../btnDelete'
//                    }
            ]
        };
        jun.PahKasMasukGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
//                this.btnEdit.on('Click', this.loadEditForm, this);
//                this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
        jun.rztPahKasMasuk.load();
    },

    getrow:function (sm, idx, r) {
        this.record = r;

        var selectedz = this.sm.getSelections();
    },

    loadForm:function () {
        var form = new jun.PahKasMasukWin({modez:0});
        form.show();
    },

    loadEditForm:function () {

        var selectedz = this.sm.getSelected();

        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.kas_masuk_id;
        var form = new jun.PahKasMasukWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },

    deleteRec:function () {
        Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
    },

    deleteRecYes:function (btn) {

        if (btn == 'no') {
            return;
        }

        var record = this.sm.getSelected();

        // Check is list selected
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Jenis Pelayanan");
            return;
        }

        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahKasMasuk/delete/id/' + record.json.kas_masuk_id,
            //url: 'index.php/api/PahKasMasuk/delete/' + record[0].json.nosjp,
            method:'POST',

            success:function (response) {
                jun.rztPahKasMasuk.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });

    }
})