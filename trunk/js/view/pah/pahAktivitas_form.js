jun.PahAktivitasWin = Ext.extend(Ext.Window, {
    title:'Aktivitas',
    modez:1,
    width:400,
    height:350,
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
                id:'form-PahAktivitas',
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
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Pemasok',
                        store:jun.rztPahSuppliers,
                        hiddenName:'pah_suppliers_supplier_id',
                        hiddenValue:'pah_suppliers_supplier_id',
                        valueField:'supplier_id',
                        //displayField: 'PahSuppliers::model()->representingColumn()',
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
                        fieldLabel:'Kode Rekening',
                        store:jun.rztPahChartMaster,
                        hiddenName:'pah_chart_master_account_code',
                        hiddenValue:'pah_chart_master_account_code',
                        valueField:'account_code',
                        tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        matchFieldWidth:false,
                        itemSelector:'div.search-item',
                        editable:true,
                        listWidth:300,
                        displayField:'account_code',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbKode',
                        lastQuery:''
                    },
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Kas/Bank',
                        store:jun.rztPahBankAccounts,
                        hiddenName:'pah_bank_accounts_id',
                        hiddenValue:'pah_bank_accounts_id',
                        valueField:'id',
                        //displayField: 'PahBankAccounts::model()->representingColumn()',
                        displayField:'bank_account_name',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbBank',
                        lastQuery:''
                    },
                    new jun.comboPayment({
                        fieldLabel:'Cara Bayar',
                        value:'Tunai',
                        anchor:'100%'
                    }),
                    {
                        xtype:'combo',
                        typeAhead:true,
                        triggerAction:'all',
                        lazyRender:true,
                        mode:'local',
                        fieldLabel:'Anak',
                        store:jun.rztPahMemberbyName,
                        hiddenName:'pah_member_id',
                        hiddenValue:'pah_member_id',
                        valueField:'id',
                        //displayField: 'PahMember::model()->representingColumn()',
                        displayField:'real_name',
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
                        store:jun.rztPahSubAktivitas,
                        hiddenName:'pah_sub_aktivitas_id',
                        hiddenValue:'pah_sub_aktivitas_id',
                        valueField:'id',
                        //displayField: 'PahSubAktivitas::model()->representingColumn()',
                        displayField:'nama',
                        //allowBlank:false,
                        anchor:'100%',
                        ref:'../cmbSubAktivitas',
                        lastQuery:''
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
        jun.rztPahBankAccounts.reload();
        jun.rztPahSuppliers.reload();
        jun.rztPahMemberbyName.reload();
        jun.rztPahSubAktivitas.reload();
        jun.rztPahChartMaster.reload();
        jun.PahAktivitasWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.cmbBank.on('focus', this.onLoadBank, this);
        this.cmbKode.on('focus', this.onLoadChartMaster, this);
        this.cmbSupplier.on('focus', this.onFocusSupplier, this);
        this.cmbAnak.on('focus', this.onFocusAnak, this);
        this.cmbAktivitas.on('focus', this.onFocusAktivitas, this);
        this.on('close', this.onWinClose, this);
    },
    onFocusAnak:function () {
        jun.rztPahMemberbyName.FilterData();
    },
    onFocusAktivitas:function () {
        jun.rztPahSubAktivitas.FilterData();
    },
    onLoadBank:function () {
        jun.rztPahBankAccounts.FilterData();
    },
    onLoadChartMaster:function () {
        jun.rztPahChartMaster.FilterData();
    },
    onFocusSupplier:function () {
        jun.rztPahSuppliers.FilterData();
    },
    onWinClose:function () {
        jun.rztPahBankAccounts.clearFilter();
        jun.rztPahChartMaster.clearFilter();
        jun.rztPahSuppliers.clearFilter();
        jun.rztPahMemberbyName.clearFilter();
        jun.rztPahSubAktivitas.clearFilter();
    },
    onActivate:function () {
        this.btnSave.hidden = false;
        jun.rztPahMemberbyName.reload();
    },
    saveForm:function () {
        var urlz;
        if (this.modez == 1 || this.modez == 2) {
            urlz = 'PondokHarapan/PahAktivitas/update/id/' + this.id;
        } else {
            urlz = 'PondokHarapan/PahAktivitas/create/';
        }
        Ext.getCmp('form-PahAktivitas').getForm().submit({
            url:urlz,
            timeOut:1000,
            scope:this,
            success:function (f, a) {
                jun.rztPahAktivitas.reload();
                var response = Ext.decode(a.response.responseText);
                if (this.closeForm) {
                    this.close();
                } else {
                    if (response.data != undefined) {
                        Ext.MessageBox.alert("Pelayanan", response.data.msg);
                    }
                    if (this.modez == 0) {
                        Ext.getCmp('form-PahAktivitas').getForm().reset();
                    }
                }
            },
            failure:function (f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
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
jun.PahAktivitasShowWin = Ext.extend(Ext.Window, {
    title:'Aktivitas Anak',
    modez:1,
    width:500,
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
                id:'form-PahAktivitasShow',
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
        jun.PahAktivitasShowWin.superclass.initComponent.call(this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onbtnCancelclick:function () {
        this.close();
    }

});
jun.PahAktivitasVoidWin = Ext.extend(Ext.Window, {
    title:'Void Aktivitas',
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
                id:'form-PahAktivitasVoid',
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
        jun.PahAktivitasVoidWin.superclass.initComponent.call(this);
        this.btnProses.on('click', this.onbtnProsesclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onbtnProsesclick:function () {
        var form = Ext.getCmp('form-PahAktivitasVoid').getForm();
        Ext.getCmp('form-PahAktivitasVoid').getForm().submit({
            url:'PondokHarapan/PahAktivitas/delete/',
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
                    return;
                } else {
                    Ext.MessageBox.show({
                        title:'Aktivitas',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    Ext.getCmp('form-PahAktivitasVoid').getForm().reset();
                }
                jun.rztPahAktivitas.reload();
                this.close();
            },
            failure:function (f, a) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    },
    onbtnCancelclick:function () {
        this.close();
    }

});