jun.MtKasKeluarGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Kas Keluar",
    id: 'docs-jun.MtKasKeluarGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true,
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'Ref. Dokumen',
            sortable: true,
            resizable: true,
            dataIndex: 'doc_ref',
            width: 100
        },
        {
            header: 'Tanggal Transaksi',
            sortable: true,
            resizable: true,
            dataIndex: 'trans_date',
            width: 100
        },
        {
            header: 'No. Bukti',
            sortable: true,
            resizable: true,
            dataIndex: 'no_bukti',
            width: 100
        },
        {
            header: 'Jumlah',
            sortable: true,
            resizable: true,
            dataIndex: 'amount',
            width: 100,
            align: 'right',
            renderer: Ext.util.Format.numberRenderer('0,0')
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
         header:'mt_account_code',
         sortable:true,
         resizable:true,                        
         dataIndex:'mt_account_code',
         width:100
         },
         {
         header:'mt_bank_accounts_id',
         sortable:true,
         resizable:true,                        
         dataIndex:'mt_bank_accounts_id',
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
         header:'note',
         sortable:true,
         resizable:true,                        
         dataIndex:'note',
         width:100
         },
         {
         header:'id_mobil',
         sortable:true,
         resizable:true,                        
         dataIndex:'id_mobil',
         width:100
         },
         */

    ],
    initComponent: function() {
        this.store = jun.rztMtKasKeluar;
//        this.bbar = {
//            items: [
//           {
//            xtype: 'paging',
//            store: this.store,
//            displayInfo: true,
//            pageSize: 10
//           }]
//        };

        this.tbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Tambah Kas Keluar',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Lihat Kas Keluar',
                    ref: '../btnEdit'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Void Kas Keluar',
                    ref: '../btnDelete'
                }
            ]
        };
        jun.rztMtKasKeluar.reload();
        jun.MtKasKeluarGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow: function(sm, idx, r) {
        this.record = r;

        var selectedz = this.sm.getSelections();
    },
    loadForm: function() {
        var form = new jun.MtKasKeluarWin({modez: 0});
        form.show();
    },
    loadEditForm: function() {

        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Pengeluaran Kas");
            return;
        }
        var idz = selectedz.json.kas_keluar_id;
        var id_mobilz = selectedz.json.id_mobil;
        Ext.Ajax.request({
//
            url: 'Mahkotrans/MtKasKeluar/view/',
            params: {
                id: idz,
                id_mobil: id_mobilz
            },
            method: 'POST',
            success: function(f, a) {
                var response = Ext.decode(f.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title: 'Warning',
                        msg: response.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    return;
                }
                var data = response.data[0];
                var form = new jun.MtKasKeluarShowWin({modez: 1, id: idz});
                form.txtRef.text = data.doc_ref;
                form.trans_entry.text = data.entry_time;
                form.no_bukti.text = data.no_bukti;
                form.trans_date.text = data.trans_date;
                form.kas.text = data.bank_account_name;
                form.mobil.text = data.nopol;
                form.amount.text = Ext.util.Format.number(data.amount, '0,0');
                form.trans_via.text = data.trans_via;
                form.codeRek.text = data.account_code;
                form.codeDesc.text = data.description;
                form.show(this);
            },
            failure: function(f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            }
        });
    },
    deleteRec: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih kas keluar.");
            return;
        }
        var idz = selectedz.json.kas_keluar_id;
        var form = new jun.MtKasKeluarVoidWin({id: idz});
        form.show(this);    
    },    
})
