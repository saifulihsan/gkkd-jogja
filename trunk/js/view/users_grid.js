jun.renderJemaat = function (val, meta, record) {
    var store = jun.rztJemaat;
    var index = store.find('nij', val);
    var record = store.getAt(index);
    return record.data.real_name;
}
jun.UsersGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Manajemen User",
    id:'docs-jun.UsersGrid',
    iconCls: 'silk-grid',
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
            hidden:true
        },
        {
            header:'User Name',
            sortable:true,
            resizable:true,
            dataIndex:'user_id',
            width:100
        },
//        {
//            header:'password',
//            sortable:true,
//            resizable:true,
//            dataIndex:'password',
//            width:100
//        },
        {
            header:'Nama Lengkap',
            sortable:true,
            resizable:true,
            dataIndex:'nij',
            renderer:jun.renderJemaat,
            width:100
        },
        {
            header:'Terakhir Login',
            sortable:true,
            resizable:true,
            dataIndex:'last_visit_date',
            width:100
        },
//        {
//            header:'inactive',
//            sortable:true,
//            resizable:true,
//            dataIndex:'inactive',
//            width:100
//        },

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
                    iconCls: 'asp-user2_add',
                    xtype:'button',
                    text:'Tambah User',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    iconCls: 'asp-access',
                    text:'Reset Password',
                    ref:'../btnEdit'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    iconCls: 'asp-user2_delete',
                    text:'Ubah Security Role',
                    ref:'../btnSecurityRole'
                }
            ]
        };
        jun.rztJemaat.reload();
        jun.rztUsers.reload();
        jun.UsersGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
        this.btnSecurityRole.on('Click', this.deleteRec, this);
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
//        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
//        if (selectedz == "") {
//            Ext.MessageBox.alert("Warning", "Anda belum memilih user");
//            return;
//        }
//        var idz = selectedz.json.id;
        Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin mereset password user ini?', this.deleteRecYes, this);
    },
    deleteRec:function () {
        //Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
        var record = this.sm.getSelected();
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih User");
            return;
        }
        var form = new jun.UbahSecurity({modez: 0});        
        form.show();
        form.formz.getForm().loadRecord(this.record);
    },
    deleteRecYes:function (btn) {
        if (btn == 'no') {
            return;
        }
        var record = this.sm.getSelected();
        // Check is list selected
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih User");
            return;
        }
        Ext.Ajax.request({
//            waitMsg:'Please Wait',
            url:'general/Users/update/id/' + record.json.id,
            //url: 'index.php/api/Users/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (f, a) {
                jun.rztUsers.reload();
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
