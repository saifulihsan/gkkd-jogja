jun.PahBankAccountsGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Kas dan Bank",
    id:'docs-jun.PahBankAccountsGrid',
    iconCls: 'silk-grid',
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'id',
            sortable:true,
            resizable:true,
            dataIndex:'id',
            hidden:true
        },
        {
            header:'Kode Rekening',
            sortable:true,
            resizable:true,
            dataIndex:'account_code',
        },
//                                {
//			header:'account_type',
//			sortable:true,
//			resizable:true,
//                        dataIndex:'account_type',
//			width:100
//		},
        {
            header:'Kas/Bank',
            sortable:true,
            resizable:true,
            dataIndex:'bank_account_name',
            //width:100
        },
        {
            header:'Nama Bank',
            sortable:true,
            resizable:true,
            dataIndex:'bank_name',
            //width:100
        },
        {
            header:'Nomer Rekening Bank',
            sortable:true,
            resizable:true,
            dataIndex:'bank_account_number',
            //width:100
        },
        {
            header:'Atas Nama',
            sortable:true,
            resizable:true,
            dataIndex:'atas_nama',
        },
        {
            header:'Telepon',
            sortable:true,
            resizable:true,
            dataIndex:'bank_phone',
        },
        {
            header:'Alamat Bank',
            sortable:true,
            resizable:true,
            dataIndex:'bank_address',
        },
        /*
         {
         header:'bank_curr_code',
         sortable:true,
         resizable:true,
         dataIndex:'bank_curr_code',
         width:100
         },
         {
         header:'dflt_curr_act',
         sortable:true,
         resizable:true,
         dataIndex:'dflt_curr_act',
         width:100
         },
         {
         header:'ending_reconcile_balance',
         sortable:true,
         resizable:true,
         dataIndex:'ending_reconcile_balance',
         width:100
         },
         {
         header:'inactive',
         sortable:true,
         resizable:true,
         dataIndex:'inactive',
         width:100
         },
         */
    ],
    initComponent:function () {
        this.store = jun.rztPahBankAccounts;
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
                    text:'Tambah Kas/Bank',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Ubah Kas/Bank',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Hapus Kas/Bank',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.PahBankAccountsGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
        jun.rztPahBankAccounts.load();
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PahBankAccountsWin({modez:0});
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
        var form = new jun.PahBankAccountsWin({modez:1, id:idz});
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
            url:'PondokHarapan/PahBankAccounts/delete/id/' + record.json.id,
            //url: 'index.php/api/PahBankAccounts/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (f, a) {
                var response = Ext.decode(f.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                jun.rztPahBankAccounts.reload();
            },
            failure:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                });
//                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
