jun.MtPinjamKendaraanWin = Ext.extend(Ext.Window, {
    title: 'MtPinjamKendaraan',
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
                id: 'form-MtPinjamKendaraan',
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
                        //allowBlank: ,
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
                        fieldLabel: 'tanda_pengenal',
                        hideLabel: false,
                        //hidden:true,
                        name: 'tanda_pengenal',
                        id: 'tanda_pengenalid',
                        ref: '../tanda_pengenal',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'no_identitas',
                        hideLabel: false,
                        //hidden:true,
                        name: 'no_identitas',
                        id: 'no_identitasid',
                        ref: '../no_identitas',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'jaminan',
                        hideLabel: false,
                        //hidden:true,
                        name: 'jaminan',
                        id: 'jaminanid',
                        ref: '../jaminan',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'jaminan_desc',
                        hideLabel: false,
                        //hidden:true,
                        name: 'jaminan_desc',
                        id: 'jaminan_descid',
                        ref: '../jaminan_desc',
                        maxLength: 225,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'id_pelanggan',
                        store: jun.rztMtPelanggan,
                        hiddenName: 'id_pelanggan',
                        hiddenValue: 'id_pelanggan',
                        valueField: 'id_pelanggan',
                        //displayField: 'MtPelanggan::model()->representingColumn()',
                        displayField: 'nama',
                        //allowBlank:false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'id_kelompok',
                        store: jun.rztMtKelompokPelanggan,
                        hiddenName: 'id_kelompok',
                        hiddenValue: 'id_kelompok',
                        valueField: 'id_kelompok',
                        //displayField: 'MtKelompokPelanggan::model()->representingColumn()',
                        displayField: 'id_kelompok',
                        //allowBlank:false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../tgl_pinjam',
                        fieldLabel: 'tgl_pinjam',
                        name: 'tgl_pinjam',
                        id: 'tgl_pinjamid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'jam_pinjam',
                        hideLabel: false,
                        //hidden:true,
                        name: 'jam_pinjam',
                        id: 'jam_pinjamid',
                        ref: '../jam_pinjam',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'season',
                        hideLabel: false,
                        //hidden:true,
                        name: 'season',
                        id: 'seasonid',
                        ref: '../season',
                        maxLength: 4,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'sewa_bln',
                        hideLabel: false,
                        //hidden:true,
                        name: 'sewa_bln',
                        id: 'sewa_blnid',
                        ref: '../sewa_bln',
                        maxLength: 11,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'sewa_hari',
                        hideLabel: false,
                        //hidden:true,
                        name: 'sewa_hari',
                        id: 'sewa_hariid',
                        ref: '../sewa_hari',
                        maxLength: 11,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'sewa_jam',
                        hideLabel: false,
                        //hidden:true,
                        name: 'sewa_jam',
                        id: 'sewa_jamid',
                        ref: '../sewa_jam',
                        maxLength: 11,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'driver',
                        hideLabel: false,
                        //hidden:true,
                        name: 'driver',
                        id: 'driverid',
                        ref: '../driver',
                        maxLength: 1,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'bbm',
                        hideLabel: false,
                        //hidden:true,
                        name: 'bbm',
                        id: 'bbmid',
                        ref: '../bbm',
                        maxLength: 1,
                        //allowBlank: ,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'cara_bayar',
                        hideLabel: false,
                        //hidden:true,
                        name: 'cara_bayar',
                        id: 'cara_bayarid',
                        ref: '../cara_bayar',
                        maxLength: 30,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'no_bukti_bayar',
                        hideLabel: false,
                        //hidden:true,
                        name: 'no_bukti_bayar',
                        id: 'no_bukti_bayarid',
                        ref: '../no_bukti_bayar',
                        maxLength: 50,
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        fieldLabel: 'id_driver',
                        store: jun.rztMtDriver,
                        hiddenName: 'id_driver',
                        hiddenValue: 'id_driver',
                        valueField: 'id_driver',
                        //displayField: 'MtDriver::model()->representingColumn()',
                        displayField: 'nama',
                        //allowBlank:false,
                        anchor: '100%'
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
                    {
                        xtype: 'xdatefield',
                        ref: '../tgl_rencana_kembali',
                        fieldLabel: 'tgl_rencana_kembali',
                        name: 'tgl_rencana_kembali',
                        id: 'tgl_rencana_kembaliid',
                        format: 'd M Y',
                        //allowBlank: 1,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'jam_rencana_kembali',
                        hideLabel: false,
                        //hidden:true,
                        name: 'jam_rencana_kembali',
                        id: 'jam_rencana_kembaliid',
                        ref: '../jam_rencana_kembali',
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
        jun.MtPinjamKendaraanWin.superclass.initComponent.call(this);
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

            urlz = 'Mahkotrans/MtPinjamKendaraan/update/id/' + this.id;

        } else {

            urlz = 'Mahkotrans/MtPinjamKendaraan/create/';
        }

        Ext.getCmp('form-MtPinjamKendaraan').getForm().submit({
            url: urlz,
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                jun.rztMtPinjamKendaraan.reload();
                var response = Ext.decode(a.response.responseText);
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
                if (this.modez == 0) {
                    Ext.getCmp('form-MtPinjamKendaraan').getForm().reset();
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