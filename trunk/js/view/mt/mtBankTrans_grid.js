jun.mtbankTransStore = new Ext.data.JsonStore({
    root: 'data',
    storeId: 'bankTransStore',
    url: 'Mahkotrans/MtbankTrans/view',
    fields: [
        {name: 'type'},
        {name: 'ref'},
        {name: 'tgl'},
        {name: 'debit'},
        {name: 'kredit'},
        {name: 'neraca'},
        {name: 'person'}
    ],
    //data:[],
    autoLoad: false,
    autoSave: false,
});
jun.mtGlTransReportStore = new Ext.data.JsonStore({
    root: 'data',
    storeId: 'mtGlTransReportStore',
    url: 'Mahkotrans/MtGlTrans/view',
    fields: [
        {name: 'tgl'},
        {name: 'type'},
        {name: 'type_no'},
        {name: 'ref'},
        {name: 'amount'},
        {name: 'person'}
    ],
    //data:[],
    autoLoad: false,
    autoSave: false,
});
jun.mtGeneralLedgerTransReportStore = new Ext.data.JsonStore({
    root: 'data',
    storeId: 'mtGeneralLedgerTransReportStore',
    url: 'Mahkotrans/MtGlTrans/ViewJurnalUmum',
    fields: [
        {name: 'type'},
        {name: 'type_no'},
        {name: 'tgl'},
        {name: 'account'},
        {name: 'debit'},
        {name: 'kredit'},
    ],
    autoLoad: false,
    autoSave: false,
});
jun.MtBankTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Mutasi Kas per Bank",
    id: 'docs-jun.BankTransGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true,
        getRowClass: function(record, index) {
            var c = record.get('type');
            if (c.indexOf("Saldo Awal -") !== -1)
                return 'x-row-bold'
            if (c.indexOf("Saldo Akhir -") !== -1)
                return 'x-row-bold'
        }
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'Type',
            //
            resizable: true,
            dataIndex: 'type',
        },
        {
            header: 'Reference',
            resizable: true,
            dataIndex: 'ref',
        },
        {
            header: 'Tanggal',
            resizable: true,
            dataIndex: 'tgl',
        },
        {
            header: 'Debit',
            resizable: true,
            dataIndex: 'debit',
            align: 'right'
        },
        {
            header: 'Kredit',
            resizable: true,
            dataIndex: 'kredit',
            align: 'right'
        },
        {
            header: 'Neraca',
            resizable: true,
            dataIndex: 'neraca',
            align: 'right'
        },
        {
            header: 'Person',
            resizable: true,
            dataIndex: 'person',
        }
    ],
    initComponent: function() {
        this.store = jun.mtbankTransStore;
        this.store.on({
            'load': {
                fn: function(store, records, options) {
                },
                scope: this
            },
            'loadexception': {
                fn: function(obj, options, response, e) {
                    console.info('store loadexception, arguments:', arguments);
                    console.info('error = ', e);
                },
                scope: this
            }

        });
        this.store.on('beforeload', function(store, options) {
            store.removeAll();
            options.params = {
                bank_act: Ext.getCmp('bank_act_banktrans').getValue(),
                from_date: (new Date(Ext.getCmp('from_date_banktrans').getValue())).dateFormat('Y-m-d'),
                to_date: (new Date(Ext.getCmp('to_date_banktrans').getValue())).dateFormat('Y-m-d'),
            };
        });
        this.tbar = {
            xtype: 'toolbar',
            buttonAlign: 'center',
            items: ['Akun Bank : ', {
                    xtype: 'combo',
                    id: 'bank_act_banktrans',
                    typeAhead: true,
                    triggerAction: 'all',
                    lazyRender: true,
                    mode: 'local',
                    fieldLabel: 'bank_act',
                    store: jun.rztMtBankAccounts,
                    valueField: 'id',
                    displayField: 'bank_account_name',
                }, {
                    xtype: 'tbseparator',
                }, ' Dari : ', {
                    xtype: 'datefield',
                    name: 'from_date_banktrans',
                    id: 'from_date_banktrans',
                    format: 'd/m/Y',
                    value: new Date()
                }, {
                    xtype: 'tbseparator',
                }, ' Sampai : ', {
                    xtype: 'datefield',
                    name: 'to_date_banktrans',
                    id: 'to_date_banktrans',
                    format: 'd/m/Y',
                    value: new Date()
                }, {
                    xtype: 'tbseparator',
                }, {
                    xtype: 'button',
                    text: 'Tampilkan',
                    ref: '../btnRefresh'
                },
            ]
        };
        jun.rztMtBankAccounts.reload();
        jun.MtBankTransGrid.superclass.initComponent.call(this);
        this.btnRefresh.on('click', this.onbtnRefreshClick, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    onbtnPrintClick: function() {
        Ext.getCmp('form-MtChartTypes').getForm().submit({
            url: 'Mahkotrans/MtBankTrans/print/',
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                jun.rztMtChartTypes.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-MtChartTypes').getForm().reset();
                    }
                }
            },
            failure: function(f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            }

        });
        Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: 'Mahkotrans/MtBankTrans/print/',
            params: {
                bank_act: Ext.getCmp('bank_act_banktrans').getValue(),
                from_date: (new Date(Ext.getCmp('from_date_banktrans').getValue())).dateFormat('Y-m-d'),
                to_date: (new Date(Ext.getCmp('to_date_banktrans').getValue())).dateFormat('Y-m-d'),
            },
            success: function(response) {
            },
            failure: function(response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    },
    getrow: function(sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    onbtnRefreshClick: function() {
        this.store.load();
    },
    loadForm: function() {
        var form = new jun.BankTransWin({modez: 0});
        form.show();
    },
    loadEditForm: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.BankTransWin({modez: 1, id: idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
})
jun.MtGlTransReportGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Jurnal",
    id: 'docs-jun.MtGlTransReportGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true,
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'Tanggal',
            resizable: true,
            dataIndex: 'tgl',
        },
        {
            header: 'Tipe Transaksi',
            resizable: true,
            dataIndex: 'type',
        },
        {
            header: 'No. Transaksi',
            resizable: true,
            dataIndex: 'type_no',
        },
        {
            header: 'Ref. Dokumen',
            resizable: true,
            dataIndex: 'ref',
        },
        {
            header: 'Total',
            resizable: true,
            dataIndex: 'amount',
            align: 'right',
        },
        {
            header: 'Person',
            resizable: true,
            dataIndex: 'person',
        }
    ],
    initComponent: function() {
        this.store = jun.mtGlTransReportStore;
        this.store.on({
            'load': {
                fn: function(store, records, options) {
                },
                scope: this
            },
            'loadexception': {
                fn: function(obj, options, response, e) {
                    console.info('store loadexception, arguments:', arguments);
                    console.info('error = ', e);
                },
                scope: this
            }

        });
        this.store.on('beforeload', function(store, options) {
            store.removeAll();
            options.params = {
                from_date: (new Date(Ext.getCmp('from_date_mt_gltrans').getValue())).dateFormat('Y-m-d'),
                to_date: (new Date(Ext.getCmp('to_date_mt_gltrans').getValue())).dateFormat('Y-m-d'),
            };
        });
        this.tbar = {
            xtype: 'toolbar',
            buttonAlign: 'center',
            items: [
                ' Dari : ', {
                    xtype: 'datefield',
                    name: 'from_date_mt_gltrans',
                    id: 'from_date_mt_gltrans',
                    format: 'd/m/Y',
                    value: new Date()
                },
                {
                    xtype: 'tbseparator',
                }, ' Sampai : ', {
                    xtype: 'datefield',
                    name: 'to_date_mt_gltrans',
                    id: 'to_date_mt_gltrans',
                    format: 'd/m/Y',
                    value: new Date()
                },
                {
                    xtype: 'tbseparator',
                }, {
                    xtype: 'button',
                    text: 'Tampilkan',
                    ref: '../btnRefresh'
                },
            ]
        };

        jun.MtBankTransGrid.superclass.initComponent.call(this);
        this.btnRefresh.on('click', this.onbtnRefreshClick, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow: function(sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    onbtnRefreshClick: function() {
        this.store.load();
    },
    loadForm: function() {
        var form = new jun.BankTransWin({modez: 0});
        form.show();
    },
    loadEditForm: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.BankTransWin({modez: 1, id: idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
})
jun.MtGeneralLedgerTransReportGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Jurnal Umum",
    id: 'docs-jun.MtGeneralLedgerTransReportGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true,
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'Tanggal',
            resizable: true,
            dataIndex: 'tgl',
        },
        {
            header: 'Tipe Transaksi',
            resizable: true,
            dataIndex: 'type',
        },
        {
            header: 'No. Transaksi',
            resizable: true,
            dataIndex: 'type_no',
        },
        {
            header: 'Account',
            resizable: true,
            dataIndex: 'account',
        },
        {
            header: 'Debit',
            resizable: true,
            dataIndex: 'debit',
            align: 'right',
        },
        {
            header: 'Kredit',
            resizable: true,
            dataIndex: 'kredit',
            align: 'right',
        },
    ],
    initComponent: function() {
        this.store = jun.mtGeneralLedgerTransReportStore;
        this.store.on({
            'load': {
                fn: function(store, records, options) {
                },
                scope: this
            },
            'loadexception': {
                fn: function(obj, options, response, e) {
                    console.info('store loadexception, arguments:', arguments);
                    console.info('error = ', e);
                },
                scope: this
            }

        });
        this.store.on('beforeload', function(store, options) {
            store.removeAll();
            options.params = {
                from_date: (new Date(Ext.getCmp('from_date_mt_GeneralLedgertrans').getValue())).dateFormat('Y-m-d'),
                to_date: (new Date(Ext.getCmp('to_date_mt_GeneralLedgertrans').getValue())).dateFormat('Y-m-d'),
            };
        });
        this.tbar = {
            xtype: 'toolbar',
            buttonAlign: 'center',
            items: [
                ' Dari : ', {
                    xtype: 'datefield',
                    name: 'from_date_mt_GeneralLedgertrans',
                    id: 'from_date_mt_GeneralLedgertrans',
                    format: 'd/m/Y',
                    value: new Date()
                },
                {
                    xtype: 'tbseparator',
                }, ' Sampai : ', {
                    xtype: 'datefield',
                    name: 'to_date_mt_GeneralLedgertrans',
                    id: 'to_date_mt_GeneralLedgertrans',
                    format: 'd/m/Y',
                    value: new Date()
                },
                {
                    xtype: 'tbseparator',
                }, {
                    xtype: 'button',
                    text: 'Tampilkan',
                    ref: '../btnRefresh'
                },
            ]
        };

        jun.MtBankTransGrid.superclass.initComponent.call(this);
        this.btnRefresh.on('click', this.onbtnRefreshClick, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow: function(sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    onbtnRefreshClick: function() {
        this.store.load();
    },
    loadForm: function() {
        var form = new jun.BankTransWin({modez: 0});
        form.show();
    },
    loadEditForm: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.BankTransWin({modez: 1, id: idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
})
