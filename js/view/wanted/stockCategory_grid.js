jun.StockCategoryGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Kategori Stok",
        id:'docs-jun.StockCategoryGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'Id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'category_id',
			width:100
		},
                                {
			header:'Deskripsi',
			sortable:true,
			resizable:true,                        
                        dataIndex:'description',
			width:100
		},
                                {
			header:'dflt_tax_type',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_tax_type',
			width:100
		},
                                {
			header:'dflt_units',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_units',
			width:100
		},
                                {
			header:'dflt_mb_flag',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_mb_flag',
			width:100
		},
                                {
			header:'dflt_sales_act',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_sales_act',
			width:100
		},
                		/*
                {
			header:'dflt_cogs_act',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_cogs_act',
			width:100
		},
                                {
			header:'dflt_inventory_act',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_inventory_act',
			width:100
		},
                                {
			header:'dflt_adjustment_act',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_adjustment_act',
			width:100
		},
                                {
			header:'dflt_assembly_act',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_assembly_act',
			width:100
		},
                                {
			header:'dflt_dim1',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_dim1',
			width:100
		},
                                {
			header:'dflt_dim2',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_dim2',
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
			header:'dflt_no_sale',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dflt_no_sale',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztStockCategory;
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
		jun.StockCategoryGrid.superclass.initComponent.call(this);
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
            var form = new jun.StockCategoryWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.category_id;
            var form = new jun.StockCategoryWin({modez:1, id:idz});
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
                url: 'Wanted/StockCategory/delete/id/' + record.json.category_id,
                //url: 'index.php/api/StockCategory/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztStockCategory.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
