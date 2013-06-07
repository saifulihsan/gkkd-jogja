jun.MtChartMasterWin = Ext.extend(Ext.Window, {
    title: 'Kode Rekening',
    modez: 1,
    width: 450,
    height: 270,
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
                id: 'form-MtChartMaster',
                labelWidth: 125,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Kode Rekening',
                        hideLabel: false,
                        //hidden:true,
                        name: 'account_code',
                        id: 'account_codeid',
                        ref: '../account_code2',
                        maxLength: 15,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Nama Rekening',
                        hideLabel: false,
                        //hidden:true,
                        name: 'account_name',
                        id: 'account_nameid',
                        ref: '../account_name',
                        maxLength: 60,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'Kelompok Rekening',
                        store: jun.rztMtChartTypes,
                        hiddenName: 'account_type',
                        hiddenValue: 'account_type',
                        valueField: 'id',
                        forceSelection: true,
                        displayField: 'name',
                        //allowBlank:false,
                        anchor: '100%'
                    },
                    new jun.comboActive({
                        fieldLabel: 'Status',
                        hideLabel: false,
                        width: 200,
                        height: 20,
                        name: 'status',
                        ref: '../cmbActive',
                        id: 'statusid'
                    }),
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Deskripsi',
                        hideLabel: false,
                        //hidden:true,
                        name: 'description',
                        id: 'descriptionid',
                        ref: '../description',
                        anchor: '100%'
                                //allowBlank: 1
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
        jun.MtChartMasterWin.superclass.initComponent.call(this);
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

            urlz = 'Mahkotrans/MtChartMaster/update/id/' + this.id;

        } else {

            urlz = 'Mahkotrans/MtChartMaster/create/';
        }

        Ext.getCmp('form-MtChartMaster').getForm().submit({
            url: urlz,
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                jun.rztMtChartMaster.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-MtChartMaster').getForm().reset();
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