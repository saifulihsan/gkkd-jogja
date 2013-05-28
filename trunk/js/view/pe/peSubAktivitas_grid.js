jun.PeSubAktivitasGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Daftar Sub Aktivitas",
    id:'docs-jun.PeSubAktivitasGrid',
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
            dataIndex:'desc_',
            width:100
        },
        {
            header:'Status',
            dataIndex:'inactive',
            renderer:jun.renderActive,
        },
    ],
    initComponent:function () {
        this.store = jun.rztPeSubAktivitas;
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
//                    text:'Hapus',
//                    ref:'../btnDelete'
//                }
            ]
        };
        jun.rztPeSubAktivitas.reload();
        jun.PeSubAktivitasGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
//        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PeSubAktivitasWin({modez:0});
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
        var form = new jun.PeSubAktivitasWin({modez:1, id:idz});
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Data");
            return;
        }
        Ext.Ajax.request({
            url:'PondokEfata/PeSubAktivitas/delete/id/' + record.json.id,
            method:'POST',
            success:function (f, a) {
                jun.rztPeSubAktivitas.reload();
                var response = Ext.decode(f.responseText);
                Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                });
            },
            failure:function (f, a) {
                var response = Ext.decode(f.responseText);
                Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                });
            }
        });
    }
})