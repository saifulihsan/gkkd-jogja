jun.CustomersGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Customers",
        id:'docs-jun.CustomersGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'customer_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'customer_id',
			width:100
		},
                                {
			header:'name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'name',
			width:100
		},
                                {
			header:'phone',
			sortable:true,
			resizable:true,                        
                        dataIndex:'phone',
			width:100
		},
                                {
			header:'phone2',
			sortable:true,
			resizable:true,                        
                        dataIndex:'phone2',
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
			header:'email',
			sortable:true,
			resizable:true,                        
                        dataIndex:'email',
			width:100
		},
                		/*
                {
			header:'fax',
			sortable:true,
			resizable:true,                        
                        dataIndex:'fax',
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
            var idz = selectedz.json.customer_id;
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
                url: 'user/Customers/delete/id/' + record.json.customer_id,
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
