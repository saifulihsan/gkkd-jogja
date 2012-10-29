//jun.renderChartType = function (val, meta, record) {
//    var store = jun.rztPahChartTypes;
//    var index = store.find('id', val);
//    var record = store.getAt(index);
//    return record.data.name;
//}
jun.PahChartMasterGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"Kode Rekening",
    id:'docs-jun.PahChartMasterGrid',
    iconCls: 'silk-grid',
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
            renderer:jun.renderChartType,
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
        jun.rztPahChartTypes.reload();
        this.store = jun.rztPahChartMaster;
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
//        jun.rztPahChartTypes.reload();
        jun.rztPahChartMaster.reload();
        jun.PahChartMasterGrid.superclass.initComponent.call(this);
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
        var form = new jun.PahChartMasterWin({modez:0});
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
        var form = new jun.PahChartMasterWin({modez:1, id:idz});
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
            waitMsg:'Please Wait',
            url:'PondokHarapan/PahChartMaster/delete/id/' + record.json.account_code,
            //url: 'index.php/api/PahChartMaster/delete/' + record[0].json.nosjp,
            method:'POST',
            success:function (f, a) {
                var response = Ext.decode(f.responseText);
                if (response.success == false) {
                    Ext.MessageBox.show({
                        title:'Warning',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.WARNING
                    });
                    return;
                } else {
                    Ext.MessageBox.show({
                        title:'Info',
                        msg:response.msg,
                        buttons:Ext.MessageBox.OK,
                        icon:Ext.MessageBox.INFO
                    });
                    jun.rztPahChartMaster.reload();
                }
//                Ext.Msg.alert('Kode Rekening', 'Penghapusan Kode Rekening Berhasil');
                //jun.example.msg('Kode Rekening','Penghapusan Kode Rekening {0} Berhasil',response.id);
            },
            failure:function (response) {
                Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
            }
        });
    }
})
