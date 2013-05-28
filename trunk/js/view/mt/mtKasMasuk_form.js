jun.MtKasMasukWin = Ext.extend(Ext.Window, {
    title: 'Kas Masuk',
    iconCls: 'asp-pay',
    modez: 1,
    width: 400,
    height: 340,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtKasMasuk',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date',
                        fieldLabel: 'Tanggal Transaksi',
                        name: 'trans_date',
                        id: 'trans_dateid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
//                    {
//                        xtype: 'textfield',
//                        fieldLabel: 'Ref. Dokumen',
//                        hideLabel: false,
//                        //hidden:true,
//                        name: 'doc_ref',
//                        id: 'doc_refid',
//                        ref: '../doc_ref',
//                        maxLength: 15,
//                        //allowBlank: 1,
//                        anchor: '100%'
//                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'No. Bukti',
                        hideLabel: false,
                        //hidden:true,
                        name: 'no_bukti',
                        id: 'no_buktiid',
                        ref: '../no_bukti',
                        maxLength: 45,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    new jun.comboPayment({
                        fieldLabel: 'Cara Bayar',
                        value: 'Tunai',
                        anchor: '100%',
                        name: 'trans_via'

                    }),
                    {
                        xtype: 'combo',
                        triggerAction: 'all',
                        fieldLabel: 'Dari Akun',
                        typeAhead: true,
                        allowBlank: false,
                        forceSelection: true,
                        mode: 'local',
                        store: jun.rztMtChartMaster,
                        hiddenName: 'account_code',
                        hiddenValue: 'account_code',
                        valueField: 'account_code',
                        matchFieldWidth: false,
                        itemSelector: 'div.search-item',
                        tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        displayField: 'account_code',
                        listWidth: 300,
                        anchor: '100%',
                        lastQuery: ''
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
//                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'Ke Kas/Bank',
                        store: jun.rztMtBankAccounts,
                        hiddenName: 'mt_bank_accounts_id',
                        hiddenValue: 'mt_bank_accounts_id',
                        valueField: 'id',
                        //displayField: 'MtBankAccounts::model()->representingColumn()',
                        displayField: 'bank_account_name',
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'No. Polisi',
                        store: jun.rztMtMobil,
                        hiddenName: 'id_mobil',
                        hiddenValue: 'id_mobil',
                        valueField: 'id_mobil',
                        //displayField: 'MtMobil::model()->representingColumn()',
                        displayField: 'nopol',
                        //allowBlank:false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Keterangan',
                        hideLabel: false,
                        //hidden:true,
                        name: 'note',
                        id: 'noteid',
                        ref: '../note',
                        anchor: '100%'
                                //allowBlank: 1
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Jumlah',
                        hideLabel: false,
                        //hidden:true,
                        name: 'amount',
                        id: 'amountid',
                        ref: '../amount',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                ]
            }];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    hidden: false,
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose'
                },
                {
                    xtype: 'button',
                    text: 'Batal',
                    ref: '../btnCancel'
                }
            ]
        };
        jun.rztMtChartMaster.reload();
        jun.rztMtMobil.reload();
        jun.rztMtBankAccounts.reload();
        jun.MtKasMasukWin.superclass.initComponent.call(this);
//        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        if (this.modez == 1 || this.modez == 2) {
            this.btnSave.setVisible(false);
        } else {
            this.btnSave.setVisible(true);
        }
    },
    btnDisabled: function(status) {
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    saveForm: function()
    {
        this.btnDisabled(true);
        var urlz;
        if (this.modez == 1 || this.modez == 2) {

            urlz = 'Mahkotrans/MtKasMasuk/update/id/' + this.id;

        } else {

            urlz = 'Mahkotrans/MtKasMasuk/create/';
        }

        Ext.getCmp('form-MtKasMasuk').getForm().submit({
            url: urlz,
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                jun.rztMtKasMasuk.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: response.msg + "<br /> Ref. Dokumen : " + response.id,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-MtKasMasuk').getForm().reset();
                    this.btnDisabled(false);
                }
                if (this.closeForm) {
                    this.close();
                }
            },
            failure: function(f, a) {
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title: 'Warning',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
                this.btnDisabled(false);
            }

        });

    },
    onbtnSaveCloseClick: function()
    {
        this.closeForm = true;
        this.saveForm(true);
    },
    onbtnSaveclick: function()
    {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick: function() {
        this.close();
    }

});
jun.MtKasMasukShowWin = Ext.extend(Ext.Window, {
    title: 'Kas Masuk',
    modez: 1,
    width: 520,
    height: 230,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtKasMasukShow',
                layout: 'absolute',
                ref: 'formz',
                border: false,
                anchor: '100% 100%',
                items: [
                    {
                        xtype: 'label',
                        text: 'Ref. Dokumen : ',
                        x: 5,
                        y: 5,
                        width: 100
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../txtRef',
                        id: 'refid',
                        x: 100,
                        y: 5
                    },
                    {
                        xtype: 'label',
                        text: 'Tanggal Entry : ',
                        x: 260,
                        y: 5,
                        width: 100,
                        style: 'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../trans_entry',
                        x: 375,
                        y: 5
                    },
                    {
                        xtype: 'label',
                        text: 'No. Bukti : ',
                        x: 5,
                        y: 25,
                        width: 100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../no_bukti',
                        x: 100,
                        y: 25
                    },
                    {
                        xtype: 'label',
                        text: 'Tanggal Transaksi : ',
                        x: 240,
                        y: 25,
                        width: 120,
                        style: 'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../trans_date',
                        x: 375,
                        y: 25
                    },
                    {
                        xtype: 'label',
                        text: 'Kas / Bank : ',
                        x: 260,
                        y: 45,
                        width: 100,
                        style: 'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../kas',
                        x: 375,
                        y: 45
                    },
                    {
                        xtype: 'label',
                        text: 'Terkait Mobil : ',
                        x: 5,
                        y: 45,
                        width: 100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../mobil',
                        x: 100,
                        y: 45
                    },
                    {
                        xtype: 'label',
                        text: 'Jumlah : ',
                        x: 5,
                        y: 65,
                        width: 100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../amount',
                        x: 100,
                        y: 65
                    },
                    {
                        xtype: 'label',
                        text: 'Cara Bayar : ',
                        x: 260,
                        y: 65,
                        width: 100,
                        style: 'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../trans_via',
                        x: 375,
                        y: 65
                    },
                    {
                        xtype: 'label',
                        text: 'Kode Rekening : ',
                        x: 5,
                        y: 85,
                        width: 100,
                        //                        style:'text-align:right;'
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../codeRek',
                        x: 100,
                        y: 85
                    },
                    {
                        xtype: 'label',
                        text: '',
                        ref: '../codeDesc',
                        x: 150,
                        y: 85,
                        anchor: '100% 100%',
                        style: 'white-space: normal;'
                    },
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Tutup',
                    ref: '../btnCancel'
                }
            ]
        };
        jun.MtKasMasukShowWin.superclass.initComponent.call(this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onbtnCancelclick: function() {
        this.close();
    }

});