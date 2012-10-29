jun.PahAktivitasGrupGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Grup Anak",
    id:'docs-jun.PahAktivitasGrupGrid',
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
            width:100,
            hidden:true,
        },
        {
            header:'Nama Grup',
            sortable:true,
            resizable:true,
            dataIndex:'name',
            width:100
        },
        {
            header:'Keterangan',
            sortable:true,
            resizable:true,
            dataIndex:'notes',

        },
        {
            header:'Status',
            sortable:true,
            resizable:true,
            dataIndex:'inactive',
            renderer:jun.renderActive,
            width:50
        },
    ],
    initComponent:function () {
        this.store = jun.rztPahAktivitasGrup;
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
            ]
        };
        jun.rztPahAktivitasGrup.reload();
        jun.PahAktivitasGrupGrid.superclass.initComponent.call(this);
        this.btnAdd.on('Click', this.loadForm, this);
        this.btnEdit.on('Click', this.loadEditForm, this);
//        this.btnDelete.on('Click', this.deleteRec, this);
        this.getSelectionModel().on('rowselect', this.getrow, this);
    },
    getrow:function (sm, idx, r) {
        this.record = r;
//        var selectedz = this.sm.getSelections();
    },
    loadForm:function () {
        var form = new jun.PahAktivitasGrupWin({modez:0});
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
        var form = new jun.PahAktivitasGrupWin({modez:1, id:idz});
        form.show(this);
//        this.record = this.store.getById(idz);
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
            url:'PondokHarapan/PahAktivitasGrup/delete/id/' + record.json.id,
            method:'POST',
            success:function (f, a) {
                jun.rztPahAktivitasGrup.reload();
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
