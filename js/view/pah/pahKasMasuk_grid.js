jun.PahKasMasukGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Daftar Kas Masuk",
    id:'docs-jun.PahKasMasukGrid',
    iconCls: 'silk-grid',
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
            width:100,
            align:'right',
            renderer:Ext.util.Format.numberRenderer('0,0')
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
//        this.bbar = {
//            items:[
//                {
//                    xtype:'paging',
//                    store:this.store,
//                    displayInfo:true,
//                    pageSize:10
//                }
//            ]
//        };
        this.tbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Tambah Kas Masuk',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Lihat Kas Masuk',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Void Kas Masuk',
                    ref:'../btnDelete'
                },
            ]
        };
        jun.rztPahKasMasuk.load();
        jun.PahKasMasukGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
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
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Penerimaan Kas");
            return;
        }
        var idz = selectedz.json.kas_masuk_id;
        Ext.Ajax.request({
//
            url:'PondokHarapan/PahKasMasuk/view/',
            params:{
                id:idz,
            },
            method:'POST',
            success:function (f, a) {
                var response = Ext.decode(f.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title:'Warning',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.WARNING
                    });
                    return;
                }
//                this.show();
                var data = response.data[0];
                var form = new jun.PahKasMasukShowWin({modez:1, id:idz});
                form.txtRef.text = data.doc_ref;
                form.trans_entry.text = data.entry_time;
                form.no_bukti.text = data.no_bukti;
                form.trans_date.text = data.trans_date;
                form.kas.text = data.bank_account_name;
                form.donatur.text = data.name;
                form.amount.text = Ext.util.Format.number(data.amount, '0,0');
                form.trans_via.text = data.trans_via;
                form.codeRek.text = data.account_code;
                form.codeDesc.text = data.description;
                form.show(this);
                //var myform = Ext.getCmp('refid');
//                Ext.getCmp('refid').text = data.doc_ref;
//                Ext.getCmp('form-PahKasMasukShow').reload;
                //this.txtRef.text = data.doc_ref;
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            }
        });
    },
    deleteRec:function () {
        var record = this.sm.getSelected();
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Kas Masuk");
            return;
        }
        var form = new jun.PahKasMasukVoidWin({id:record.json.kas_masuk_id});
        form.show(this);
    },
})
