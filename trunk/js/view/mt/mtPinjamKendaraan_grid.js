jun.MtPinjamKendaraanGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Sewa",
    id: 'docs-jun.MtPinjamKendaraanGrid',
    iconCls: 'silk-grid',
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'id_pinjam',
            sortable: true,
            resizable: true,
            dataIndex: 'id_pinjam',
            hidden: true,
            width: 100
        },
        {
            header: 'Ref. Dokumen',
            sortable: true,
            resizable: true,
            dataIndex: 'doc_ref',
            width: 100
        },
        {
            header: 'Nama Pelanggan',
            sortable: true,
            resizable: true,
            dataIndex: 'id_pelanggan',
            width: 100,
            renderer: jun.renderMtPelanggan,
        },
        {
            header: 'No. Nopol',
            sortable: true,
            resizable: true,
            dataIndex: 'id_mobil',
            width: 100,
            renderer: jun.renderMtNopol,
        },
        {
            header: 'Tanggal Pinjam',
            sortable: true,
            resizable: true,
            dataIndex: 'tgl_pinjam',
            width: 150
        },
        {
            header: 'Rencana Kembali',
            sortable: true,
            resizable: true,
            dataIndex: 'tgl_rencana_kembali',
            width: 150
        },
        {
            header: 'Kelompok',
            sortable: true,
            resizable: true,
            dataIndex: 'id_kelompok',
            width: 100,
            renderer: jun.renderMtKelompokPelanggan,
        },
        {
            header: 'Total',
            sortable: true,
            resizable: true,
            dataIndex: 'total_ongkos',
            width: 100,
            align: 'right',
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        {
            header: 'DP',
            sortable: true,
            resizable: true,
            dataIndex: 'dp',
            width: 100,
            align: 'right',
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        {
            header: 'Sisa Tagihan',
            sortable: true,
            resizable: true,
            dataIndex: 'sisa_tagihan',
            width: 100,
            align: 'right',
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
    ],
    initComponent: function() {
        jun.rztMtPelanggan.reload();
        jun.rztMtKelompokPelanggan.reload();
        jun.rztMtMobil.reload();
        jun.rztMtDriver.reload();
        jun.rztMtPinjamKendaraan.reload();
        jun.rztMtSysPrefs.reload();
        this.store = jun.rztMtPinjamKendaraan;

        this.tbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Peminjaman',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Lihat Peminjaman',
                    ref: '../btnEdit'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Void Peminjaman',
                    ref: '../btnDelete'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Pengembalian',
                    ref: '../btnKembali'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Refresh',
                    ref: '../btnRefresh'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Print',
                    ref: '../btnPrint'
                }
            ]
        };

        jun.MtPinjamKendaraanGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.btnKembali.on('Click', this.kembaliForm, this);
        this.btnRefresh.on('Click', this.refreshData, this);
        this.btnPrint.on('Click', this.print, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    print: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih data peminjaman!");
            return;
        }
        var idz = selectedz.json.id_pinjam;
        window.open("Mahkotrans/MtPinjamKendaraan/print/id/"+idz, "_blank");
//        var simple = new jun.MtSend({});
//        simple.show();
//        simple.hide();
//        Ext.getCmp('form-Send').getForm().submit({
//            standardSubmit : true,
//            url : 'Mahkotrans/MtPinjamKendaraan/print',
//            params: {
//                id: idz,
//            },
//        });             
    },
    refreshData: function() {
        jun.rztMtPinjamKendaraan.reload();
    },
    getrow: function(sm, idx, r) {
        this.record = r;

        var selectedz = this.sm.getSelections();
    },
    loadForm: function() {
        var form = new jun.MtPinjamanWin({modez: 0});

        form.show();
    },
    loadEditForm: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih data peminjaman!");
            return;
        }
        var idz = selectedz.json.id_pinjam;
        var form = new jun.MtPinjamanWin({modez: 1});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
        var tgl_pinjam = Date.parseDate(this.record.data.tgl_pinjam, 'Y-n-j H:i:s');
        form.tgl_pinjam.setValue(tgl_pinjam);
        var tgl_kembali = Date.parseDate(this.record.data.tgl_rencana_kembali, 'Y-n-j H:i:s');
        form.rencana_tanggal_kembali.setValue(tgl_kembali);
        var record = jun.getMobil(this.record.data.id_mobil);
        form.jenis_mobil.setValue(record.data.jenis);
    },
    kembaliForm: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih mobil yang dipinjam.");
            return;
        }
        if (this.record.data.is_back == '1')
        {
            Ext.MessageBox.alert("Warning", "Kendaraan sudah dikembalikan");
            return;
        }
        var idz = selectedz.json.id_pinjam;
        var form = new jun.MtPengembalianWin({modez: 0});

        form.show(this);

        form.formz.getForm().loadRecord(this.record);
        var tgl_pinjam = Date.parseDate(this.record.data.tgl_pinjam, 'Y-n-j H:i:s');
        form.tgl_pinjam.setValue(tgl_pinjam);
        var tgl_kembali = Date.parseDate(this.record.data.tgl_rencana_kembali, 'Y-n-j H:i:s');
        form.rencana_tanggal_kembali.setValue(tgl_kembali);
        form.trans_date.setValue(new Date());
        var record = jun.getMobil(this.record.data.id_mobil);
        form.jenis_mobil.setValue(record.data.jenis);
        form.no_bukti_bayar.setValue("");
        form.trans_via.setValue("Tunai");
    },
    deleteRec: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih mobil yang dipinjam.");
            return;
        }
        if (this.record.data.is_back == '1')
        {
            Ext.MessageBox.alert("Warning", "Kendaraan sudah dikembalikan");
            return;
        }
        var idz = selectedz.json.id_pinjam;
        var form = new jun.MtPinjamVoidWin({id: idz});
        form.show(this);
    }
})
