jun.PahSubAktivitasGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Daftar Sub Aktivitas",
    id:'docs-jun.PahSubAktivitasGrid',
    iconCls: 'silk-grid',
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'id',
            sortable:true,
            resizable:true,
            dataIndex:'id',
            width:100,
            hidden:true,
        },
        {
            header:'Kode Rekening',
            sortable:true,
            resizable:true,
            dataIndex:'account_code',
            width:100
        },
        {
            header:'Nama',
            sortable:true,
            resizable:true,
            dataIndex:'nama',
            width:100
        },
        {
            header:'Keterangan',
            sortable:true,
            resizable:true,
            dataIndex:'desc',
            width:100
        },
        {
            header:'Status',
            dataIndex:'inactive',
            renderer:jun.renderActive,
        },
    ],
    initComponent:function () {
        this.store = jun.rztPahSubAktivitas;
        this.bbar = {
            items:[
                {
                    xtype:'paging',
                    store:this.store,
                    displayInfo:true,
                    pageSize:10
                }
            ]
        };
        this.tbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Tambah Sub Aktivitas',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Ubah Sub Aktivitas',
                    ref:'../btnEdit'
                },
//                {
//                    xtype:'tbseparator',
//                },
//                {
//                    xtype:'button',
//                    text:'Hapus Sub Aktivitas',
//                    ref:'../btnDelete'
//                }
            ]
        };
        jun.PahSubAktivitasGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
//        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
        jun.rztPahSubAktivitas.load();
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PahSubAktivitasWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.PahSubAktivitasWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(selectedz);
    },
    deleteRec:function () {
        Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
    },
    deleteRecYes:function (btn) {
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
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahSubAktivitas/delete/id/' + record.json.id,
            //url: 'index.php/api/PahSubAktivitas/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (response) {
                jun.rztPahSubAktivitas.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
