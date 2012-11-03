jun.PahKasMasukWin = Ext.extend(Ext.Window, {
    title:'Kas Masuk',
    modez:1,
    width:350,
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
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahKasMasuk',
                labelWidth:120,
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
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Donatur',
                        store:jun.rztPahDonatur,
                        hiddenName:'pah_donatur_id',
                        hiddenValue:'pah_donatur_id',
                        valueField:'id',
                        displayField:'name',
                        forceSelection:true,
                        anchor:'100%',
                        ref:'../cmbDonatur',
                        editable:false,
                        lastQuery:''
                    },
                    {
                        xtype:'combo',
                        //                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kas/Bank',
                        store:jun.rztPahBankAccounts,
                        hiddenName:'pah_bank_accounts_id',
                        hiddenValue:'pah_bank_accounts_id',
                        valueField:'id',
                        forceSelection:true,
                        displayField:'bank_account_name',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbBank',
                        lastQuery:'',
                        editable:false,
                    },
                    new jun.comboPayment({
                        fieldLabel:'Cara Bayar',
                        value:'Tunai',
                        anchor:'100%',
                        name:'trans_via'
                    }),

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
        jun.rztPahDonatur.reload();
        jun.rztPahBankAccounts.reload();
        //        jun.rztPahChartMaster.reload();
        jun.PahKasMasukWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.on('close', this.onWinClose, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbBank.on('focus', this.onLoadBank, this);
        //        this.cmbkode.on('focus', this.onLoadChartMaster, this);
        this.cmbDonatur.on('focus', this.onFocusDonatur, this);
    },
    btnDisabled:function(status){
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },

    onFocusDonatur:function () {
        jun.rztPahDonatur.FilterData();
    },
    onLoadBank:function () {
        jun.rztPahBankAccounts.FilterData();
    },
    //    onLoadChartMaster:function () {
    //        jun.rztPahChartMaster.FilterData();
    //    },
    onWinClose:function () {
        jun.rztPahBankAccounts.clearFilter();
        //        jun.rztPahChartMaster.clearFilter();
        jun.rztPahDonatur.clearFilter();
    },
    onActivate:function () {
        this.onLoadBank();
        //        this.onLoadChartMaster();
    },
    saveForm:function () {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokHarapan/PahKasMasuk/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahKasMasuk/create/';
        }
        Ext.getCmp('form-PahKasMasuk').getForm().submit({
            url:urlz,

            timeOut:1000,
            scope:this,
            success:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Kas Masuk',
                    msg:response.msg + "<br /> Ref. Dokumen : " + response.id,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                Ext.getCmp('form-PahKasMasuk').getForm().reset();
                jun.rztPahKasMasuk.reload();
                this.close();
            },
            failure:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Kas Masuk',
                    msg:response.msg['xdebug_message'],
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.ERROR
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
jun.PahKasMasukShowWin = Ext.extend(Ext.Window, {
    title:'Penerimaan Kas',
    modez:1,
    width:500,
    height:230,
    layout:'form',
    modal:true,
    padding:5,
    closeForm:false,
    initComponent:function () {
        this.items = [
            {
                xtype:'form',
                frame:false,
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahKasMasukShow',
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
                        text:'Diterima Dari : ',
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
                        text:'Kode Rekening : ',
                        x:5,
                        y:85,
                        width:100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../codeRek',
                        x:100,
                        y:85
                    },
                    {
                        xtype:'label',
                        text:'',
                        ref:'../codeDesc',
                        x:150,
                        y:85,
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
        jun.PahKasMasukShowWin.superclass.initComponent.call(this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onbtnCancelclick:function () {
        this.close();
    }

});
jun.PahKasMasukVoidWin = Ext.extend(Ext.Window, {
    title:'Void Kas Masuk',
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
                bodyStyle:'background-color: #DFE8F6; padding: 10px',
                id:'form-PahKasMasukVoid',
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
        jun.PahKasMasukVoidWin.superclass.initComponent.call(this);
        this.btnProses.on('click', this.onbtnProsesclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    btnDisabled:function(status){
        this.btnProses.setDisabled(status);
    },
    onbtnProsesclick:function () {
        this.btnDisabled(true);
        var form = Ext.getCmp('form-PahKasMasukVoid').getForm();
        Ext.getCmp('form-PahKasMasukVoid').getForm().submit({
            url:'PondokHarapan/PahKasMasuk/delete/',
            params:{
                id:this.id,
            },
            method:'POST',
            scope:this,
            timeOut:1000,
            success:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Kas Masuk',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
                Ext.getCmp('form-PahKasMasukVoid').getForm().reset();
                jun.rztPahKasMasuk.reload();
                this.close();
            },
            failure:function (f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title:'Kas Masuk',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.ERROR
                });
                this.btnDisabled(false);
                //                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    },
    onbtnCancelclick:function () {
        this.close();
    }

});