jun.UsersGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Users",
    id:'docs-jun.UsersGrid',
//	width:400,
//	height:250,
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
            width:100
        },
        {
            header:'user_id',
            sortable:true,
            resizable:true,
            dataIndex:'user_id',
            width:100
        },
        {
            header:'password',
            sortable:true,
            resizable:true,
            dataIndex:'password',
            width:100
        },
        {
            header:'last_visit_date',
            sortable:true,
            resizable:true,
            dataIndex:'last_visit_date',
            width:100
        },
        {
            header:'inactive',
            sortable:true,
            resizable:true,
            dataIndex:'inactive',
            width:100
        },
        {
            header:'nij',
            sortable:true,
            resizable:true,
            dataIndex:'nij',
            width:100
        },
        /*
         {
         header:'security_roles_id',
         sortable:true,
         resizable:true,
         dataIndex:'security_roles_id',
         width:100
         },
         */
    ],
    initComponent:function () {
        this.store = jun.rztUsers;
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
                    text:'Tambah',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Ubah',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Hapus',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.UsersGrid.superclass.initComponent.call(this);
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
        var form = new jun.UsersWin({modez:0});
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
        var form = new jun.UsersWin({modez:1, id:idz});
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
            url:'general/Users/delete/id/' + record.json.id,
            //url: 'index.php/api/Users/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (response) {
                jun.rztUsers.reload();
                Ext.Msg.alert('Pelayanan', 'Delete Berhasil');
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
