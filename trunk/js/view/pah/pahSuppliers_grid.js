jun.PahSuppliersGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Daftar Pemasok",
        id:'docs-jun.PahSuppliersGrid',
//	width:400,
//	height:250,
    viewConfig:{
        forceFit:true,
    },
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'supplier_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'supplier_id',
            hidden:true,
			width:100
		},
                                {
			header:'Nama Pemasok',
			sortable:true,
			resizable:true,                        
            dataIndex:'supp_name',
			width:100
		},
                                {
			header:'Ref. Pemasok',
			sortable:true,
			resizable:true,                        
            dataIndex:'supp_ref',
			width:100
		},
                                {
			header:'Alamat',
			sortable:true,
			resizable:true,                        
            dataIndex:'address',
			width:100
		},
//                                {
//			header:'mail_address',
//			sortable:true,
//			resizable:true,
//            dataIndex:'mail_address',
//			width:100
//		},
//                                {
//			header:'gst_no',
//			sortable:true,
//			resizable:true,
//            dataIndex:'gst_no',
//			width:100
//		},
                		/*
                {
			header:'contact',
			sortable:true,
			resizable:true,                        
            dataIndex:'contact',
			width:100
		},
                                {
			header:'supp_account_no',
			sortable:true,
			resizable:true,                        
            dataIndex:'supp_account_no',
			width:100
		},
                                {
			header:'website',
			sortable:true,
			resizable:true,                        
            dataIndex:'website',
			width:100
		},
                                {
			header:'bank_account',
			sortable:true,
			resizable:true,                        
            dataIndex:'bank_account',
			width:100
		},
                                {
			header:'curr_code',
			sortable:true,
			resizable:true,                        
            dataIndex:'curr_code',
			width:100
		},
                                {
			header:'payment_terms',
			sortable:true,
			resizable:true,                        
            dataIndex:'payment_terms',
			width:100
		},
                                {
			header:'credit_limit',
			sortable:true,
			resizable:true,                        
            dataIndex:'credit_limit',
			width:100
		},
                                {
			header:'purchase_account',
			sortable:true,
			resizable:true,                        
            dataIndex:'purchase_account',
			width:100
		},
                                {
			header:'payable_account',
			sortable:true,
			resizable:true,                        
            dataIndex:'payable_account',
			width:100
		},
                                {
			header:'payment_discount_account',
			sortable:true,
			resizable:true,                        
            dataIndex:'payment_discount_account',
			width:100
		},                */
                                {
			header:'Notes',
			sortable:true,
			resizable:true,                        
            dataIndex:'notes',
			width:100
		},
//                                {
//			header:'inactive',
//			sortable:true,
//			resizable:true,
//            dataIndex:'inactive',
//			width:100
//		},

		
	],
	initComponent: function(){
	this.store = jun.rztPahSuppliers;
        this.bbar = {
            items: [
           {
            xtype: 'paging',
            store: this.store,
            displayInfo: true,
            pageSize: 10
           }]
        };
            
           this.tbar = {
                xtype: 'toolbar',
                items: [
                    {
                        xtype: 'button',
                        text: 'Tambah Pemasok',
                        ref: '../btnAdd'
                    },
                    {
                        xtype:'tbseparator',
                    },
                    {
                        xtype: 'button',
                        text: 'Ubah Pemasok',
                        ref: '../btnEdit'
                    },
                    {
                        xtype:'tbseparator',
                    },
                    {
                        xtype: 'button',
                        text: 'Hapus Pemasok',
                        ref: '../btnDelete'
                    }
                ]
            };
		jun.PahSuppliersGrid.superclass.initComponent.call(this);
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
            var form = new jun.PahSuppliersWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.supplier_id;
            var form = new jun.PahSuppliersWin({modez:1, id:idz});
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
                Ext.MessageBox.alert("Warning","Anda Belum Memilih Jenis Pelayanan");
                return;
            }

            Ext.Ajax.request({
                waitMsg: 'Please Wait',
                url: 'PondokHarapan/PahSuppliers/delete/id/' + record.json.supplier_id,
                //url: 'index.php/api/PahSuppliers/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztPahSuppliers.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
