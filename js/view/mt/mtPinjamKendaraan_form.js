jun.MtPinjamanWin = Ext.extend(Ext.Window, {
    title: 'Peminjaman Kendaraan',
    modez: 1,
    id: 'mt-win-pinjam',
    width: 900,
    height: 570,
    layout: 'form',
    modal: true,
    padding: 5,
    closeForm: false,
    resizable: false,
    iswin: true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                frame: false,
                bodyStyle: 'background-color: #E4E4E4; padding: 10px',
                id: 'from-MtPinjamanWin',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'absolute',
                ref: 'formz',
                anchor: '100% 100%',
                border: false,
                items: [
                    {
                        xtype: 'label',
                        text: 'No.Pinjam',
                        x: 5,
                        y: 5
                    },
                    {
                        xtype: 'textfield',
                        hideLabel: false,
                        name: 'doc_ref',
                        id: 'doc_refid',
                        readOnly: true,
                        ref: '../doc_ref',
                        x: 100,
                        y: 2,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Nama Konsumen',
                        x: 5,
                        y: 35
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        lastQuery: '',
                        store: jun.rztMtPelanggan,
                        hiddenName: 'id_pelanggan',
                        hiddenValue: 'id_pelanggan',
                        valueField: 'id_pelanggan',
                        displayField: 'nama',
                        x: 100,
                        y: 32,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Tanda Pengenal',
                        x: 5,
                        y: 65

                    },
                    new jun.comboTandaPengenal({
                        allowBlank: false,
                        value: 'KTP',
                        name: 'tanda_pengenal',
                        x: 100,
                        y: 62,
                        height: 20,
                        width: 200,
                    }),
                    {
                        xtype: 'label',
                        text: 'Tanggal Transaksi',
                        x: 540,
                        y: 5
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../trans_date',
                        fieldLabel: 'trans_date',
                        name: 'trans_date',
                        id: 'trans_dateid',
                        format: 'd M Y',
                        allowBlank: false,
                        x: 660,
                        y: 2,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Kelompok Konsumen',
                        x: 540,
                        y: 35
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        store: jun.rztMtKelompokPelanggan,
                        hiddenName: 'id_kelompok',
                        hiddenValue: 'id_kelompok',
                        valueField: 'id_kelompok',
                        displayField: 'nama',
                        ref: '../id_kelompok',
                        lastQuery: '',
                        x: 660,
                        y: 32,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'No Identitas',
                        x: 540,
                        y: 65
                    },
                    {
                        xtype: 'textfield',
                        hideLabel: false,
                        allowBlank: false,
                        name: 'no_identitas',
                        id: 'no_identitasid',
                        ref: '../no_identitas',
                        maxLength: 30,
                        x: 660,
                        y: 62,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Jaminan:',
                        x: 5,
                        y: 95
                    },
                    new jun.cmbJaminan({
                        allowBlank: false,
                        value: 'Kartu Keluarga',
                        name: 'jaminan',
                        x: 100,
                        y: 92,
                        height: 20,
                        width: 200,
                    }),
                    {
                        xtype: 'textarea',
                        name: 'jaminan_desc',
                        id: 'jaminan_descid',
                        ref: '../jaminan_desc',
                        maxLength: 225,
                        allowBlank: false,
                        height: '70',
                        width: '400',
                        x: 100,
                        y: 122

                    },
                    {
                        xtype: 'label',
                        text: 'Season',
                        x: 540,
                        y: 95

                    },
                    new jun.cmbSeason({
                        name: 'season',
                        ref: '../season',
                        allowBlank: false,
                        x: 660,
                        y: 92,
                        height: 20,
                        width: 200,
                    }),
                    {
                        xtype: 'label',
                        text: 'Tanggal Pinjam',
                        x: 5,
                        y: 215
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../tgl_pinjam',
                        name: 'tgl_pinjam',
                        id: 'tgl_pinjamid',
                        format: 'd M Y H:i',
                        submitFormat: 'Y-m-d H:i',
                        allowBlank: false,
                        x: 100,
                        y: 212,
                        height: 20,
                        width: 200,
                    },
//                    {
//                        xtype: 'label',
//                        text: 'Jam',
//                        x: 208,
//                        y: 215
//                    },
//                    {
//                        xtype: 'timefield',
//                        hideLabel: false,
//                        format: 'H:i',
//                        name: 'jam_pinjam',
//                        id: 'jam_pinjamid',
//                        ref: '../jam_pinjam',
//                        maxLength: 15,
//                        allowBlank: false,
//                        x: 250,
//                        y: 212,
//                        height: 20,
//                        width: 80,
//                    }, 
                    {
                        xtype: 'label',
                        text: 'Lama Sewa',
                        x: 340,
                        y: 215
                    },
                    {
                        xtype: 'spinnerfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'sewa_bln',
                        id: 'sewa_blnid',
                        ref: '../sewa_bln',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 12,
                        value: 0,
                        allowBlank: false,
                        x: 410,
                        y: 212,
                        height: 20,
                        width: 50,
                    }, {
                        xtype: 'label',
                        text: '(bulan)',
                        x: 470,
                        y: 215
                    }, {
                        xtype: 'spinnerfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'sewa_hari',
                        id: 'sewa_hariid',
                        ref: '../sewa_hari',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 31,
                        value: 0,
                        allowBlank: false,
                        x: 520,
                        y: 212,
                        height: 20,
                        width: 50,
                    },
                    {
                        xtype: 'label',
                        text: '(hari)',
                        x: 580,
                        y: 215
                    },
                    {
                        xtype: 'spinnerfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'sewa_jam',
                        id: 'sewa_jamid',
                        ref: '../sewa_jam',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 12,
                        value: 0,
                        incrementValue: 12,
                        allowBlank: false,
                        x: 620,
                        y: 212,
                        height: 20,
                        width: 50,
                    },
                    {
                        xtype: 'label',
                        text: '(jam)',
                        x: 680,
                        y: 215
                    },
                    {
                        xtype: 'label',
                        text: 'Rencana Kembali',
                        x: 5,
                        y: 245
                    },
                    {
                        xtype: 'xdatefield',
                        hideLabel: false,
                        format: 'd M Y H:i',
                        submitFormat: 'Y-m-d H:i',
                        name: 'tgl_rencana_kembali',
                        id: 'tgl_rencana_kembali',
                        maxLength: 40,
                        readOnly: true,
                        ref: '../rencana_tanggal_kembali',
                        x: 100,
                        y: 242,
                        height: 20,
                        width: 200,
                    },
//                    {
//                        xtype: 'label',
//                        text: 'Jam',
//                        x: 208,
//                        y: 245
//                    },
//                    {
//                        xtype: 'timefield',
//                        hideLabel: false,
//                        //hidden:true,
//                        name: 'jam_rencana_kembali',
//                        id: 'jam_rencana_kembali',
//                        format: 'H:i',
//                        readOnly: true,
//                        ref: '../jam_kembali',
//                        x: 250,
//                        y: 242,
//                        height: 20,
//                        width: 80,
//                    },
                    {
                        xtype: 'label',
                        text: 'ONGKOS SEWA',
                        x: 5,
                        y: 275
                    },
                    {
                        xtype: 'label',
                        text: 'Nama Driver',
                        x: 5,
                        y: 305
                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        forceSelection: true,
                        lastQuery: '',
                        store: jun.rztMtDriver,
                        hiddenName: 'id_driver',
                        hiddenValue: 'id_driver',
                        valueField: 'id_driver',
                        displayField: 'nama',
                        allowBlank: true,
                        emptyText: 'Non Driver',
                        ref: '../driver',
                        x: 100,
                        y: 302,
                        height: 20,
                        width: 100,
                    },
                    {
                        xtype: 'label',
                        text: 'No Polisi',
                        x: 5,
                        y: 335

                    },
                    {
                        xtype: 'combo',
                        typeAhead: true,
                        triggerAction: 'all',
                        lazyRender: true,
                        mode: 'local',
                        allowBlank: false,
                        forceSelection: true,
                        lastQuery: '',
                        store: jun.rztMtMobil,
                        hiddenName: 'id_mobil',
                        hiddenValue: 'id_mobil',
                        valueField: 'id_mobil',
                        displayField: 'nopol',
                        ref: '../nopol',
                        x: 100,
                        y: 332,
                        height: 20,
                        width: 100,
                    },
                    {
                        xtype: 'label',
                        text: 'Jenis Mobil',
                        x: 210,
                        y: 335
                    },
                    {
                        xtype: 'textfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'nopolisi',
                        id: 'nopolisi',
                        readOnly: true,
                        ref: '../jenis_mobil',
                        x: 280,
                        y: 332,
                        height: 20, width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Cara Bayar',
                        x: 5,
                        y: 365
                    },
                    new jun.comboPayment({
                        fieldLabel: 'Cara Bayar',
                        value: 'Tunai',
                        name: 'trans_via',
                        x: 100,
                        y: 362,
                        height: 20,
                        width: 100,
                    }),
                    {
                        xtype: 'label',
                        text: 'Bukti Transfer',
                        x: 210,
                        y: 365
                    },
                    {
                        xtype: 'textfield',
                        hideLabel: false,
                        name: 'no_bukti_bayar',
                        id: 'no_bukti_bayarid',
                        ref: '../no_bukti_bayar',
                        maxLength: 50,
                        allowBlank: false,
                        x: 290,
                        y: 362,
                        height: 20,
                        width: 150,
                    },
                    {
                        xtype: 'label',
                        text: 'Ongkos Sewa Mobil',
                        x: 540,
                        y: 245
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'ongkos_sewa',
                        id: 'ongkos_sewaid',
                        ref: '../ongkos_sewa',
                        maxLength: 30,
                        readOnly: true,
                        value: 0,
                        x: 660,
                        y: 242,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Driver',
                        x: 540,
                        y: 275
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'ongkos_driver',
                        id: 'ongkos_driverid',
                        ref: '../ongkos_driver',
                        maxLength: 30,
                        value: 0,
                        allowBlank: false,
                        x: 660,
                        y: 272,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Bensin',
                        x: 540,
                        y: 305
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'ongkos_bbm',
                        id: 'ongkos_bbmid',
                        ref: '../ongkos_bbm',
                        maxLength: 30,
                        value: 0,
                        allowBlank: false,
                        x: 660,
                        y: 305,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Total Ongkos Sewa',
                        x: 540,
                        y: 335
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'total_ongkos',
                        id: 'total_ongkosid',
                        ref: '../total_ongkos',
                        maxLength: 30,
                        readOnly: true,
                        value: 0,
                        x: 660,
                        y: 332,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Diskon',
                        x: 540,
                        y: 365
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'disc',
                        id: 'discid',
                        ref: '../disc',
                        maxLength: 30,
                        readOnly: true,
                        value: 0,
                        x: 660,
                        y: 362,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Total All',
                        x: 540,
                        y: 395
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'total',
                        id: 'total',
                        ref: '../total',
                        maxLength: 30,
                        readOnly: true,
                        value: 0,
                        x: 660,
                        y: 392,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'DP',
                        x: 540,
                        y: 425
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        //hidden:true,
                        name: 'dp',
                        id: 'dpid',
                        ref: '../dp',
                        maxLength: 30,
                        value: 0,
                        allowBlank: false,
                        x: 660,
                        y: 422,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Sisa Tagihan',
                        x: 540,
                        y: 455
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        name: 'sisa_tagihan',
                        id: 'sisa_tagihanid',
                        ref: '../sisa_tagihan',
                        readOnly: true,
                        maxLength: 30,
                        value: 0,
                        x: 660,
                        y: 452,
                        height: 20,
                        width: 200,
                    },
                ]
            }
        ];
        this.fbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Simpan',
                    hidden: false,
                    ref: '../btnSave',
                    id: 'save'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose',
                    id: 'saveClose'
                },
                {
                    xtype: 'button',
                    text: 'Tutup',
                    ref: '../btnCancel'
                }
            ]
        };

        jun.MtTranferBankWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.sewa_jam.on('spin', this.onDurationChange, this);
        this.sewa_hari.on('spin', this.onDurationChange, this);
        this.sewa_bln.on('spin', this.onDurationChange, this);
        this.tgl_pinjam.on('select', this.onDurationChange, this);
