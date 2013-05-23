jun.PeChartMasterGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Kode Rekening",
    id:'docs-jun.PeChartMasterGrid',
    iconCls:'silk-grid',
    viewConfig:{
        forceFit:true,
    },
    sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
    columns:[
        {
            header:'Kode Rekening',
            sortable:true,
            resizable:true,
            dataIndex:'account_code',
        },
        {
            header:'Nama Rekening',
            sortable:true,
            resizable:true,
            dataIndex:'account_name',
            width:200
        },
        {
            header:'Kelompok Rekening',
            sortable:true,
            resizable:true,
            dataIndex:'account_type',
            renderer:jun.renderPeChartType,
        },
        {
            header:'Deskripsi',
            sortable:true,
            resizable:true,
            dataIndex:'description',
            width:400
        },
        {
            header:'Status',
            dataIndex:'inactive',
            renderer:jun.renderActive,
        }
    ],
    initComponent:function () {
        jun.rztPeChartTypes.reload();
        this.store = jun.rztPeChartMaster;
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
                    text:'Tambah Kode Rekening',
                    ref:'../btnAdd'
                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    text:'Ubah Kode Rekening',
                    ref:'../btnEdit'
                },
                //                {
                //                    xtype:'tbseparator',
                //                },
                //                {
                //                    xtype:'button',
                //                    text:'Hapus Kode Rekening',
                //                    ref:'../btnDelete'
                //                }
            ]
        };
        jun.rztPeChartMaster.reload();
        jun.PeChartMasterGrid.superclass.initComponent.call(this);
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
        var form = new jun.PeChartMasterWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.json.account_code;
        var form = new jun.PeChartMasterWin({modez:1, id:idz});
        form.show(this);
        // this.record = this.store.getById(idz);
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
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih Kode Rekening");
            return;
        }
        Ext.Ajax.request({
            url:'PondokEfata/PeChartMaster/delete/id/' + record.json.account_code,
            method:'POST',
            success:function (f, a) {
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