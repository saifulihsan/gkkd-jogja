jun.MtKembaliKendaraanGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Pengembalian Kendaraan",
    id: 'docs-jun.MtKembaliKendaraanGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true,
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'id_kembali',
            sortable: true,
            resizable: true,
            dataIndex: 'id_kembali',
            hidden: true,
            width: 100
        },
        {
            header: 'Ref. Dokumen',
            sortable: true,
            resizable: true,
            dataIndex: 'doc_ref_kembali',
            width: 100
        },
        {
            header: 'Tgl Transaksi',
            sortable: true,
            resizable: true,
            dataIndex: 'trans_date',
            width: 100
        },
        {
            header: 'Waktu Kembali',
            sortable: true,
            resizable: true,
            dataIndex: 'tgl_kembali',
            width: 100
        },
        {
            header: 'Pelunasan',
            sortable: true,
            resizable: true,
            dataIndex: 'pelunasan',
            width: 100,
            align: 'right',
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        {
            header: 'Total',
            sortable: true,
            resizable: true,
            dataIndex: 'total',
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
        this.store = jun.rztMtKembaliKendaraan;
        this.tbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Lihat Pengembalian',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Void Pengembalian',
                    ref: '../btnDelete'
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
        jun.rztMtKembaliKendaraan.reload();
        jun.MtKembaliKendaraanGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnRefresh.on('Click', this.refreshData, this);
        this.btnPrint.on('Click', this.print, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    print: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih data pengembalian!");
            return;
        }
        var idz = selectedz.json.id_kembali;
        window.open("Mahkotrans/MtKembaliKendaraan/print/id/" + idz, "_blank");
    },
    refreshData: function() {
        jun.rztMtKembaliKendaraan.reload();
    },
    getrow: function(sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id_pinjam;
        var form = new jun.MtPengembalianWin({modez: 1});
        form.show(this);
        var pinjam = jun.getMtPinjamKendaraan(this.record.data.id_pinjam);
        form.formz.getForm().loadRecord(pinjam);
        form.formz.getForm().loadRecord(this.record);
        var tgl_pinjam = Date.parseDate(pinjam.data.tgl_pinjam, 'Y-n-j H:i:s');
        form.tgl_pinjam.setValue(tgl_pinjam);
        var tgl_rencana_kembali = Date.parseDate(pinjam.data.tgl_rencana_kembali, 'Y-n-j H:i:s');
        form.rencana_tanggal_kembali.setValue(tgl_rencana_kembali);
        var tgl_kembali = Date.parseDate(this.record.data.tgl_kembali, 'Y-n-j H:i:s');
        form.tgl_kembali.setValue(tgl_kembali);
        var record = jun.getMobil(pinjam.data.id_mobil);
        form.jenis_mobil.setValue(record.data.jenis);
    },
    loadEditForm: function() {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih mobil yang dikembalikan.");
            return;
        }
        var idz = selectedz.json.id_kembali;
        var form = new jun.MtKembaliKendaraanWin({modez: 1, id: idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih mobil yang dikembalikan.");
            return;
        }
        var idz = selectedz.json.id_kembali;
        var form = new jun.MtKembaliVoidWin({id: idz});
        form.show(this);

    }

})
