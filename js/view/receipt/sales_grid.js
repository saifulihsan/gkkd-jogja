jun.SalesGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Sales",
        id:'docs-jun.SalesGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'sales_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'sales_id',
			width:100
		},
                                {
			header:'ref',
			sortable:true,
			resizable:true,                        
                        dataIndex:'ref',
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
			header:'address',
			sortable:true,
			resizable:true,                        
                        dataIndex:'address',
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
                		/*
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
	this.store = jun.rztSales;
        this.bbar = {
            items: [
           {
            xtype: 'paging',
            store: this.store,
            displayInfo: true,
            pageSize: 20
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
		jun.SalesGrid.superclass.initComponent.call(this);
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
            var form = new jun.SalesWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.sales_id;
            var form = new jun.SalesWin({modez:1, id:idz});
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
                url: 'user/Sales/delete/id/' + record.json.sales_id,
                //url: 'api/Sales/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztSales.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
