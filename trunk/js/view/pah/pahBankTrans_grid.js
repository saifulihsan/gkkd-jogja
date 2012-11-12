jun.PahBankTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"PahBankTrans",
    id:'docs-jun.PahBankTransGrid',
    width:400,
    height:250,
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'id',
            resizable:true,
            dataIndex:'id',
            width:100
        },
        {
            header:'type',
            resizable:true,
            dataIndex:'type',
            width:150
        },
        {
            header:'trans_no',
            resizable:true,
            dataIndex:'trans_no',
            width:100
        },
        {
            header:'bank_act',
            resizable:true,
            dataIndex:'bank_act',
            width:100
        },
        {
            header:'ref',
            resizable:true,
            dataIndex:'ref',
            width:100
        },
        {
            header:'trans_date',
            resizable:true,
            dataIndex:'trans_date',
            width:100
        },
        /*
         {
         header:'amount',
         resizable:true,
         dataIndex:'amount',
         width:100
         },
         {
         header:'person_type_id',

         resizable:true,
         dataIndex:'person_type_id',
         width:100
         },
         {
         header:'person_id',

         resizable:true,
         dataIndex:'person_id',
         width:100
         },
         {
         header:'reconciled',

         resizable:true,
         dataIndex:'reconciled',
         width:100
         },
         */
    ],
    initComponent:function () {
        this.store = jun.rztPahBankTrans;
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
                    text:'Add',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Edit',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Delete',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.PahBankTransGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
        jun.rztPahBankTrans.load();
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PahBankTransWin({modez:0});
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
        var form = new jun.PahBankTransWin({modez:1, id:idz});
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
            url:'PondokHarapan/PahBankTrans/delete/id/' + record.json.id,
            //url: 'index.php/api/PahBankTrans/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (response) {
                jun.rztPahBankTrans.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
jun.pahbankTransStore = new Ext.data.JsonStore({
    //autoDestroy:true,
    root:'data',
    storeId:'bankTransStore',
    //scope:jun.NotaDtlGrid,
    url:'PondokHarapan/PahbankTrans/view',
    //idProperty: 'item_id',
    fields:[
        {name:'type'},
        {name:'ref'},
        {name:'tgl'},
        {name:'debit'},
        {name:'kredit'},
        {name:'neraca'},
        {name:'person'}
    ],
    //data:[],
    autoLoad:false,
    autoSave:false,
});
jun.PahBankTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Mutasi Kas per Bank",
    id:'docs-jun.BankTransGrid',
    //	width:400,
    //	height:250,
    viewConfig:{
        forceFit:true,
        getRowClass:function (record, index) {
            var c = record.get('type');
            if (c.indexOf("Saldo Awal -") !== -1)
                return 'x-row-bold'
            if (c.indexOf("Saldo Akhir -") !== -1)
                return 'x-row-bold'
        }
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'Type',
            //
            resizable:true,
            dataIndex:'type',
            //			width:100
        },
        {
            header:'Reference',
            resizable:true,
            dataIndex:'ref',
            //			width:100
        },
        {
            header:'Tanggal',
            resizable:true,
            dataIndex:'tgl',
            //			width:100
        },
        {
            header:'Debit',
            resizable:true,
            dataIndex:'debit',
            align:'right'
        },
        {
            header:'Kredit',
            resizable:true,
            dataIndex:'kredit',
            align:'right'
        },
        {
            header:'Neraca',
            resizable:true,
            dataIndex:'neraca',
            align:'right'
        },
        {
            header:'Person',
            resizable:true,
            dataIndex:'person',
        }
    ],
    initComponent:function () {
        this.store = jun.pahbankTransStore;
        this.store.on({

            'load':{
                fn:function (store, records, options) {
                },
                scope:this
            },
            'loadexception':{
                //consult the API for the proxy used for the actual arguments
                fn:function (obj, options, response, e) {
                    console.info('store loadexception, arguments:', arguments);
                    console.info('error = ', e);
                },
                scope:this
            }

        });
        this.store.on('beforeload', function (store, options) {
            options.params = {
                bank_act:Ext.getCmp('bank_act_banktrans').getValue(),
                from_date:(new Date(Ext.getCmp('from_date_banktrans').getValue())).dateFormat('Y-m-d'),
                to_date:(new Date(Ext.getCmp('to_date_banktrans').getValue())).dateFormat('Y-m-d'),
            };
        });
        this.tbar = {
            xtype:'toolbar',
            buttonAlign:'center',
            items:['Akun Bank : ', {
                xtype:'combo',
                id:'bank_act_banktrans',
                typeAhead:true,
                triggerAction:'all',
                lazyRender:true,
                mode:'local',
                fieldLabel:'bank_act',
                store:jun.rztPahBankAccounts,
                //                    hiddenName:'bank_act',
                //                    hiddenValue:'bank_act',
                valueField:'id',
                displayField:'bank_account_name',
            }, {
                xtype:'tbseparator',
                //hidden: true,
            }, ' Dari : ', {
                xtype:'datefield',
                name:'from_date_banktrans',
                id:'from_date_banktrans',
                format:'d/m/Y',
                value:new Date()
            }, {
                xtype:'tbseparator',
                //hidden: true,
            }, ' Sampai : ', {
                xtype:'datefield',
                name:'to_date_banktrans',
                id:'to_date_banktrans',
                format:'d/m/Y',
                value:new Date()
            }, {
                xtype:'tbseparator',
                //hidden: true,
            }, {
                xtype:'button',
                text:'Tampilkan',
                ref:'../btnRefresh'
            }, //                {
                //                    xtype:'tbseparator',
                //                    //hidden: true,
                //                },
                //                {
                //                    xtype:'button',
                //                    text:'Print',
                //                    ref:'../btnPrint'
                //                }
            ]
        };
        jun.rztPahBankAccounts.reload();
        jun.PahBankTransGrid.superclass.initComponent.call(this);
        this.btnRefresh.on('click', this.onbtnRefreshClick, this);
        //        this.btnPrint.on('click', this.onbtnPrintClick, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    onbtnPrintClick:function () {
        Ext.getCmp('form-PahChartTypes').getForm().submit({
            url:'PondokHarapan/PahBankTrans/print/',
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPahChartTypes.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahChartTypes').getForm().reset();
                    }
                }
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            }

        });
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahBankTrans/print/',
            //url: 'index.php/api/BankTrans/delete/' + record[0].json.nosjp,
            params:{
                bank_act:Ext.getCmp('bank_act_banktrans').getValue(),
                from_date:(new Date(Ext.getCmp('from_date_banktrans').getValue())).dateFormat('Y-m-d'),
                to_date:(new Date(Ext.getCmp('to_date_banktrans').getValue())).dateFormat('Y-m-d'),
            },
            success:function (response) {
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    onbtnRefreshClick:function () {
        this.store.load();
        //        var row = this.getView().getRow(1);
        //        row.style.fontWeight = "Bold";
    },
    loadForm:function () {
        var form = new jun.BankTransWin({modez:0});
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
        var form = new jun.BankTransWin({modez:1, id:idz});
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
            url:'Wanted/BankTrans/delete/id/' + record.json.id,
            //url: 'index.php/api/BankTrans/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (response) {
                jun.rztBankTrans.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
