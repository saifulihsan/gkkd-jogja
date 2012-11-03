jun.PahAktivitasGrupTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Aktivitas Grup Anak",
    id:'docs-jun.PahAktivitasGrupTransGrid',
    //	width:400,
    //	height:250,
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'aktivitas_id',
            sortable:true,
            resizable:true,
            dataIndex:'aktivitas_id',
            width:100,
            hidden:true,
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

        /*
         {
         header:'trans_via',
         sortable:true,
         resizable:true,
         dataIndex:'trans_via',
         width:100
         },
         {
         header:'pah_suppliers_supplier_id',
         sortable:true,
         resizable:true,
         dataIndex:'pah_suppliers_supplier_id',
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
         {
         header:'pah_aktivitas_grup_id',
         sortable:true,
         resizable:true,
         dataIndex:'pah_aktivitas_grup_id',
         width:100
         },
         {
         header:'pah_chart_master_account_code',
         sortable:true,
         resizable:true,
         dataIndex:'pah_chart_master_account_code',
         width:100
         },
         */
    ],
    initComponent:function () {
        this.store = jun.rztPahAktivitasGrupTrans;
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
                    text:'Tambah Aktivitas Grup',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Lihat Aktivitas Grup',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Void Aktivitas Grup',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.rztPahAktivitasGrupTrans.reload();
        jun.PahAktivitasGrupTransGrid.superclass.initComponent.call(this);
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
        var form = new jun.PahAktivitasGrupTransWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Aktivitas Grup");
            return;
        }
        var idz = selectedz.json.aktivitas_id;
        var form = new jun.PahAktivitasGrupTransWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Aktivitas Grup");
            return;
        }
        var idz = selectedz.json.aktivitas_id;
        Ext.Ajax.request({
            url:'PondokHarapan/PahAktivitasGrupTrans/view/',
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
                var data = response.data[0];
                var form = new jun.PahAktivitasGrupShowWin({modez:1, id:idz});
                form.txtRef.text = data.doc_ref;
                form.trans_entry.text = data.entry_time;
                form.no_bukti.text = data.no_bukti;
                form.trans_date.text = data.trans_date;
                form.kas.text = data.bank_account_name;
                form.donatur.text = data.supp_name;
                form.amount.text = Ext.util.Format.number(data.amount, '0,0');
                form.trans_via.text = data.trans_via;
                form.codeRek.text = data.account_code;
                form.codeDesc.text = data.description;
                form.anak.text = data.real_name;
                form.sub_aktivitas.text = data.nama;
                form.show(this);
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            }
        });
    },
    deleteRec:function () {
        var record = this.sm.getSelected();
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Aktivitas Grup");
            return;
        }
        var form = new jun.PahAktivitasGrupTransVoidWin({id:record.json.aktivitas_id});
        form.show(this);
    },
})