//        this.jam_pinjam.on('select', this.onDurationChange, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.nopol.on('select', this.onNopolChange, this);
        this.driver.on('change', this.onDriverChange, this);
        this.ongkos_driver.on('change', this.onDriverChange, this);
        this.ongkos_bbm.on('change', this.calculateTotal, this);
        this.dp.on('change', this.calculateTotal, this);
        this.season.on('select', this.calculateTotal, this);
        this.id_kelompok.on('select', this.calculateTotal, this);
//        this.on('close', this.onWinClose, this);

    },
    calculateTotal: function() {
        var id_mobil = this.nopol.getValue();
        var id_kelompok = this.id_kelompok.getValue();
        var sewa_bln = this.sewa_bln.getValue();
        var sewa_hari = this.sewa_hari.getValue();
        var sewa_jam = this.sewa_jam.getValue();
        var season = this.season.getValue();
        if (id_mobil === "" || id_kelompok === "")
            return;
        var mobil = jun.getMobil(id_mobil);
        var kelompok = jun.getKelompokPelanggan(id_kelompok);
        var disk_persen = parseFloat(kelompok.data.discont_persen) * 0.01;
        var tarif_hari = season === 0 ? parseFloat(mobil.data.tarif_24) :
                parseFloat(mobil.data.tarif_high_24);
        var tarif_jam = season === 0 ? parseFloat(mobil.data.tarif_12) :
                parseFloat(mobil.data.tarif_high_12);
        var ong_bln = parseFloat(mobil.data.tarif_bulanan) * parseFloat(sewa_bln);
        var ong_hari = tarif_hari * parseFloat(sewa_hari);
        var ong_jam = tarif_jam * parseFloat(sewa_jam);
        var ong_sewa = ong_bln + ong_hari + ong_jam;
        this.ongkos_sewa.setValue(ong_sewa);
        var ong_driver = parseFloat(this.ongkos_driver.getValue());
        var ong_bbm = parseFloat(this.ongkos_bbm.getValue());
        var total_ong = ong_sewa + ong_driver + ong_bbm;
        this.total_ongkos.setValue(total_ong);
        var ong_disk = total_ong * disk_persen;
        this.disc.setValue(ong_disk);
        var total = total_ong - ong_disk;
        this.total.setValue(total);
        var dp = parseFloat(this.dp.getValue());
        this.sisa_tagihan.setValue(total - dp);
    },
    onDriverChange: function() {
        if (this.driver.getValue() === "") {
            this.ongkos_driver.setValue(0);
        } else {
            var ong = parseFloat(this.ongkos_driver.getValue());
            if (ong < 75000) {
                this.ongkos_driver.setValue(75000);
            }
        }
        this.calculateTotal();
    },
    onNopolChange: function(id_mobil) {
        var record = jun.getMobil(id_mobil.value);
        this.jenis_mobil.setValue(record.data.jenis);
        this.calculateTotal();
    },
    onDurationChange: function() {
        var tgl_pinjam = this.tgl_pinjam.getValue();
//        var time_pinjam = this.jam_pinjam.getValue();
        if (tgl_pinjam === "")// || time_pinjam === "")
            return;
        var sewa_bln = this.sewa_bln.getValue();
        var sewa_hari = this.sewa_hari.getValue();
        var sewa_jam = this.sewa_jam.getValue();
//        var dt = Date.parseDate(tgl_pinjam.format('n/j/Y') + ' ' + time_pinjam, 'n/j/Y H:i');
        var dtCount = tgl_pinjam.add(Date.MONTH, sewa_bln).add(Date.DAY, sewa_hari).add(Date.HOUR, sewa_jam);
        this.rencana_tanggal_kembali.setValue(dtCount);
//        this.jam_kembali.setValue(dtCount.format('H:i'));
        this.calculateTotal();
    },
    btnDisabled: function(status) {
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    onActivate: function() {
        if (this.modez === 0) {
            this.btnSave.show();
        } else {
            this.btnDisabled(true);
        }
    },
    saveForm: function() {
        this.btnDisabled(true);
        var urlz;

        urlz = 'Mahkotrans/MtPinjamKendaraan/create';
        Ext.getCmp('from-MtPinjamanWin').getForm().submit({
            url: urlz,
            /*
             params:{
             tglpeljlo: this.tglpeljlo,
             jenpeljlo: this.jenpeljlo,
             modez: this.modez
             },*/
            timeOut: 1000,
            scope: this,
            success: function(f, a) {
                var response = Ext.decode(a.response.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title: 'Peminjaman Kendaraan',
                        msg: response.msg,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                    this.btnDisabled(false);
                    return;
                } else {
                    Ext.MessageBox.show({
                        title: 'Peminjaman Kendaraan',
                        msg: response.msg + "<br /> Ref. Dokumen : " + response.id,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.INFO
                    });
                    Ext.getCmp('from-MtPinjamanWin').getForm().reset();
                }
                jun.rztMtPinjamKendaraan.reload();
                this.btnDisabled(false);
                this.close();
            },
            failure: function(f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
                this.btnDisabled(false);
            }

        });
    },
    onbtnSaveCloseClick: function() {
        this.closeForm = true;
        this.saveForm(true);
    },
    onbtnSaveclick: function() {
        this.closeForm = false;
        this.saveForm(false);
    },
    onbtnCancelclick: function() {
        Ext.getCmp('from-MtPinjamanWin').getForm().reset();
        this.close();
    }

});