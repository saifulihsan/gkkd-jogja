jun.MtPelangganGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Pelanggan",
    id: 'docs-jun.MtPelangganGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true,
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'Nama',
            sortable: true,
            resizable: true,
            dataIndex: 'nama',
            width: 100
        },
        {
            header: 'No. Telepon',
            sortable: true,
            resizable: true,
            dataIndex: 'no_tlp',
            width: 100
        },
        {
            header: 'Alamat',
            sortable: true,
            resizable: true,
            dataIndex: 'alamat',
            width: 100
        },
        {
            header: 'status',
            sortable: true,
            resizable: true,
            dataIndex: 'inactive',
            width: 100
        },
    ],
    initComponent: function() {
        this.store = jun.rztMtPelanggan;
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
                    text: 'Tambah Pelanggan',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Ubah Pelanggan',
                    ref: '../btnEdit'
                },
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
        jun.rztMtPelanggan.reload();
        jun.MtPelangganGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
//        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow: function(sm, idx, r) {
        this.record = r;

        var selectedz = this.sm.getSelections();
    },
    loadForm: function() {
        var form = new jun.MtPelangganWin({modez: 0});
        form.show();
    },
    loadEditForm: function() {

        var selectedz = this.sm.getSelected();

        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id_pelanggan;
        var form = new jun.MtPelangganWin({modez: 1, id: idz});
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
            url: 'Mahkotrans/MtPelanggan/delete/id/' + record.json.id_pelanggan,
            method: 'POST',
            success: function(f, a) {
                jun.rztMtPelanggan.reload();
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
