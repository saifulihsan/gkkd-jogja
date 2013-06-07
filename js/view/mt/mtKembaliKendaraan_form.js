jun.MtPengembalianWin = Ext.extend(Ext.Window, {
    title: 'Pengembalian Kendaraan',
    modez: 1,
    id: 'mt-win-pengembalian',
    width: 900,
    height: 590,
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
                id: 'from-MtPengembalianWin',
                labelWidth: 100,
                labelAlign: 'left',
                layout: 'absolute',
                ref: 'formz',
                anchor: '100% 100%',
                border: false,
                items: [
                    {
                        xtype: 'hidden',
                        name: 'id_pinjam'
                    },
                    {
                        xtype: 'label',
                        text: 'No. Pinjam',
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
                        readOnly: true,
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
                        readOnly: true,
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
                        readOnly: true,
                        x: 660,
                        y: 32,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'No. Identitas',
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
                        readOnly: true,
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
                        readOnly: true,
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
                        readOnly: true,
                        height: '55',
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
                        readOnly: true,
                        x: 660,
                        y: 92,
                        height: 20,
                        width: 200,
                    }),
                    {
                        xtype: 'label',
                        text: 'Tanggal Pinjam',
                        x: 5,
                        y: 185
                    },
                    {
                        xtype: 'xdatefield',
                        ref: '../tgl_pinjam',
                        name: 'tgl_pinjam',
                        id: 'tgl_pinjamid',
                        format: 'd M Y H:i',
                        submitFormat: 'Y-m-d H:i',
                        allowBlank: false,
                        readOnly: true,
                        x: 100,
                        y: 182,
                        height: 20,
                        width: 200,
                    },
//                    {
//                        xtype: 'label',
//                        text: 'Jam Pinjam',
//                        x: 208,
//                        y: 185
//                    },
//                    {
//                        xtype: 'textfield',
//                        hideLabel: false,
//                        //hidden:true,
//                        name: 'jampinjam',
//                        id: 'jampinjam',
//                        maxLength: 15,
//                        //allowBlank: ,
//                        x: 280,
//                        y: 182,
//                        height: 20,
//                        width: 50,
//                    }, 
                    {
                        xtype: 'label',
                        text: 'Lama Sewa',
                        x: 340,
                        y: 185
                    },
                    {
                        xtype: 'spinnerfield',
                        hideLabel: false,
                        name: 'sewa_bln',
                        id: 'sewa_blnid',
                        ref: '../sewa_bln',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 12,
                        value: 0,
                        allowBlank: false,
                        readOnly: true,
                        x: 410,
                        y: 182,
                        height: 20,
                        width: 50,
                    },
                    {
                        xtype: 'label',
                        text: '(bulan)',
                        x: 470,
                        y: 185
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
                        readOnly: true,
                        x: 520,
                        y: 182,
                        height: 20,
                        width: 50,
                    },
                    {
                        xtype: 'label',
                        text: '(hari)',
                        x: 580,
                        y: 185
                    }, {
                        xtype: 'spinnerfield',
                        hideLabel: false,
                        name: 'sewa_jam',
                        id: 'sewa_jamid',
                        ref: '../sewa_jam',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 12,
                        value: 0,
                        incrementValue: 12,
                        allowBlank: false,
                        readOnly: true,
                        x: 620,
                        y: 182,
                        height: 20,
                        width: 50,
                    },
                    {
                        xtype: 'label',
                        text: '(jam)',
                        x: 680,
                        y: 185
                    },
                    {
                        xtype: 'label',
                        text: 'Rencana Kembali',
                        x: 5,
                        y: 215
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
                        y: 212,
                        height: 20,
                        width: 200,
                    },
//                    {
//                        xtype: 'label',
//                        text: 'Jam Kembali',
//                        x: 208,
//                        y: 215
//                    },
//                    {
//                        xtype: 'textfield',
//                        hideLabel: false,
//                        //hidden:true,
//                        name: 'rencanajamkembali',
//                        id: 'rencanajamkembali',
//                        maxLength: 15,
//                        //allowBlank: ,
//                        x: 280,
//                        y: 212,
//                        height: 20,
//                        width: 50,
//                    }, 
                    {
                        xtype: 'label',
                        text: 'Extend',
                        x: 340,
                        y: 215
                    },
                    {
                        xtype: 'spinnerfield',
                        name: 'extend_bln',
                        id: 'extend_blnid',
                        ref: '../extend_bln',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 12,
                        value: 0,
                        allowBlank: false,
                        readOnly: true,
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
                        name: 'extend_hari',
                        id: 'extend_hariid',
                        ref: '../extend_hari',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 31,
                        value: 0,
                        allowBlank: false,
                        readOnly: true,
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
                    }, {
                        xtype: 'spinnerfield',
                        hideLabel: false,
                        name: 'extend_jam',
                        id: 'extend_jamid',
                        ref: '../extend_jam',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 12,
                        value: 0,
                        incrementValue: 12,
                        allowBlank: false,
                        readOnly: true,
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
                        text: 'Tanggal Kembali',
                        x: 5,
                        y: 245
                    },
                    {
                        xtype: 'xdatefield',
                        hideLabel: false,
                        format: 'd M Y H:i',
                        submitFormat: 'Y-m-d H:i',
                        name: 'tgl_kembali',
                        id: 'tgl_kembali',
                        ref: '../tgl_kembali',
                        x: 100,
                        y: 242,
                        height: 20,
                        width: 200,
                    },
//                    {
//                        xtype: 'label',
//                        text: 'Jam Kembali',
//                        x: 208,
//                        y: 245
//                    },
//                    {
//                        xtype: 'textfield',
//                        hideLabel: false,
//                        //hidden:true,
//                        name: 'jam_kembali',
//                        id: 'jam_kembali',
//                        maxLength: 15,
//                        //allowBlank: ,
//                        x: 280,
//                        y: 242,
//                        height: 20,
//                        width: 50,
//                    },
                    {
                        xtype: 'label',
                        text: 'Overtime',
                        x: 340,
                        y: 245
                    }, {
                        xtype: 'spinnerfield',
                        hideLabel: false,
                        name: 'overtime_jam',
                        id: 'overtime_jamid',
                        ref: '../overtime_jam',
                        maxLength: 2,
                        minValue: 0,
                        maxValue: 12,
                        value: 0,
//                        incrementValue: 12,
                        allowBlank: false,
                        readOnly: true,
                        x: 410,
                        y: 242,
                        height: 20,
                        width: 50,
                    },
                    {
                        xtype: 'label',
                        text: '(jam)',
                        x: 470,
                        y: 245
                    },
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
                        readOnly: true,
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
                        readOnly: true,
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
                        height: 20,
                        width: 200,
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
                        ref: '../trans_via',
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
                        text: 'Catatan',
                        x: 5,
                        y: 395

                    },
                    {
                        xtype: 'textarea',
                        name: 'notes',
                        id: 'notesid',
                        ref: '../notes',
                        maxLength: 225,
                        allowBlank: false,
                        height: '110',
                        width: '400',
                        x: 100,
                        y: 392

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
                        text: 'Ongkos Extend',
                        x: 540,
                        y: 275
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        name: 'ongkos_extend',
                        id: 'ongkos_extendid',
                        ref: '../ongkos_extend',
                        readOnly: true,
                        maxLength: 30,
                        value: 0,
                        x: 660,
                        y: 272,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Driver',
                        x: 540,
                        y: 305
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
                        y: 302,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Bensin',
                        x: 540,
                        y: 335
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
                        y: 332,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Total Ongkos Sewa',
                        x: 540,
                        y: 365
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
                        y: 362,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Diskon',
                        x: 540,
                        y: 395
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
                        y: 392,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Total All',
                        x: 540,
                        y: 425
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
                        y: 422,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'DP',
                        x: 540,
                        y: 455
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
                        readOnly: true,
                        x: 660,
                        y: 452,
                        height: 20,
                        width: 200,
                    },
                    {
                        xtype: 'label',
                        text: 'Pelunasan',
                        x: 540,
                        y: 485
                    },
                    {
                        xtype: 'numericfield',
                        hideLabel: false,
                        name: 'pelunasan',
                        id: 'pelunasanid',
                        ref: '../pelunasan',
                        readOnly: true,
                        value: 0,
                        x: 660,
                        y: 482,
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
                    ref: '../btnSave'
                },
                {
                    xtype: 'button',
                    text: 'Simpan & Tutup',
                    ref: '../btnSaveClose'
                },
                {
                    xtype: 'button',
                    text: 'Tutup',
                    ref: '../btnCancel'
                }
            ]
        };
        jun.MtPengembalianWin.superclass.initComponent.call(this);
        this.on('activate', this.onActivate, this);
        this.btnSaveClose.on('click', this.onbtnSaveCloseClick, this);
        this.btnSave.on('click', this.onbtnSaveclick, this);
        this.btnCancel.on('click', this.onbtnCancelclick, this);
        this.tgl_kembali.on('change', this.onDurationChange, this);
    },
    calculateTotal: function() {
        var id_mobil = this.nopol.getValue();
        var id_kelompok = this.id_kelompok.getValue();
        var sewa_bln = this.extend_bln.getValue();
        var sewa_hari = this.extend_hari.getValue();
        var sewa_jam = this.extend_jam.getValue();
        var overtime = this.overtime_jam.getValue();
        var ong_pinjam = parseFloat(this.ongkos_sewa.getValue());
        var season = parseFloat(this.season.getValue());
        if (id_mobil === "" || id_kelompok === "")
            return;
        var mobil = jun.getMobil(id_mobil);
        var kelompok = jun.getKelompokPelanggan(id_kelompok);
        var other_rental = jun.getMtSysPrefs('kelompok_other_rental');
        var is_other = kelompok.data.id_kelompok === other_rental.data.value;
        var disk_persen = is_other ? 0 : parseFloat(kelompok.data.discont_persen) * 0.01;
        var mobil_tarif_12 = is_other ? parseFloat(mobil.data.other_tarif_12) :
                parseFloat(mobil.data.tarif_12);
        var mobil_tarif_12_h = is_other ? parseFloat(mobil.data.other_tarif_high_12) :
                parseFloat(mobil.data.tarif_high_12);
        var mobil_tarif_24 = is_other ? parseFloat(mobil.data.other_tarif_24) :
                parseFloat(mobil.data.tarif_24);
        var mobil_tarif_24_h = is_other ? parseFloat(mobil.data.other_tarif_high_24) :
                parseFloat(mobil.data.tarif_high_24);
        var mobil_tarif_bulan = is_other ? parseFloat(mobil.data.other_tarif_bulanan) :
                parseFloat(mobil.data.tarif_bulanan);
        var mobil_tarif_overtime = is_other ? parseFloat(mobil.data.other_overtime) :
                parseFloat(mobil.data.overtime);
        var over_persen = mobil_tarif_overtime * 0.01;
        var tarif_hari = season === 0 ? mobil_tarif_24 : mobil_tarif_24_h;
        var tarif_jam = season === 0 ? mobil_tarif_12 : mobil_tarif_12_h;
        var ong_bln = mobil_tarif_bulan * parseFloat(sewa_bln);        
        var ong_hari = tarif_hari * parseFloat(sewa_hari);
        var ong_jam = parseFloat(sewa_jam) > 0 ? tarif_jam : 0;
        var ong_over = (tarif_hari * over_persen) * parseFloat(overtime);
        var ong_sewa = ong_bln + ong_hari + ong_jam + ong_over;
        this.ongkos_extend.setValue(ong_sewa);
        var ong_driver = parseFloat(this.ongkos_driver.getValue());
        var ong_bbm = parseFloat(this.ongkos_bbm.getValue());
        var total_ong = ong_sewa + ong_pinjam + ong_driver + ong_bbm;
        this.total_ongkos.setValue(total_ong);
        var ong_disk = total_ong * disk_persen;
        this.disc.setValue(ong_disk);
        var total = total_ong - ong_disk;
        this.total.setValue(total);
        var dp = parseFloat(this.dp.getValue());
        this.pelunasan.setValue(total - dp);
    },
    onDurationChange: function() {
        var tgl_pinjam = this.tgl_pinjam.getValue();
        var tgl_rencana = this.rencana_tanggal_kembali.getValue();
        var tgl_kembali = this.tgl_kembali.getValue();
        if (tgl_kembali === "")
            return;
        if (tgl_kembali.between(tgl_pinjam, tgl_rencana))
        {
            tgl_kembali = tgl_rencana;
        }
        Ext.Ajax.request({
            url: 'Mahkotrans/mtKembaliKendaraan/DateDiff',
            params: {
                tgl_rencana: tgl_rencana.format('Y-m-d H:i:s'),
                tgl_kembali: tgl_kembali.format('Y-m-d H:i:s'),
            },
            method: 'POST',
            scope: this,
            success: function(f, a) {
                var response = Ext.decode(f.responseText);
                if (response.status === true) {
                    var sewa_month = parseInt(response.msg['Months']);
                    var sewa_day = parseInt(response.msg['Days']);
                    var sewa_hour = parseInt(response.msg['Hours']);
                    var hour = 0;
                    var over = 0;

                    if (sewa_hour >= 12) {
                        hour = 12;
                        over = sewa_hour - 12;
                    } else {
                        over = sewa_hour;
                    }

                    Ext.getCmp('extend_blnid').setValue(sewa_month);
                    Ext.getCmp('extend_hariid').setValue(sewa_day);
                    Ext.getCmp('extend_jamid').setValue(hour);
                    Ext.getCmp('overtime_jamid').setValue(over);
                    this.calculateTotal();
                }
            },
            failure: function(f, a) {
                Ext.MessageBox.alert("Error", "Can't Communicate With The Server");
            },
        });
    },
    btnDisabled: function(status) {
        this.btnSave.setDisabled(status);
        this.btnSaveClose.setDisabled(status);
    },
    onActivate: function() {
        if (this.modez === 0) {
            this.btnSave.show();
            this.btnSaveClose.show();
        } else {
            this.btnSave.hide();
            this.btnSaveClose.hide();
        }
    },
    saveForm: function() {
        this.btnDisabled(true);
        var urlz;
        urlz = 'Mahkotrans/MtKembaliKendaraan/create';
        Ext.getCmp('from-MtPengembalianWin').getForm().submit({
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
                    Ext.getCmp('from-MtPengembalianWin').getForm().reset();
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
        this.close();
    }

});