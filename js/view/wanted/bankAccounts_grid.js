jun.BankAccountsGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"BankAccounts",
        id:'docs-jun.BankAccountsGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'id',
			width:100
		},
                                {
			header:'account_code',
			sortable:true,
			resizable:true,                        
                        dataIndex:'account_code',
			width:100
		},
                                {
			header:'account_type',
			sortable:true,
			resizable:true,                        
                        dataIndex:'account_type',
			width:100
		},
                                {
			header:'bank_account_name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'bank_account_name',
			width:100
		},
                                {
			header:'bank_account_number',
			sortable:true,
			resizable:true,                        
                        dataIndex:'bank_account_number',
			width:100
		},
                                {
			header:'bank_name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'bank_name',
			width:100
		},
                		/*
                {
			header:'bank_address',
			sortable:true,
			resizable:true,                        
                        dataIndex:'bank_address',
			width:100
		},
                                {
			header:'bank_curr_code',
			sortable:true,
			resizable:true,                        
                        dataIndex:'bank_curr_code',
			width:100
		},
                                {
			header:'dflt_curr_act',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_curr_act',
			width:100
		},
                                {
			header:'last_reconciled_date',
			sortable:true,
			resizable:true,                        
                        dataIndex:'last_reconciled_date',
			width:100
		},
                                {
			header:'ending_reconcile_balance',
			sortable:true,
			resizable:true,                        
                        dataIndex:'ending_reconcile_balance',
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
	this.store = jun.rztBankAccounts;
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
		jun.BankAccountsGrid.superclass.initComponent.call(this);
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
            var form = new jun.BankAccountsWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.id;
            var form = new jun.BankAccountsWin({modez:1, id:idz});
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
                url: 'Wanted/BankAccounts/delete/id/' + record.json.id,
                //url: 'api/BankAccounts/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztBankAccounts.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
