jun.JemaatGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Data Jemaat",
    id:'docs-jun.JemaatGrid',
    iconCls: 'silk-grid',
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'Nomor Induk Jemaat',
            sortable:true,
            resizable:true,
            dataIndex:'nij',
            width:100
        },
        {
            header:'Nama Lengkap',
            sortable:true,
            resizable:true,
            dataIndex:'real_name',
            width:100
        },
        {
            header:'Phone',
            sortable:true,
            resizable:true,
            dataIndex:'phone',
            width:100
        },
        {
            header:'E-Mail',
            sortable:true,
            resizable:true,
            dataIndex:'email',
            width:100
        },
        {
            header:'Alamat',
            sortable:true,
            resizable:true,
            dataIndex:'alamat',
            width:100
        },
        {
            header:'Status',
            sortable:true,
            resizable:true,
            dataIndex:'inactive',
            renderer:jun.renderActive,
            width:100
        },
    ],
    initComponent:function () {
        this.store = jun.rztJemaat;
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
                    iconCls: 'asp-user3_add',
                    text:'Tambah Data',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    iconCls: 'asp-user3_edit',
                    text:'Ubah Data',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    iconCls: 'asp-user3_delete',
                    text:'Hapus Data',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.rztJemaat.reload();
        jun.JemaatGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow:function (sm, idx, r) {
        this.record = r;
        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.JemaatWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.nij;
        var form = new jun.JemaatWin({modez:1, id:idz});
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Jenis Pelayanan");
            return;
        }
        Ext.Ajax.request({
            waitMsg:'Please Wait',
            url:'general/Jemaat/delete/id/' + record.json.nij,
            //url: 'index.php/api/Jemaat/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (response) {
                jun.rztJemaat.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
