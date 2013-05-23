jun.MtKembaliKendaraanGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"MtKembaliKendaraan",
        id:'docs-jun.MtKembaliKendaraanGrid',
//	width:400,
//	height:250,
    viewConfig:{
        forceFit:true,
    },
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'id_kembali',
			sortable:true,
			resizable:true,                        
            dataIndex:'id_kembali',
			width:100
		},
                                {
			header:'id_pinjam',
			sortable:true,
			resizable:true,                        
            dataIndex:'id_pinjam',
			width:100
		},
                                {
			header:'trans_date',
			sortable:true,
			resizable:true,                        
            dataIndex:'trans_date',
			width:100
		},
                                {
			header:'tgl_kembali',
			sortable:true,
			resizable:true,                        
            dataIndex:'tgl_kembali',
			width:100
		},
                                {
			header:'jam_kembali',
			sortable:true,
			resizable:true,                        
            dataIndex:'jam_kembali',
			width:100
		},
                                {
			header:'extend_bln',
			sortable:true,
			resizable:true,                        
            dataIndex:'extend_bln',
			width:100
		},
                		/*
                {
			header:'extend_hari',
			sortable:true,
			resizable:true,                        
            dataIndex:'extend_hari',
			width:100
		},
                                {
			header:'extend_jam',
			sortable:true,
			resizable:true,                        
            dataIndex:'extend_jam',
			width:100
		},
                                {
			header:'overtime_jam',
			sortable:true,
			resizable:true,                        
            dataIndex:'overtime_jam',
			width:100
		},
                                {
			header:'pelunasan',
			sortable:true,
			resizable:true,                        
            dataIndex:'pelunasan',
			width:100
		},
                                {
			header:'ongkos_sewa',
			sortable:true,
			resizable:true,                        
            dataIndex:'ongkos_sewa',
			width:100
		},
                                {
			header:'ongkos_driver',
			sortable:true,
			resizable:true,                        
            dataIndex:'ongkos_driver',
			width:100
		},
                                {
			header:'ongkos_bbm',
			sortable:true,
			resizable:true,                        
            dataIndex:'ongkos_bbm',
			width:100
		},
                                {
			header:'total_ongkos',
			sortable:true,
			resizable:true,                        
            dataIndex:'total_ongkos',
			width:100
		},
                                {
			header:'dp',
			sortable:true,
			resizable:true,                        
            dataIndex:'dp',
			width:100
		},
                                {
			header:'sisa_tagihan',
			sortable:true,
			resizable:true,                        
            dataIndex:'sisa_tagihan',
			width:100
		},
                                {
			header:'disc',
			sortable:true,
			resizable:true,                        
            dataIndex:'disc',
			width:100
		},
                                {
			header:'total',
			sortable:true,
			resizable:true,                        
            dataIndex:'total',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztMtKembaliKendaraan;
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
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text: 'Tambah',
                        ref: '../btnAdd'
                    },
                    {
                        xtype:'tbseparator',
                    },
                    {
                        xtype: 'button',
                        text: 'Ubah',
                        ref: '../btnEdit'
                    },
                    {
                        xtype:'tbseparator',
                    },
                    {
                        xtype: 'button',
                        text: 'Hapus',
                        ref: '../btnDelete'
                    }
                ]
            };
        jun.rztMtKembaliKendaraan.reload();
		jun.MtKembaliKendaraanGrid.superclass.initComponent.call(this);
	        this.btnAdd.on('Click', this.loadForm, this);
                this.btnEdit.on('Click', this.loadEditForm, this);
                this.btnDelete.on('Click', this.deleteRec, this);
                this.getSelectionModel().on('rowselect', this.getrow, this);
	},
        
        getrow: function(sm, idx, r){
            this.record = r;

            var selectedz = this.sm.getSelections();
        },
        
        loadForm: function(){
            var form = new jun.MtKembaliKendaraanWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.id_kembali;
            var form = new jun.MtKembaliKendaraanWin({modez:1, id:idz});
            form.show(this);
            form.formz.getForm().loadRecord(this.record);
        },
        
        deleteRec : function(){
            Ext.MessageBox.confirm('Pertanyaan','Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
        },
        
        deleteRecYes : function(btn){

            if (btn == 'no') {
            return;
            }

            var record = this.sm.getSelected();

            // Check is list selected
            if(record == ""){
                Ext.MessageBox.alert("Warning","Anda Belum Memilih Data");
                return;
            }

            Ext.Ajax.request({
                url: 'Mahkotrans/MtKembaliKendaraan/delete/id/' + record.json.id_kembali,
                method: 'POST',
                success:function (f, a) {
                    jun.rztMtKembaliKendaraan.reload();
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
