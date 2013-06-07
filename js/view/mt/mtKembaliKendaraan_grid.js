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
            header: 'id_pinjam',
            sortable: true,
            resizable: true,
            dataIndex: 'id_pinjam',
            hidden: true,
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
//        this.bbar = {
//            items: [
//           {
//            xtype: 'paging',
//            store: this.store,
//            displayInfo: true,
//            pageSize: 10
//           }]
//        };

        this.tbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Lihat Pengembalian',
                    ref: '../btnAdd'
                },
//                {
//                    xtype: 'tbseparator',
//                },
//                {
//                    xtype: 'button',
//                    text: 'Ubah',
//                    ref: '../btnEdit'
//                },
//                {
//                    xtype: 'tbseparator',
//                },
//                {
//                    xtype: 'button',
//                    text: 'Hapus',
//                    ref: '../btnDelete'
//                }
            ]
        };
        jun.rztMtKembaliKendaraan.reload();
        jun.MtKembaliKendaraanGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
//        this.btnEdit.on('Click', this.loadEditForm, this);
//        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
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
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id_kembali;
        var form = new jun.MtKembaliKendaraanWin({modez: 1, id: idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
    deleteRec: function() {
        Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
    },
    deleteRecYes: function(btn) {

        if (btn == 'no') {
            return;
        }

        var record = this.sm.getSelected();

        // Check is list selected
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Data");
            return;
        }

        Ext.Ajax.request({
            url: 'Mahkotrans/MtKembaliKendaraan/delete/id/' + record.json.id_kembali,
            method: 'POST',
            success: function(f, a) {
                jun.rztMtKembaliKendaraan.reload();
                var response = Ext.decode(f.responseText);
                Ext.MessageBox.show({
                    title: 'Info',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            },
            failure: function(f, a) {
                var response = Ext.decode(f.responseText);
                Ext.MessageBox.show({
                    title: 'Warning',
                    msg: response.msg,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        });

    }
})
