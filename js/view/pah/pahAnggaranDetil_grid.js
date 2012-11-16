jun.PahAnggaranDetilGrid = Ext.extend(Ext.grid.GridPanel, {
    title:"PahAnggaranDetil",
    id:'docs-jun.PahAnggaranDetilGrid',
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
            header:'Kode Rekening',
            sortable:true,
            resizable:true,
            dataIndex:'pah_chart_master_account_code',
            width:50
        },
        {
            header:'Nama Rekening',
            sortable:true,
            resizable:true,
            dataIndex:'pah_chart_master_account_code',
            renderer:renderPahChartMaster,
        },
        {
            header:'Jumlah',
            sortable:true,
            resizable:true,
            dataIndex:'amount',
            align:'right',
            renderer:Ext.util.Format.numberRenderer('0,0'),
            width:100
        },
    ],
    initComponent:function () {
        this.store = jun.rztPahAnggaranDetil;
        this.tbar = {
            xtype:'toolbar',
            items:[
                {
                    xtype:'button',
                    iconCls:'asp-pay_add',
                    text:'Tambah Alokasi',
                    ref:'../btnAdd'
                },
//                {
//                    xtype:'tbseparator',
//                },
//                {
//                    xtype:'button',
//                    iconCls:'asp-pay_edit',
//                    text:'Ubah Alokasi',
//                    ref:'../btnEdit'
//                },
                {
                    xtype:'tbseparator',
                },
                {
                    xtype:'button',
                    iconCls:'asp-pay_delete',
                    text:'Hapus Alokasi',
                    ref:'../btnDelete'
                }
            ]
        };
        jun.PahAnggaranDetilGrid.superclass.initComponent.call(this);
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
        var form = new jun.PahAnggaranDetilWin({modez:0});
        form.show();
    },
    loadEditForm:function () {
        var selectedz = this.sm.getSelected();
        //var dodol = this.store.getAt(0);
        if (selectedz == "") {
            Ext.MessageBox.alert("Warning", "Anda belum memilih Jenis Pelayanan");
            return;
        }
        var idz = selectedz.data.pah_chart_master_account_code;
        var form = new jun.PahAnggaranDetilWin({modez:1, id:idz});
        form.show(this);
        form.formz.getForm().loadRecord(this.record);
    },
    deleteRec:function () {
        Ext.MessageBox.confirm('Pertanyaan', 'Apakah anda yakin ingin menghapus alokasi ini?', this.deleteRecYes, this);
    },
    deleteRecYes:function (btn) {
        if (btn == 'no') {
            return;
        }
        var record = this.sm.getSelected();
        // Check is list selected
        if (record == "") {
            Ext.MessageBox.alert("Warning", "Anda Belum Memilih alokasi");
            return;
        }
        var index = this.store.find('pah_chart_master_account_code', record.data.pah_chart_master_account_code);
        this.store.removeAt(index);
        this.store.refreshData();
    }
})
