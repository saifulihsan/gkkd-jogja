jun.MtKasKeluarGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"MtKasKeluar",
        id:'docs-jun.MtKasKeluarGrid',
//	width:400,
//	height:250,
    viewConfig:{
        forceFit:true,
    },
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'kas_keluar_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'kas_keluar_id',
			width:100
		},
                                {
			header:'doc_ref',
			sortable:true,
			resizable:true,                        
            dataIndex:'doc_ref',
			width:100
		},
                                {
			header:'no_bukti',
			sortable:true,
			resizable:true,                        
            dataIndex:'no_bukti',
			width:100
		},
                                {
			header:'amount',
			sortable:true,
			resizable:true,                        
            dataIndex:'amount',
			width:100
		},
                                {
			header:'entry_time',
			sortable:true,
			resizable:true,                        
            dataIndex:'entry_time',
			width:100
		},
                                {
			header:'trans_date',
			sortable:true,
			resizable:true,                        
            dataIndex:'trans_date',
			width:100
		},
                		/*
                {
			header:'trans_via',
			sortable:true,
			resizable:true,                        
            dataIndex:'trans_via',
			width:100
		},
                                {
			header:'mt_account_code',
			sortable:true,
			resizable:true,                        
            dataIndex:'mt_account_code',
			width:100
		},
                                {
			header:'mt_bank_accounts_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'mt_bank_accounts_id',
			width:100
		},
                                {
			header:'users_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'users_id',
			width:100
		},
                                {
			header:'note',
			sortable:true,
			resizable:true,                        
            dataIndex:'note',
			width:100
		},
                                {
			header:'id_mobil',
			sortable:true,
			resizable:true,                        
            dataIndex:'id_mobil',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztMtKasKeluar;
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
        jun.rztMtKasKeluar.reload();
		jun.MtKasKeluarGrid.superclass.initComponent.call(this);
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
            var form = new jun.MtKasKeluarWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.kas_keluar_id;
            var form = new jun.MtKasKeluarWin({modez:1, id:idz});
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
                url: 'Mahkotrans/MtKasKeluar/delete/id/' + record.json.kas_keluar_id,
                method: 'POST',
                success:function (f, a) {
                    jun.rztMtKasKeluar.reload();
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
