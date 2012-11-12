jun.PeGlTransGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"PeGlTrans",
    id:'docs-jun.PeGlTransGrid',
    //	width:400,
    //	height:250,
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'counter',
            sortable:true,
            resizable:true,
            dataIndex:'counter',
            width:100
        },
        {
            header:'type',
            sortable:true,
            resizable:true,
            dataIndex:'type',
            width:100
        },
        {
            header:'type_no',
            sortable:true,
            resizable:true,
            dataIndex:'type_no',
            width:100
        },
        {
            header:'tran_date',
            sortable:true,
            resizable:true,
            dataIndex:'tran_date',
            width:100
        },
        {
            header:'account',
            sortable:true,
            resizable:true,
            dataIndex:'account',
            width:100
        },
        {
            header:'memo_',
            sortable:true,
            resizable:true,
            dataIndex:'memo_',
            width:100
        },
        /*
         {
         header:'amount',
         sortable:true,
         resizable:true,
         dataIndex:'amount',
         width:100
         },
         {
         header:'users_id',
         sortable:true,
         resizable:true,
         dataIndex:'users_id',
         width:100
         },
         */
    ],
    initComponent:function () {
        this.store = jun.rztPeGlTrans;
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
        jun.rztPeGlTrans.reload();
        jun.PeGlTransGrid.superclass.initComponent.call(this);
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
        var form = new jun.PeGlTransWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.counter;
        var form = new jun.PeGlTransWin({modez:1, id:idz});
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Data");
            return;
        }
        Ext.Ajax.request({
            url:'PondokEfata/PeGlTrans/delete/id/' + record.json.counter,
            method:'POST',
            success:function (f, a) {
                jun.rztPeGlTrans.reload();
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
