jun.CustomersGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Customers",
        id:'docs-jun.CustomersGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'cust_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'cust_id',
			width:100
		},
                                {
			header:'br_name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'br_name',
			width:100
		},
                                {
			header:'branch_ref',
			sortable:true,
			resizable:true,                        
                        dataIndex:'branch_ref',
			width:100
		},
                                {
			header:'br_address',
			sortable:true,
			resizable:true,                        
                        dataIndex:'br_address',
			width:100
		},
                                {
			header:'area',
			sortable:true,
			resizable:true,                        
                        dataIndex:'area',
			width:100
		},
                                {
			header:'salesman',
			sortable:true,
			resizable:true,                        
                        dataIndex:'salesman',
			width:100
		},
                		/*
                {
			header:'contact_name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'contact_name',
			width:100
		},
                                {
			header:'default_location',
			sortable:true,
			resizable:true,                        
                        dataIndex:'default_location',
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
			header:'sales_account',
			sortable:true,
			resizable:true,                        
                        dataIndex:'sales_account',
			width:100
		},
                                {
			header:'sales_discount_account',
			sortable:true,
			resizable:true,                        
                        dataIndex:'sales_discount_account',
			width:100
		},
                                {
			header:'receivables_account',
			sortable:true,
			resizable:true,                        
                        dataIndex:'receivables_account',
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
			header:'default_ship_via',
			sortable:true,
			resizable:true,                        
                        dataIndex:'default_ship_via',
			width:100
		},
                                {
			header:'disable_trans',
			sortable:true,
			resizable:true,                        
                        dataIndex:'disable_trans',
			width:100
		},
                                {
			header:'br_post_address',
			sortable:true,
			resizable:true,                        
                        dataIndex:'br_post_address',
			width:100
		},
                                {
			header:'group_no',
			sortable:true,
			resizable:true,                        
                        dataIndex:'group_no',
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
	this.store = jun.rztCustomers;
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
		jun.CustomersGrid.superclass.initComponent.call(this);
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
            var form = new jun.CustomersWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.cust_id;
            var form = new jun.CustomersWin({modez:1, id:idz});
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
                url: 'Wanted/Customers/delete/id/' + record.json.cust_id,
                //url: 'api/Customers/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztCustomers.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
