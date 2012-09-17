jun.NotaDtlGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"NotaDtl",
        id:'docs-jun.NotaDtlGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'nota_dtl_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'nota_dtl_id',
			width:100
		},
                                {
			header:'nota_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'nota_id',
			width:100
		},
                                {
			header:'barang_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'barang_id',
			width:100
		},
                                {
			header:'jml',
			sortable:true,
			resizable:true,                        
                        dataIndex:'jml',
			width:100
		},
                                {
			header:'harga_satuan',
			sortable:true,
			resizable:true,                        
                        dataIndex:'harga_satuan',
			width:100
		},
                                {
			header:'total_harga_1',
			sortable:true,
			resizable:true,                        
                        dataIndex:'total_harga_1',
			width:100
		},
                		/*
                {
			header:'disc_per',
			sortable:true,
			resizable:true,                        
                        dataIndex:'disc_per',
			width:100
		},
                                {
			header:'disc_rp',
			sortable:true,
			resizable:true,                        
                        dataIndex:'disc_rp',
			width:100
		},
                                {
			header:'total_harga_2',
			sortable:true,
			resizable:true,                        
                        dataIndex:'total_harga_2',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztNotaDtl;
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
		jun.NotaDtlGrid.superclass.initComponent.call(this);
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
            var form = new jun.NotaDtlWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.nota_dtl_id;
            var form = new jun.NotaDtlWin({modez:1, id:idz});
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
                url: 'index.php/user/NotaDtl/delete/id/' + record.json.nota_dtl_id,
                //url: 'index.php/api/NotaDtl/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztNotaDtl.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
