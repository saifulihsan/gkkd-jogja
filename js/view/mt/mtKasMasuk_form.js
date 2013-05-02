jun.MtKasMasukWin = Ext.extend(Ext.Window, {
    title: 'MtKasMasuk',
    modez: 1,
    width: 400,
    height: 300,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #DFE8F6; padding: 10px',
                id: 'form-MtKasMasuk',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'doc_ref',
                        hideLabel: false,
                        //hidden:true,
                        name: 'doc_ref',
                        id: 'doc_refid',
                        ref: '../doc_ref',
                        maxLength: 15,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'no_bukti',
                        hideLabel: false,
                        //hidden:true,
                        name: 'no_bukti',
                        id: 'no_buktiid',
                        ref: '../no_bukti',
                        maxLength: 45,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'amount',
                        hideLabel: false,
                        //hidden:true,
                        name: 'amount',
                        id: 'amountid',
                        ref: '../amount',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../entry_time',
                        fieldLabel: 'entry_time',
                        name: 'entry_time',
                        id: 'entry_timeid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date',
                        fieldLabel: 'trans_date',
                        name: 'trans_date',
                        id: 'trans_dateid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'trans_via',
                        hideLabel: false,
                        //hidden:true,
                        name: 'trans_via',
                        id: 'trans_viaid',
                        ref: '../trans_via',
                        maxLength: 45,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'mt_bank_accounts_id',
                        store: jun.rztMtBankAccounts,
                        hiddenName: 'mt_bank_accounts_id',
                        hiddenValue: 'mt_bank_accounts_id',
                        valueField: 'id',
                        //displayField: 'MtBankAccounts::model()->representingColumn()',
                        displayField: 'bank_account_name',
                        //allowBlank:false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'users_id',
                        store: jun.rztUsers,
                        hiddenName: 'users_id',
                        hiddenValue: 'users_id',
                        valueField: 'id',
                        //displayField: 'Users::model()->representingColumn()',
                        displayField: 'user_id',
                        //allowBlank:false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'note',
                        hideLabel: false,
                        //hidden:true,
                        name: 'note',
                        id: 'noteid',
                        ref: '../note',
                        anchor: '100%'
                                //allowBlank: 1
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'id_mobil',
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
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'account_code',
                        store: jun.rztMtChartMaster,
                        hiddenName: 'account_code',
                        hiddenValue: 'account_code',
                        valueField: 'account_code',
                        //displayField: 'MtChartMaster::model()->representingColumn()',
                        displayField: 'account_code2',
                        //allowBlank:false,
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
        jun.MtKasMasukWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
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
                    msg: response.msg,
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