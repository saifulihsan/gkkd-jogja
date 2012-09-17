jun.SuppliersGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Suppliers",
        id:'docs-jun.SuppliersGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'supplier_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'supplier_id',
			width:100
		},
                                {
			header:'supp_name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'supp_name',
			width:100
		},
                                {
			header:'supp_ref',
			sortable:true,
			resizable:true,                        
                        dataIndex:'supp_ref',
			width:100
		},
                                {
			header:'address',
			sortable:true,
			resizable:true,                        
                        dataIndex:'address',
			width:100
		},
                                {
			header:'supp_address',
			sortable:true,
			resizable:true,                        
                        dataIndex:'supp_address',
			width:100
		},
                                {
			header:'gst_no',
			sortable:true,
			resizable:true,                        
                        dataIndex:'gst_no',
			width:100
		},
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
			header:'tax_included',
			sortable:true,
			resizable:true,                        
                        dataIndex:'tax_included',
			width:100
		},
                                {
			header:'dimension_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dimension_id',
			width:100
		},
                                {
			header:'dimension2_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dimension2_id',
			width:100
		},
                                {
			header:'tax_group_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'tax_group_id',
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
		},
                                {
			header:'notes',
			sortable:true,
			resizable:true,                        
                        dataIndex:'notes',
			width:100
		},
                                {
			header:'inactive',
			sortable:true,
			resizable:true,                        
                        dataIndex:'inactive',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztSuppliers;
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
                        text: 'Add',
                        ref: '../btnAdd'
                    },
                    {
                        xtype: 'button',
                        text: 'Edit',
                        ref: '../btnEdit'
                    },                    
                    {
                        xtype: 'button',
                        text: 'Delete',
                        ref: '../btnDelete'
                    }
                ]
            };
		jun.SuppliersGrid.superclass.initComponent.call(this);
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
            var form = new jun.SuppliersWin({modez:0});
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
            var form = new jun.SuppliersWin({modez:1, id:idz});
            form.show(this);
            form.formz.getForm().loadRecord(this.record);
        },
        
        deleteRec : function(){
            Ext.MessageBox.confirm('Pertanyaan','Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
        },
        
        deleteRecYes : function(){
        
            var record = this.sm.getSelected();

            // Check is list selected
            if(record == ""){
                Ext.MessageBox.alert("Warning","Anda Belum Memilih Jenis Pelayanan");
                return;
            }

            Ext.Ajax.request({
                waitMsg: 'Please Wait',
                url: 'Wanted/Suppliers/delete/id/' + record.json.supplier_id,
                //url: 'index.php/api/Suppliers/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztSuppliers.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
