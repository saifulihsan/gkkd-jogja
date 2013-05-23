jun.MtGlTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title: "MtGlTrans",
    id: 'docs-jun.MtGlTransGrid',
    viewConfig: {
        forceFit: true,
    },
    sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
    columns: [
        {
            header: 'counter',
            sortable: false,
            resizable: true,
            dataIndex: 'counter',
            hidden: true,
            width: 20
        },
        {
            header: 'Kode Rekening',
            sortable: false,
            resizable: true,
            dataIndex: 'account',
            width: 100
        },
        {
            header: 'Nama Rekening',
            sortable: false,
            resizable: true,
            dataIndex: 'account',
            width: 250,
            renderer: renderMtChartMaster,
        },
        {
            header: 'Debit',
            sortable: false,
            resizable: true,
            dataIndex: 'debit',
            align: 'right',
            renderer: Ext.util.Format.numberRenderer('0,0'),
            width: 100
        },
        {
            header: 'Kredit',
            sortable: false,
            resizable: true,
            dataIndex: 'kredit',
            align: 'right',
            renderer: Ext.util.Format.numberRenderer('0,0'),
            width: 100
        },
    ],
    initComponent: function() {
        this.store = jun.rztMtGlTrans;
//        this.bbar = {
//            items:[
//                {
//                    xtype:'paging',
//                    store:this.store,
//                    displayInfo:true,
//                    pageSize:10
//                }
//            ]
//        };
        this.tbar = {
            xtype: 'toolbar',
            items: [
                {
                    xtype: 'button',
                    text: 'Tambah Debit',
                    ref: '../btnAdd'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Tambah Kredit',
                    ref: '../btnEdit'
                },
                {
                    xtype: 'tbseparator',
                },
                {
                    xtype: 'button',
                    text: 'Hapus',
                    ref: '../btnDelete'
                }
            ]
        };
        jun.MtGlTransGrid.superclass.initComponent.call(this);
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
        var form = new jun.MtGlTransDetilWin({modez: 0, debit: true, title: "Tambah Debit"});
        form.show();
    },
    loadEditForm: function() {
        var form = new jun.MtGlTransDetilWin({modez: 0, debit: false, title: "Tambah Kredit"});
        form.show();
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Jenis Pelayanan");
            return;
        }
        Ext.Ajax.request({
            waitMsg: 'Please Wait',
            url: 'Mahkotrans/MtGlTrans/delete/id/' + record.json.counter,
            //url: 'index.php/api/MtGlTrans/delete/' + record[0].json.nosjp,
            method: 'POST',
            success: function(response) {
                jun.rztMtGlTrans.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure: function(response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
