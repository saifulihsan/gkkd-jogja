jun.MtChartMasterGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "Kode Rekening",
    id: 'docs-jun.MtChartMasterGrid',
    iconCls: 'silk-grid',
    viewConfig: {
        forceFit: true,
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'Kode Rekening',
            sortable: true,
            resizable: true,
            dataIndex: 'account_code',
            width: 100
        },
        {
            header: 'Nama Rekening',
            sortable: true,
            resizable: true,
            dataIndex: 'account_name',
            width: 100
        },
        {
            header: 'Kelompok Rekening',
            sortable: true,
            resizable: true,
            dataIndex: 'account_type',
            renderer: jun.renderMtChartType,
        },
        {
            header: 'Deskripsi',
            sortable: true,
            resizable: true,
            dataIndex: 'description',
            width: 400
        },
        {
            header: 'Status',
            dataIndex: 'inactive',
            renderer: jun.renderActive,
        }
    ],
    initComponent: function() {
        jun.rztMtChartTypes.reload();
        this.store = jun.rztMtChartMaster;
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
                    text: 'Tambah Kode Rekening',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Ubah Kode Rekening',
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
        jun.rztMtChartMaster.reload();
        jun.MtChartMasterGrid.superclass.initComponent.call(this);
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
        var form = new jun.MtChartMasterWin({modez: 0});
        form.show();
    },
    loadEditForm: function() {

        var selectedz = this.sm.getSelected();

        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.account_code;
        var form = new jun.MtChartMasterWin({modez: 1, id: idz});
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
            url: 'Mahkotrans/MtChartMaster/delete/id/' + record.json.account_code,
            method: 'POST',
            success: function(f, a) {
                jun.rztMtChartMaster.reload();
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
