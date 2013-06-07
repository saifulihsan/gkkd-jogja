jun.MtMobilWin = Ext.extend(Ext.Window, {
    title: 'Daftar Mobil',
    iconCls: 'silk13-car',
    modez: 1,
    width: 465,
    height: 525,
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
                id: 'form-MtMobil',
                labelWidth: 200,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'No. Polisi',
                        hideLabel: false,
                        //hidden:true,
                        name: 'nopol',
                        id: 'nopolid',
                        ref: '../nopol',
                        maxLength: 10,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Jenis',
                        hideLabel: false,
                        //hidden:true,
                        name: 'jenis',
                        id: 'jenisid',
                        ref: '../jenis',
                        maxLength: 50,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'spinnerfield',
                        fieldLabel: 'Tahun',
//                        hideLabel: false,
                        //hidden:true,
                        name: 'tahun',
                        id: 'tahunid',
                        ref: '../tahun',
                        maxLength: 4,
                        minValue: 2000,
                        maxValue: 3000,
                        Value: 2013,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif 12 Jam Normal',
                        hideLabel: false,
                        //hidden:true,
                        name: 'tarif_12',
                        id: 'tarif_12id',
                        ref: '../tarif_12',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif 1 Hari Normal',
                        hideLabel: false,
                        //hidden:true,
                        name: 'tarif_24',
                        id: 'tarif_24id',
                        ref: '../tarif_24',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Taris 12 Jam High',
                        hideLabel: false,
                        //hidden:true,
                        name: 'tarif_high_12',
                        id: 'tarif_high_12id',
                        ref: '../tarif_high_12',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif 1 Hari High',
                        hideLabel: false,
                        //hidden:true,
                        name: 'tarif_high_24',
                        id: 'tarif_high_24id',
                        ref: '../tarif_high_24',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif 1 Bulan',
                        hideLabel: false,
                        //hidden:true,
                        name: 'tarif_bulanan',
                        id: 'tarif_bulananid',
                        ref: '../tarif_bulanan',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'spinnerfield',
                        fieldLabel: 'Overtime (Persen)',
                        hideLabel: false,
                        //hidden:true,
                        name: 'overtime',
                        id: 'overtimeid',
                        ref: '../overtime',
                        maxLength: 3,
                        minValue: 0,
                        maxValue: 100,
                        Value: 0,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif Rental Lain 12 Jam Normal',
                        hideLabel: false,
                        //hidden:true,
                        name: 'other_tarif_12',
                        id: 'other_tarif_12id',
                        ref: '../other_tarif_12',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif Rental Lain 1 Hari Normal',
                        hideLabel: false,
                        //hidden:true,
                        name: 'other_tarif_24',
                        id: 'other_tarif_24id',
                        ref: '../other_tarif_24',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Taris Rental Lain 12 Jam High',
                        hideLabel: false,
                        //hidden:true,
                        name: 'other_tarif_high_12',
                        id: 'other_tarif_high_12id',
                        ref: '../other_tarif_high_12',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif Rental Lain 1 Hari High',
                        hideLabel: false,
                        //hidden:true,
                        name: 'other_tarif_high_24',
                        id: 'other_tarif_high_24id',
                        ref: '../other_tarif_high_24',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numericfield',
                        fieldLabel: 'Tarif Rental Lain 1 Bulan',
                        hideLabel: false,
                        //hidden:true,
                        name: 'other_tarif_bulanan',
                        id: 'other_tarif_bulananid',
                        ref: '../other_tarif_bulanan',
                        maxLength: 20,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'spinnerfield',
                        fieldLabel: 'Overtime Rental Lain (Persen)',
                        hideLabel: false,
                        //hidden:true,
                        name: 'other_overtime',
                        id: 'other_overtimeid',
                        ref: '../other_overtime',
                        maxLength: 3,
                        minValue: 0,
                        maxValue: 100,
                        Value: 0,
                        anchor: '100%'
                    },
//                    {
//                        xtype: 'numericfield',
//                        fieldLabel: 'discount_other_rental',
//                        hideLabel: false,
//                        //hidden:true,
//                        name: 'discount_other_rental',
//                        id: 'discount_other_rentalid',
//                        ref: '../discount_other_rental',
//                        maxLength: 30,
//                        //allowBlank: 1,
//                        anchor: '100%'
//                    },
                    new jun.mtStatusMobil({
                        fieldLabel: 'Status Pemilik',
                        hideLabel: false,
                        anchor: '100%',
                        height: 20,
                        name: 'status_pemilik',
                        ref: '../status_pemilik',
                        id: 'status_pemilikid'
                    }),
                    new jun.comboActive({
                        fieldLabel: 'Status',
                        hideLabel: false,
                        anchor: '100%',
                        height: 20,
                        name: 'status',
                        ref: '../cmbActive',
                        id: 'statusid'
                    })
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
        jun.MtMobilWin.superclass.initComponent.call(this);
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

            urlz = 'Mahkotrans/MtMobil/update/id/' + this.id;

        } else {

            urlz = 'Mahkotrans/MtMobil/create/';
        }

        Ext.getCmp('form-MtMobil').getForm().submit({
            url: urlz,
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                jun.rztMtMobil.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-MtMobil').getForm().reset();
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