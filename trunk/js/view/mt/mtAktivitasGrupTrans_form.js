jun.MtAktivitasGrupTransWin = Ext.extend(Ext.Window, {
    title:'Aktivitas Grup Anak',
    modez:1,
    width:450,
    height:360,
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
                id:'form-MtAktivitasGrupTrans',
                labelWidth:100,
                labelAlign:'left',
                layout:'form',
                ref:'formz',
                border:false,
                items:[
                    {
                        xtype:'xdatefield',
                        ref:'../trans_date',
                        fieldLabel:'Tanggal Transaksi',
                        name:'trans_date',
                        id:'trans_dateid',
                        format:'d M Y',
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'textfield',
                        fieldLabel:'No. Bukti',
                        hideLabel:false,
                        //hidden:true,
                        name:'no_bukti',
                        id:'no_buktiid',
                        ref:'../no_bukti',
                        maxLength:45,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Pemasok',
                        store:jun.rztMtSuppliers,
                        hiddenName:'mt_suppliers_supplier_id',
                        hiddenValue:'mt_suppliers_supplier_id',
                        valueField:'supplier_id',
                        forceSelection:true,
                        displayField:'supp_name',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbSupplier',
                        lastQuery:''
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kas/Bank',
                        store:jun.rztMtBankAccounts,
                        hiddenName:'mt_bank_accounts_id',
                        hiddenValue:'mt_bank_accounts_id',
                        valueField:'id',
                        forceSelection:true,
                        displayField:'bank_account_name',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbBank',
                        lastQuery:''
                    },
                    new jun.comboPayment({
                        fieldLabel:'Cara Bayar',
                        value:'Tunai',
                        anchor:'100%',
                        name:'trans_via'
                    }),
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Grup Anak',
                        store:jun.rztMtAktivitasGrup,
                        hiddenName:'mt_aktivitas_grup_id',
                        hiddenValue:'mt_aktivitas_grup_id',
                        valueField:'id',
                        forceSelection:true,
                        displayField:'name',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbAnak',
                        lastQuery:''
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Sub Aktivitas',
                        store:jun.rztMtSubAktivitas,
                        hiddenName:'mt_sub_aktivitas_id',
                        hiddenValue:'mt_sub_aktivitas_id',
                        valueField:'id',
                        forceSelection:true,
                        displayField:'nama',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbSubAktivitas',
                        lastQuery:''
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'Keterangan',
                        hideLabel:false,
                        //hidden:true,
                        name:'note',
                        id:'noteid',
                        ref:'../note',
                        //allowBlank: ,
                        anchor:'100%'
                    },
                    {
                        xtype:'numericfield',
                        fieldLabel:'Jumlah',
                        hideLabel:false,
                        //hidden:true,
                        name:'amount',
                        id:'amountid',
                        ref:'../amount',
                        maxLength:30,
                        //allowBlank: 1,
                        anchor:'100%'
                    },
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
        jun.rztMtBankAccounts.reload();
        jun.rztMtSuppliers.reload();
        jun.rztMtAktivitasGrup.reload();
        jun.rztMtSubAktivitas.reload();
        jun.MtAktivitasGrupTransWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbBank.on('focus', this.onLoadBank, this);
        this.cmbSupplier.on('focus', this.onFocusSupplier, this);
        this.cmbAnak.on('focus', this.onFocusAnak, this);
        this.cmbSubAktivitas.on('focus', this.onFocusAktivitas, this);
        this.on('close', this.onWinClose, this);
    },
    btnDisabled:function (status) {
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    onFocusAnak:function () {
        jun.rztMtAktivitasGrup.FilterData();
    },
    onFocusAktivitas:function () {
        jun.rztMtSubAktivitas.FilterData();
    },
    onLoadBank:function () {
        jun.rztMtBankAccounts.FilterData();
    },
    onFocusSupplier:function () {
        jun.rztMtSuppliers.FilterData();
    },
    onWinClose:function () {
        jun.rztMtBankAccounts.clearFilter();
        //        jun.rztMtChartMaster.clearFilter();
        jun.rztMtSuppliers.clearFilter();
        jun.rztMtAktivitasGrup.clearFilter();
        jun.rztMtSubAktivitas.clearFilter();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
    },
    saveForm:function () {
        this.btnDisabled(false);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'Mahkotrans/MtAktivitasGrupTrans/update/id/' + this.id;
        } else {
            urlz = 'Mahkotrans/MtAktivitasGrupTrans/create/';
        }
        Ext.getCmp('form-MtAktivitasGrupTrans').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztMtAktivitasGrupTrans.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg + "<br /> Ref. Dokumen : " + response.id,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-MtAktivitasGrupTrans').getForm().reset();
                }
                if (this.closeForm) {
                    this.close();
                }
            },
            failure:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                });
                this.btnDisabled(false);
            }

        });
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
jun.MtAktivitasGrupShowWin = Ext.extend(Ext.Window, {
    title:'Aktivitas Grup Anak',
    modez:1,
    width:600,
    height:250,
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
                id:'form-MtAktivitasGrupShow',
                layout:'absolute',
                ref:'formz',
                border:false,
                anchor:'100% 100%',
                items:[
                    {
                        xtype:'label',
                        text:'Ref. Dokumen : ',
                        x:5,
                        y:5,
                        width:100
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../txtRef',
                        id:'refid',
                        x:100,
                        y:5
                    },
                    {
                        xtype:'label',
                        text:'Tanggal Entry : ',
                        x:240,
                        y:5,
                        width:100,
                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../trans_entry',
                        x:355,
                        y:5
                    },
                    {
                        xtype:'label',
                        text:'No. Bukti : ',
                        x:5,
                        y:25,
                        width:100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../no_bukti',
                        x:100,
                        y:25
                    },
                    {
                        xtype:'label',
                        text:'Tanggal Transaksi : ',
                        x:240,
                        y:25,
                        width:100,
                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../trans_date',
                        x:355,
                        y:25
                    },
                    {
                        xtype:'label',
                        text:'Kas / Bank : ',
                        x:240,
                        y:45,
                        width:100,
                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../kas',
                        x:355,
                        y:45
                    },
                    {
                        xtype:'label',
                        text:'Diterima Oleh : ',
                        x:5,
                        y:45,
                        width:100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../donatur',
                        x:100,
                        y:45
                    },
                    {
                        xtype:'label',
                        text:'Jumlah : ',
                        x:5,
                        y:65,
                        width:100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../amount',
                        x:100,
                        y:65
                    },
                    {
                        xtype:'label',
                        text:'Cara Bayar : ',
                        x:240,
                        y:65,
                        width:100,
                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../trans_via',
                        x:355,
                        y:65
                    },
                    {
                        xtype:'label',
                        text:'Nama Anak : ',
                        x:5,
                        y:85,
                        width:100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../anak',
                        x:100,
                        y:85
                    },
                    {
                        xtype:'label',
                        text:'Sub Aktivitas : ',
                        x:240,
                        y:85,
                        width:100,
                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../sub_aktivitas',
                        x:355,
                        y:85
                    },
                    {
                        xtype:'label',
                        text:'Kode Rekening : ',
                        x:5,
                        y:105,
                        width:100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../codeRek',
                        x:100,
                        y:105
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../codeDesc',
                        x:150,
                        y:105,
                        anchor:'100% 100%',
                        style:'white-space: normal;'
                    },
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Tutup',
                    ref:'../btnCancel'
                }
            ]
        };
        jun.MtAktivitasGrupShowWin.superclass.initComponent.call(this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onbtnCancelclick:function () {
        this.close();
    }

});
jun.MtAktivitasGrupTransVoidWin = Ext.extend(Ext.Window, {
    title:'Void Aktivitas Grup',
    modez:1,
    width:300,
    height:150,
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
                id:'form-MtAktivitasGrupVoid',
                layout:'absolute',
                ref:'formz',
                border:false,
                anchor:'100% 100%',
                items:[
                    {
                        xtype:'label',
                        text:'Alasan Void : ',
                        x:5,
                        y:5,
                        width:100
                    },
                    {
                        xtype:'textarea',
                        fieldLabel:'memo',
                        ref:'../memo',
                        //                        hideLabel:false,
                        id:'memo_id',
                        name:'memo_',
                        x:5,
                        y:25,
                        anchor:'100% 100%',
                    },
                ]
            }
        ];
        this.fbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Proses',
                    ref:'../btnProses'
                },
                {
                    xtype:'button',
                    text:'Batal',
                    ref:'../btnCancel'
                }
            ]

        };
        jun.MtAktivitasGrupTransVoidWin.superclass.initComponent.call(this);
        this.btnProses.on('click', this.onbtnProsesclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    btnDisabled:function (status) {
        this.btnProses.setDisabled(status);
    },
    onbtnProsesclick:function () {
        this.btnDisabled(true);
        var form = Ext.getCmp('form-MtAktivitasGrupVoid').getForm();
        Ext.getCmp('form-MtAktivitasGrupVoid').getForm().submit({
            url:'Mahkotrans/MtAktivitasGrupTrans/delete/',
            params:{
                id:this.id,
            },
            method:'POST',
            scope:this,
            timeOut:1000,
            success:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title:'Aktivitas',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.ERROR
                    });
                    this.btnDisabled(false);
                    return;
                } else {
                    Ext.MessageBox.show({
                        title:'Aktivitas',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    Ext.getCmp('form-MtAktivitasGrupVoid').getForm().reset();
                }
                jun.rztMtAktivitasGrupTrans.reload();
                this.close();
            },
            failure:function (f, a) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
                this.btnDisabled(false);
            }
        });
    },
    onbtnCancelclick:function () {
        this.close();
    }

});