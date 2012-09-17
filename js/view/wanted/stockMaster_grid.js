jun.StockMasterGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"StockMaster",
        id:'docs-jun.StockMasterGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'stock_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'stock_id',
			width:100
		},
                                {
			header:'category_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'category_id',
			width:100
		},
                                {
			header:'tax_type_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'tax_type_id',
			width:100
		},
                                {
			header:'description',
			sortable:true,
			resizable:true,                        
                        dataIndex:'description',
			width:100
		},
                                {
			header:'long_description',
			sortable:true,
			resizable:true,                        
                        dataIndex:'long_description',
			width:100
		},
                                {
			header:'units',
			sortable:true,
			resizable:true,                        
                        dataIndex:'units',
			width:100
		},
                		/*
                {
			header:'mb_flag',
			sortable:true,
			resizable:true,                        
                        dataIndex:'mb_flag',
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
			header:'cogs_account',
			sortable:true,
			resizable:true,                        
                        dataIndex:'cogs_account',
			width:100
		},
                                {
			header:'inventory_account',
			sortable:true,
			resizable:true,                        
                        dataIndex:'inventory_account',
			width:100
		},
                                {
			header:'adjustment_account',
			sortable:true,
			resizable:true,                        
                        dataIndex:'adjustment_account',
			width:100
		},
                                {
			header:'assembly_account',
			sortable:true,
			resizable:true,                        
                        dataIndex:'assembly_account',
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
			header:'actual_cost',
			sortable:true,
			resizable:true,                        
                        dataIndex:'actual_cost',
			width:100
		},
                                {
			header:'last_cost',
			sortable:true,
			resizable:true,                        
                        dataIndex:'last_cost',
			width:100
		},
                                {
			header:'material_cost',
			sortable:true,
			resizable:true,                        
                        dataIndex:'material_cost',
			width:100
		},
                                {
			header:'labour_cost',
			sortable:true,
			resizable:true,                        
                        dataIndex:'labour_cost',
			width:100
		},
                                {
			header:'overhead_cost',
			sortable:true,
			resizable:true,                        
                        dataIndex:'overhead_cost',
			width:100
		},
                                {
			header:'inactive',
			sortable:true,
			resizable:true,                        
                        dataIndex:'inactive',
			width:100
		},
                                {
			header:'no_sale',
			sortable:true,
			resizable:true,                        
                        dataIndex:'no_sale',
			width:100
		},
                                {
			header:'editable',
			sortable:true,
			resizable:true,                        
                        dataIndex:'editable',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztStockMaster;
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
		jun.StockMasterGrid.superclass.initComponent.call(this);
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
            var form = new jun.StockMasterWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.stock_id;
            var form = new jun.StockMasterWin({modez:1, id:idz});
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
                url: 'Wanted/StockMaster/delete/id/' + record.json.stock_id,
                //url: 'index.php/api/StockMaster/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztStockMaster.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
