jun.MtMobilGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Daftar Mobil",
    id: 'docs-jun.MtMobilGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
//        {
//            header: 'id_mobil',
//            sortable: true,
//            resizable: true,
//            dataIndex: 'id_mobil',
//            width: 100
//        },
        {
            header: 'Nopol',
            sortable: true,
            resizable: true,
            dataIndex: 'nopol',
            width: 100
        },
        {
            header: 'Jenis',
            sortable: true,
            resizable: true,
            dataIndex: 'jenis',
            width: 100
        },
        {
            header: 'Tahun',
            sortable: true,
            resizable: true,
            dataIndex: 'tahun',
            width: 100
        },
//        {
//            header: 'tarif_12',
//            sortable: true,
//            resizable: true,
//            dataIndex: 'tarif_12',
//            width: 100
//        },
//        {
//            header: 'tarif_24',
//            sortable: true,
//            resizable: true,
//            dataIndex: 'tarif_24',
//            width: 100
//        },
        /*
         {
         header:'tarif_high_12',
         sortable:true,
         resizable:true,
         dataIndex:'tarif_high_12',
         width:100
         },
         {
         header:'tarif_high_24',
         sortable:true,
         resizable:true,
         dataIndex:'tarif_high_24',
         width:100
         },
         {
         header:'tarif_bulanan',
         sortable:true,
         resizable:true,
         dataIndex:'tarif_bulanan',
         width:100
         },
         {
         header:'overtime',
         sortable:true,
         resizable:true,
         dataIndex:'overtime',
         width:100
         },
         {
         header:'discount_other_rental',
         sortable:true,
         resizable:true,
         dataIndex:'discount_other_rental',
         width:100
         },
         */

    ],
    initComponent: function() {
        this.store = jun.rztMtMobil;
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
                    text: 'Tambah Mobil',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Ubah Mobil',
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
        jun.rztMtMobil.reload();
        jun.MtMobilGrid.superclass.initComponent.call(this);
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
        var form = new jun.MtMobilWin({modez: 0});
        form.show();
    },
    loadEditForm: function() {

        var selectedz = this.sm.getSelected();

        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id_mobil;
        var form = new jun.MtMobilWin({modez: 1, id: idz});
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
            url: 'Mahkotrans/MtMobil/delete/id/' + record.json.id_mobil,
            method: 'POST',
            success: function(f, a) {
                jun.rztMtMobil.reload();
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
