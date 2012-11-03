jun.renderRealName = function (val, meta, record) {
    var store = jun.rztJemaat;
    var index = store.find('nij', val);
    var record = store.getAt(index);
    return record.data.real_name;
}
jun.PahMemberGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Daftar Anak",
    id:'docs-jun.PahMemberGrid',
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
            header:'Nama Anak',
            sortable:true,
            resizable:true,
            dataIndex:'jemaat_nij',
            renderer:jun.renderRealName,
            width:100
        },
        {
            header:'Status',
            dataIndex:'inactive',
            renderer:jun.renderActive,
        },
    ],
    initComponent:function () {
        this.store = jun.rztPahMemberbyName;
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
                    iconCls:'asp-user8_add',
                    text:'Tambah Anak',
                    ref:'../btnAdd'
                },
//                {
//                    xtype:'tbseparator',
//                },
//                {
//                    xtype:'button',
//                    text:'Ubah',
//                    ref:'../btnEdit'
//                },
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
        jun.rztJemaat.reload();
        jun.rztPahMemberbyName.load();
        jun.PahMemberGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
//        this.btnEdit.on('Click', this.loadEditForm, this);
//        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PahMemberWin({modez:0});
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
        var form = new jun.PahMemberWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Anak");
            return;
        }
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahMember/delete/id/' + record.json.id,
            //url: 'index.php/api/PahMember/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (response) {
                jun.rztPahMember.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
