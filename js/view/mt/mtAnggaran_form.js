jun.pahKasAwalStore = new Ext.data.JsonStore({
    //autoDestroy:true,
    root:'data',
    storeId:'kasAwalStore',
    //scope:jun.NotaDtlGrid,
    url:'Mahkotrans/MtbankTrans/view',
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
jun.MtKasAwalGrid = Ext.extend(Ext.grid.GridPanel, {
    id:'docs-jun.KasAwalGrid',
    frameHeader:false,
    header:false,
    modal:true,
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
            //sortable:true,
            resizable:true,
            dataIndex:'type',
            //			width:100
        },
        {
            header:'Reference',
            sortable:true,
            resizable:true,
            dataIndex:'ref',
            //			width:100
        },
        {
            header:'Tanggal',
            sortable:true,
            resizable:true,
            dataIndex:'tgl',
            //			width:100
        },
        {
            header:'Debit',
            sortable:true,
            resizable:true,
            dataIndex:'debit',
            align:'right'
        },
        {
            header:'Kredit',
            sortable:true,
            resizable:true,
            dataIndex:'kredit',
            align:'right'
        },
        {
            header:'Neraca',
            sortable:true,
            resizable:true,
            dataIndex:'neraca',
            align:'right'
        },
        {
            header:'Person/Item',
            sortable:true,
            resizable:true,
            dataIndex:'person',
        }
    ],
    initComponent:function () {
        this.store = jun.pahKasAwalStore;
        this.store.on({

            'load':{
                fn:function (store, records, options) {
                },
                scope:this
            },
            'loadexception':{

                fn:function (obj, options, response, e) {
                    console.info('store loadexception, arguments:', arguments);
                    console.info('error = ', e);
                },
                scope:this
            }

        });
        this.store.on('beforeload', function (store, options) {
            var bulan = Ext.getCmp('periode_bulanid').getValue();
            var tahun = Ext.getCmp('periode_tahunid').getValue();
            var tgl = new Date(tahun + '-' + bulan + '-01');
            options.params = {
                bank_act:null,
                from_date:tgl.format('Y-m-d'),
                to_date:tgl.format('Y-m-t'),
            };
        });
        jun.MtKasAwalGrid.superclass.initComponent.call(this);
        this.store.load();
    },
    onbtnPrintClick:function () {
        Ext.getCmp('form-MtChartTypes').getForm().submit({
            url:'Mahkotrans/MtBankTrans/print/',
            timeOut:1000,
            scope:this,
            success:function (f, a) {
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
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            }

        });
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'Mahkotrans/MtBankTrans/print/',
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
    },
    loadForm:function () {
        var form = new jun.BankTransWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
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
pahcheckPeriodeAnggaran = function () {
    //console.info('Bulan ' + this.cmbBulan.value + 'Tahun ' + this.periode_tahun.defaultValue);
    Ext.Ajax.request({

        url:'Mahkotrans/MtAnggaran/IsPeriodeExist/',
        params:{
            bulan:Ext.getCmp('periode_bulanid').getValue(),
            tahun:Ext.getCmp('periode_tahunid').getValue(),
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
            }
            pahgetsaldo();
        },
        failure:function (f, a) {
            Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
        }
    });
}
pahgetsaldo = function () {
    Ext.Ajax.request({

        url:'Mahkotrans/MtAnggaran/getSaldo/',
        params:{
            bulan:Ext.getCmp('periode_bulanid').getValue(),
            tahun:Ext.getCmp('periode_tahunid').getValue(),
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
            } else {
                Ext.getCmp('saldoawalid').setValue(response.sisa);
                Ext.get('saldoawalid').focus();
                Ext.getCmp('kasmasukid').setValue(response.current);
                Ext.get('kasmasukid').focus();
                Ext.getCmp('totalangid').setValue(response.total);
                Ext.get('totalangid').focus();
                Ext.get('doc_refid').focus();
                jun.rztMtAnggaranDetil.refreshData();
            }
        },
        failure:function (f, a) {
            Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
        }
    });
}
jun.MtAnggaranWin = Ext.extend(Ext.Window, {
    title:'Anggaran',
    iconCls:'asp-pay',
    modez:1,
    width:621,
    height:455,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #E4E4E4; padding: 10px',
                id:'form-MtAnggaran',
                layout:'absolute',
                ref:'formz',
                border:false,
                anchor:'100% 100%',
                items:[
                    {
                        xtype:'label',
                        text:'Ref. Dokumen:',
                        x:5,
                        y:5
                    },
                    {
                        xtype:'textfield',
                        //fieldLabel:'Doc. Ref',
                        x:85,
                        y:2,
                        height:20,
                        width:100,
                        hideLabel:false,
                        //hidden:true,
                        name:'doc_ref',
                        id:'doc_refid',
                        ref:'../doc_ref',
                        maxLength:15,
                        //allowBlank: 1,
                        //anchor:'100%',
                        readOnly:true,
                    },
                    {
                        xtype:'label',
                        text:'Periode Bulan:',
                        x:195,
                        y:5
                    },
                    new jun.comboBulan({
                        x:275,
                        y:2,
                        width:100,
                        height:20,
                        ref:'../cmbBulan',
                        id:'periode_bulanid',
                        name:'periode_bulan',
                        hiddenName:'periode_bulan',
                        hiddenValue:'periode_bulan',
                    }),
                    {
                        xtype:'label',
                        text:'Periode Tahun:',
                        x:385,
                        y:5
                    },
                    {
                        xtype:'spinnerfield',
                        fieldLabel:'periode_tahun',
                        hideLabel:false,
                        //hidden:true,
                        name:'periode_tahun',
                        id:'periode_tahunid',
                        ref:'../periode_tahun',
                        maxLength:4,
                        minValue:2000,
                        maxValue:3000,
                        defaultValue:2012,
                        x:465,
                        y:2,
                        width:100,
                        onBlur:pahcheckPeriodeAnggaran,
                    },
                    {
                        xtype:'label',
                        text:'Saldo Kas Awal Bulan (Sisa anggaran bulan lalu):',
                        x:5,
                        y:35
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:32,
                        //width:200,
                        name:'saldoawal',
                        id:'saldoawalid',
                        ref:'../saldoawal',
                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Penerimaan Kas Bulan Ini:',
                        x:5,
                        y:65
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:62,
                        width:275,
                        name:'kasmasuk',
                        id:'kasmasukid',
                        ref:'../kasmasuk',
                        readOnly:true,
                    },
                    {
                        xtype:'button',
                        x:556,
                        y:62,
                        iconCls:'silk-information',
                        name:'Detil',
                        id:'Detilid',
                        ref:'../btnDetil',
                        //                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Total Anggaran untuk Dialokasikan:',
                        x:5,
                        y:95
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:92,
                        //width:200,
                        name:'totalang',
                        id:'totalangid',
                        ref:'../totalang',
                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Total Anggaran Sudah Dialokasikan:',
                        x:5,
                        y:330
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:327,
                        //width:200,
                        name:'totalangsud',
                        id:'totalangsudid',
                        ref:'../totalangsud',
                        readOnly:true,
                        anchor:'100%'
                    },
                    {
                        xtype:'label',
                        text:'Total Anggaran Belum Dialokasikan:',
                        x:5,
                        y:360
                    },
                    {
                        xtype:'numericfield',
                        x:275,
                        y:357,
                        //width:200,
                        name:'totalangblm',
                        id:'totalangblmid',
                        ref:'../totalangblm',
                        readOnly:true,
                        anchor:'100%'
                    },
                    new jun.MtAnggaranDetilGrid({
                        x:5,
                        y:122,
                        height:200,
                        frameHeader:false,
                        header:false,
                        //modez:this.modez
                    })
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Simpan',
                    hidden:false,
                    ref:'../btnSave'
                },
                {
                    xtype:'button',
                    text:'Simpan & Tutup',
                    ref:'../btnSaveClose'
                },
                {
                    xtype:'button',
                    text:'Batal',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.rztMtAnggaranDetil.removeAll();
        jun.rztMtChartMaster.reload();
        jun.MtAnggaranWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbBulan.on('select', this.oncmbBulanchange, this);
        this.periode_tahun.on('spin', this.onperiodetahunchange, this);
        this.btnDetil.on('click', this.onbtnDetilclick, this);
        if (this.modez == 1 || this.modez == 2) {
            jun.rztMtAnggaranDetil.proxy = new Ext.data.HttpProxy({ url:'Mahkotrans/MtAnggaranDetil/index/id/' + this.id + '/?output=json' });
            jun.rztMtAnggaranDetil.on({
                'load':{fn:function (store, records, options) {
                    jun.rztMtAnggaranDetil.refreshData();
                }}
            });
            jun.rztMtAnggaranDetil.load();
            this.cmbBulan.readOnly = true;
            this.periode_tahun.readOnly = true;
        }
        if (this.modez == 1 || this.modez == 2) {            
            this.btnSave.setVisible(false);
        } else {            
            this.btnSave.setVisible(true);
        }
    },
    btnDisabled:function (status) {
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    onbtnDetilclick:function () {
        if (Ext.getCmp('periode_bulanid').getValue() == "" || Ext.getCmp('periode_tahunid').getValue() == "") {
            Ext.MessageBox.show({
                title:'Warning',
                msg:"Silahkan pilih bulan dan tahun anggaran terlebih dahulu.",
                buttons:Ext.MessageBox.OK,
                icon:Ext.MessageBox.WARNING
            });
            return;
        }
        win = new Ext.Window({
            layout:'fit',
            title:"Detil Mutasi Kas",
            modal:true,
            width:750,
            height:400,
            items:new jun.MtKasAwalGrid(),
            buttons:[
                {
                    text:'Tutup',
                    handler:function () {
                        win.close();
                    }
                }
            ]
        });
        win.show();
        //        var detil = new jun.MtKasAwalGrid();
        //        detil.show(this);
    },
    onperiodetahunchange:function () {
        if (Ext.getCmp('periode_tahunid').getValue() == "" || this.cmbBulan.value == undefined)
            return;
        this.periode_tahun.focus();
        //getsaldo();
    },
    oncmbBulanchange:function () {
        var value = Ext.getCmp('periode_tahunid').getValue();
        if (Ext.getCmp('periode_tahunid').getValue() == "" || this.cmbBulan.value == undefined)
            return;
        pahcheckPeriodeAnggaran();
        //getsaldo();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'Mahkotrans/MtAnggaran/update/';
        } else {
            Ext.Ajax.request({
                //
                url:'Mahkotrans/MtAnggaran/IsPeriodeExist/',
                params:{
                    bulan:this.cmbBulan.value,
                    tahun:this.periode_tahun.defaultValue,
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
                },
                failure:function (f, a) {
                    Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
                    this.btnDisabled(false);
                }
            });
            urlz = 'Mahkotrans/MtAnggaran/create/';
        }
        Ext.getCmp('form-MtAnggaran').getForm().submit({
            url:urlz,
            params:{
                bulanStr:this.cmbBulan.getRawValue(),
                detil:Ext.encode(Ext.pluck(jun.rztMtAnggaranDetil.data.items, 'data')),
                id:this.id,
            },
            timeOut:1000,
            //
            scope:this,
            success:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title:'Anggaran',
                        msg:"Anggaran bulan " + response.bulan + " tahun " + response.tahun + " gagal disimpan.<br /> Alasan : " + response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.ERROR
                    });
                    this.btnDisabled(false);
                    return;
                }
                if (this.modez == 0) {
                    Ext.MessageBox.show({
                        title:'Anggaran',
                        msg:"Anggaran bulan " + response.bulan + " tahun " + response.tahun + " berhasil disimpan.<br /> Ref. Dokumen : " + response.id,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    Ext.getCmp('form-MtAnggaran').getForm().reset();
                    this.btnDisabled(false);
                }
                jun.rztMtAnggaran.reload();
                this.close();
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
                this.btnDisabled(false);
            }

        });
    },
    onloadrecordupdate:function () {
        pahgetsaldo();
    },
    onbtnSaveCloseClick:function () {
        this.closeForm = true;
        this.saveForm(true);
    },
    onbtnSaveclick:function () {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick:function () {
        this.close();
    }

});
