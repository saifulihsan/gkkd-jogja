jun.MtKembaliKendaraanWin = Ext.extend(Ext.Window, {
    title: 'MtKembaliKendaraan',
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
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'form-MtKembaliKendaraan',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'form',
                ref: 'formz',
                border: false,
                items: [
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'id_pinjam',
                        store: jun.rztMtPinjamKendaraan,
                        hiddenName: 'id_pinjam',
                        hiddenValue: 'id_pinjam',
                        valueField: 'id_pinjam',
                        //displayField: 'MtPinjamKendaraan::model()->representingColumn()',
                        displayField: 'doc_ref',
                        //allowBlank:false,
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
                        xtype: 'xdatefield',
                        ref: '../tgl_kembali',
                        fieldLabel: 'tgl_kembali',
                        name: 'tgl_kembali',
                        id: 'tgl_kembaliid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'jam_kembali',
                        hideLabel: false,
                        //hidden:true,
                        name: 'jam_kembali',
                        id: 'jam_kembaliid',
                        ref: '../jam_kembali',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'extend_bln',
                        hideLabel: false,
                        //hidden:true,
                        name: 'extend_bln',
                        id: 'extend_blnid',
                        ref: '../extend_bln',
                        maxLength: 11,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'extend_hari',
                        hideLabel: false,
                        //hidden:true,
                        name: 'extend_hari',
                        id: 'extend_hariid',
                        ref: '../extend_hari',
                        maxLength: 11,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'extend_jam',
                        hideLabel: false,
                        //hidden:true,
                        name: 'extend_jam',
                        id: 'extend_jamid',
                        ref: '../extend_jam',
                        maxLength: 11,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'overtime_jam',
                        hideLabel: false,
                        //hidden:true,
                        name: 'overtime_jam',
                        id: 'overtime_jamid',
                        ref: '../overtime_jam',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'pelunasan',
                        hideLabel: false,
                        //hidden:true,
                        name: 'pelunasan',
                        id: 'pelunasanid',
                        ref: '../pelunasan',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'ongkos_sewa',
                        hideLabel: false,
                        //hidden:true,
                        name: 'ongkos_sewa',
                        id: 'ongkos_sewaid',
                        ref: '../ongkos_sewa',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'ongkos_driver',
                        hideLabel: false,
                        //hidden:true,
                        name: 'ongkos_driver',
                        id: 'ongkos_driverid',
                        ref: '../ongkos_driver',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'ongkos_bbm',
                        hideLabel: false,
                        //hidden:true,
                        name: 'ongkos_bbm',
                        id: 'ongkos_bbmid',
                        ref: '../ongkos_bbm',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'total_ongkos',
                        hideLabel: false,
                        //hidden:true,
                        name: 'total_ongkos',
                        id: 'total_ongkosid',
                        ref: '../total_ongkos',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'dp',
                        hideLabel: false,
                        //hidden:true,
                        name: 'dp',
                        id: 'dpid',
                        ref: '../dp',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'sisa_tagihan',
                        hideLabel: false,
                        //hidden:true,
                        name: 'sisa_tagihan',
                        id: 'sisa_tagihanid',
                        ref: '../sisa_tagihan',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'disc',
                        hideLabel: false,
                        //hidden:true,
                        name: 'disc',
                        id: 'discid',
                        ref: '../disc',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'total',
                        hideLabel: false,
                        //hidden:true,
                        name: 'total',
                        id: 'totalid',
                        ref: '../total',
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
        jun.MtKembaliKendaraanWin.superclass.initComponent.call(this);
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

            urlz = 'Mahkotrans/MtKembaliKendaraan/update/id/' + this.id;

        } else {

            urlz = 'Mahkotrans/MtKembaliKendaraan/create/';
        }

        Ext.getCmp('form-MtKembaliKendaraan').getForm().submit({
            url: urlz,
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                jun.rztMtKembaliKendaraan.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-MtKembaliKendaraan').getForm().reset();
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