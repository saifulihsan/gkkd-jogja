jun.PahAnggaranGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Anggaran",
    id:'docs-jun.PahAnggaranGrid',
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
            hidden:true,
            width:100
        },
        {
            header:'Ref. Dokumen',
            sortable:true,
            resizable:true,
            dataIndex:'doc_ref',
        },
        {
            header:'Periode Bulan',
            sortable:true,
            resizable:true,
            dataIndex:'periode_bulan',
            width:100
        },
        {
            header:'Periode Tahun',
            sortable:true,
            resizable:true,
            dataIndex:'periode_tahun',
            width:100
        },
        {
            header:'Tanggal Input',
            sortable:true,
            resizable:true,
            dataIndex:'trans_date',
            width:100
        },
//                                {
//			header:'lock',
//			sortable:true,
//			resizable:true,
//                        dataIndex:'lock',
//			width:100
//		},
    ],
    initComponent:function () {
        this.store = jun.rztPahAnggaran;
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
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    text:'Buat Anggaran',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Ubah Anggaran',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Hapus Anggaran',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.PahAnggaranGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
        jun.rztPahAnggaran.load();
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PahAnggaranWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == undefined) {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Anggaran untuk di ubah.");
            return;
        }
        var idz = selectedz.json.id;
        var form = new jun.PahAnggaranWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
        form.onloadrecordupdate();
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Anggaran");
            return;
        }
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahAnggaran/delete',
            //url:'PondokHarapan/PahAnggaran/delete/id/' + record.json.id,
            //url: 'index.php/api/PahAnggaran/delete/' + record[0].json.nosjp,
            method:'POST',
            params:{
                id_anggaran:record.json.id,
            },
            success:function (response) {
                jun.rztPahAnggaran.reload();
                Ext.Msg.alert('Anggaran', 'Anggaran berhasil dihapus.');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
