jun.MtPinjamKendaraanGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Sewa",
    id: 'docs-jun.MtPinjamKendaraanGrid',
//	width:400,
//	height:250,
    viewConfig: {
        forceFit: true,
    },
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
            width: 100
        },
        {
            header: 'No. Nopol',
            sortable: true,
            resizable: true,
            dataIndex: 'id_mobil',
            width: 100
        },
        {
            header: 'Tanggal Pinjam',
            sortable: true,
            resizable: true,
            dataIndex: 'tgl_pinjam',
            width: 100
        },
//        {
//            header: 'entry_time',
//            sortable: true,
//            resizable: true,
//            dataIndex: 'entry_time',
//            width: 100
//        },
//        {
//            header: 'trans_date',
//            sortable: true,
//            resizable: true,
//            dataIndex: 'trans_date',
//            width: 100
//        },
//        {
//            header: 'tanda_pengenal',
//            sortable: true,
//            resizable: true,
//            dataIndex: 'tanda_pengenal',
//            width: 100
//        },
//        {
//            header: 'no_identitas',
//            sortable: true,
//            resizable: true,
//            dataIndex: 'no_identitas',
//            width: 100
//        },
        /*
         {
         header:'jaminan',
         sortable:true,
         resizable:true,                        
         dataIndex:'jaminan',
         width:100
         },
         {
         header:'jaminan_desc',
         sortable:true,
         resizable:true,                        
         dataIndex:'jaminan_desc',
         width:100
         },
         {
         header:'id_pelanggan',
         sortable:true,
         resizable:true,                        
         dataIndex:'id_pelanggan',
         width:100
         },
         {
         header:'id_kelompok',
         sortable:true,
         resizable:true,                        
         dataIndex:'id_kelompok',
         width:100
         },
         {
         header:'tgl_pinjam',
         sortable:true,
         resizable:true,                        
         dataIndex:'tgl_pinjam',
         width:100
         },
         {
         header:'jam_pinjam',
         sortable:true,
         resizable:true,                        
         dataIndex:'jam_pinjam',
         width:100
         },
         {
         header:'season',
         sortable:true,
         resizable:true,                        
         dataIndex:'season',
         width:100
         },
         {
         header:'sewa_bln',
         sortable:true,
         resizable:true,                        
         dataIndex:'sewa_bln',
         width:100
         },
         {
         header:'sewa_hari',
         sortable:true,
         resizable:true,                        
         dataIndex:'sewa_hari',
         width:100
         },
         {
         header:'sewa_jam',
         sortable:true,
         resizable:true,                        
         dataIndex:'sewa_jam',
         width:100
         },
         {
         header:'driver',
         sortable:true,
         resizable:true,                        
         dataIndex:'driver',
         width:100
         },
         {
         header:'bbm',
         sortable:true,
         resizable:true,                        
         dataIndex:'bbm',
         width:100
         },
         {
         header:'cara_bayar',
         sortable:true,
         resizable:true,                        
         dataIndex:'cara_bayar',
         width:100
         },
         {
         header:'no_bukti_bayar',
         sortable:true,
         resizable:true,                        
         dataIndex:'no_bukti_bayar',
         width:100
         },
         {
         header:'id_driver',
         sortable:true,
         resizable:true,                        
         dataIndex:'id_driver',
         width:100
         },
         {
         header:'id_mobil',
         sortable:true,
         resizable:true,                        
         dataIndex:'id_mobil',
         width:100
         },
         {
         header:'ongkos_sewa',
         sortable:true,
         resizable:true,                        
         dataIndex:'ongkos_sewa',
         width:100
         },
         {
         header:'ongkos_driver',
         sortable:true,
         resizable:true,                        
         dataIndex:'ongkos_driver',
         width:100
         },
         {
         header:'ongkos_bbm',
         sortable:true,
         resizable:true,                        
         dataIndex:'ongkos_bbm',
         width:100
         },
         {
         header:'total_ongkos',
         sortable:true,
         resizable:true,                        
         dataIndex:'total_ongkos',
         width:100
         },
         {
         header:'dp',
         sortable:true,
         resizable:true,                        
         dataIndex:'dp',
         width:100
         },
         {
         header:'sisa_tagihan',
         sortable:true,
         resizable:true,                        
         dataIndex:'sisa_tagihan',
         width:100
         },
         {
         header:'disc',
         sortable:true,
         resizable:true,                        
         dataIndex:'disc',
         width:100
         },
         {
         header:'total',
         sortable:true,
         resizable:true,                        
         dataIndex:'total',
         width:100
         },
         {
         header:'tgl_rencana_kembali',
         sortable:true,
         resizable:true,                        
         dataIndex:'tgl_rencana_kembali',
         width:100
         },
         {
         header:'jam_rencana_kembali',
         sortable:true,
         resizable:true,                        
         dataIndex:'jam_rencana_kembali',
         width:100
         },
         */

    ],
    initComponent: function() {
        this.store = jun.rztMtPinjamKendaraan;
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
                    text: 'Pengembalian',
                    ref: '../btnDelete'
                }
            ]
        };
        jun.rztMtPelanggan.reload();
        jun.rztMtKelompokPelanggan.reload();
        jun.rztMtMobil.reload();
        jun.rztMtDriver.reload();
        jun.rztMtPinjamKendaraan.reload();
        jun.MtPinjamKendaraanGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
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
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
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
    deleteRec: function() {
        var selectedz = this.sm.getSelected();
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id_pinjam;
        var form = new jun.MtPengembalianWin({modez: 1});

        form.show(this);

        form.formz.getForm().loadRecord(this.record);
        var tgl_pinjam = Date.parseDate(this.record.data.tgl_pinjam, 'Y-n-j H:i:s');
        form.tgl_pinjam.setValue(tgl_pinjam);
        var tgl_kembali = Date.parseDate(this.record.data.tgl_rencana_kembali, 'Y-n-j H:i:s');
        form.rencana_tanggal_kembali.setValue(tgl_kembali);
        var record = jun.getMobil(this.record.data.id_mobil);
        form.jenis_mobil.setValue(record.data.jenis);
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
            url: 'Mahkotrans/MtPinjamKendaraan/delete/id/' + record.json.id_pinjam,
            method: 'POST',
            success: function(f, a) {
                jun.rztMtPinjamKendaraan.reload();
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
