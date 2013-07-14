jun.MtSysPrefsWin = Ext.extend(Ext.Window, {
    title: 'Setting',
    modez: 1,
    width: 400,
    height: 145,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    iswin: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtSysPrefs',
                labelWidth: 150,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        triggerAction: 'all',
                        fieldLabel: 'Akun Penjualan',
                        typeAhead: true,
                        allowBlank: false,
                        forceSelection: true,
                        mode: 'local',
                        store: jun.rztMtChartMaster,
                        hiddenName: 'MtSysPrefs[akun_penjualan]',
                        hiddenValue: 'account_code',
                        valueField: 'account_code',
                        matchFieldWidth: false,
                        itemSelector: 'div.search-item',
                        tpl: new Ext.XTemplate('<tpl for="."><div class="search-item">', '<h3><span">{account_code} - {account_name}</span></h3><br />{description}', '</div></tpl>'),
                        displayField: 'account_code',
                        ref: '../akun_penjualan',
                        listWidth: 300,
                        anchor: '100%',
                        lastQuery: ''
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        fieldLabel: 'Kelompok Other Rental',
                        lazyRender: true,
                        mode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        store: jun.rztMtKelompokPelanggan,
                        hiddenName: 'MtSysPrefs[kelompok_other_rental]',
                        hiddenValue: 'id_kelompok',
                        valueField: 'id_kelompok',
                        displayField: 'nama',
                        ref: '../id_kelompok',
                        lastQuery: '',
                        anchor: '100%',
                    },
                ]
            }];
        
        jun.rztMtChartMaster.reload();
        jun.rztMtKelompokPelanggan.reload();
        this.fbar = {
            xtype: 'toolbar',
            items: [
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
        jun.MtSysPrefsWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
    },
    onActivate: function() {
        var akp = jun.getMtSysPrefs('akun_penjualan');
        this.akun_penjualan.setValue(akp.data.value);
        var id_kel = jun.getMtSysPrefs('kelompok_other_rental');
        this.id_kelompok.setValue(id_kel.data.value);
    },
    btnDisabled: function(status) {
        this.btnSaveClose.setDisabled(status);
    },
    saveForm: function()
    {
        this.btnDisabled(true);
        var urlz = 'Mahkotrans/MtSysPrefs/create/';
        Ext.getCmp('form-MtSysPrefs').getForm().submit({
            url: urlz,
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                jun.rztMtSysPrefs.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });

                Ext.getCmp('form-MtSysPrefs').getForm().reset();
                this.btnDisabled(false);
                this.close();
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