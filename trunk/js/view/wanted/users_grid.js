jun.UsersGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Users",
        id:'docs-jun.UsersGrid',
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
			header:'user_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'user_id',
			width:100
		},
                                {
			header:'password',
			sortable:true,
			resizable:true,                        
                        dataIndex:'password',
			width:100
		},
                                {
			header:'real_name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'real_name',
			width:100
		},
                                {
			header:'role_id',
			sortable:true,
			resizable:true,                        
                        dataIndex:'role_id',
			width:100
		},
                                {
			header:'phone',
			sortable:true,
			resizable:true,                        
                        dataIndex:'phone',
			width:100
		},
                		/*
                {
			header:'email',
			sortable:true,
			resizable:true,                        
                        dataIndex:'email',
			width:100
		},
                                {
			header:'language',
			sortable:true,
			resizable:true,                        
                        dataIndex:'language',
			width:100
		},
                                {
			header:'date_format',
			sortable:true,
			resizable:true,                        
                        dataIndex:'date_format',
			width:100
		},
                                {
			header:'date_sep',
			sortable:true,
			resizable:true,                        
                        dataIndex:'date_sep',
			width:100
		},
                                {
			header:'tho_sep',
			sortable:true,
			resizable:true,                        
                        dataIndex:'tho_sep',
			width:100
		},
                                {
			header:'dec_sep',
			sortable:true,
			resizable:true,                        
                        dataIndex:'dec_sep',
			width:100
		},
                                {
			header:'theme',
			sortable:true,
			resizable:true,                        
                        dataIndex:'theme',
			width:100
		},
                                {
			header:'page_size',
			sortable:true,
			resizable:true,                        
                        dataIndex:'page_size',
			width:100
		},
                                {
			header:'prices_dec',
			sortable:true,
			resizable:true,                        
                        dataIndex:'prices_dec',
			width:100
		},
                                {
			header:'qty_dec',
			sortable:true,
			resizable:true,                        
                        dataIndex:'qty_dec',
			width:100
		},
                                {
			header:'rates_dec',
			sortable:true,
			resizable:true,                        
                        dataIndex:'rates_dec',
			width:100
		},
                                {
			header:'percent_dec',
			sortable:true,
			resizable:true,                        
                        dataIndex:'percent_dec',
			width:100
		},
                                {
			header:'show_gl',
			sortable:true,
			resizable:true,                        
                        dataIndex:'show_gl',
			width:100
		},
                                {
			header:'show_codes',
			sortable:true,
			resizable:true,                        
                        dataIndex:'show_codes',
			width:100
		},
                                {
			header:'show_hints',
			sortable:true,
			resizable:true,                        
                        dataIndex:'show_hints',
			width:100
		},
                                {
			header:'last_visit_date',
			sortable:true,
			resizable:true,                        
                        dataIndex:'last_visit_date',
			width:100
		},
                                {
			header:'query_size',
			sortable:true,
			resizable:true,                        
                        dataIndex:'query_size',
			width:100
		},
                                {
			header:'graphic_links',
			sortable:true,
			resizable:true,                        
                        dataIndex:'graphic_links',
			width:100
		},
                                {
			header:'pos',
			sortable:true,
			resizable:true,                        
                        dataIndex:'pos',
			width:100
		},
                                {
			header:'print_profile',
			sortable:true,
			resizable:true,                        
                        dataIndex:'print_profile',
			width:100
		},
                                {
			header:'rep_popup',
			sortable:true,
			resizable:true,                        
                        dataIndex:'rep_popup',
			width:100
		},
                                {
			header:'sticky_doc_date',
			sortable:true,
			resizable:true,                        
                        dataIndex:'sticky_doc_date',
			width:100
		},
                                {
			header:'startup_tab',
			sortable:true,
			resizable:true,                        
                        dataIndex:'startup_tab',
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
	this.store = jun.rztUsers;
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
		jun.UsersGrid.superclass.initComponent.call(this);
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
            var form = new jun.UsersWin({modez:0});
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
            var form = new jun.UsersWin({modez:1, id:idz});
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
                url: 'Wanted/Users/delete/id/' + record.json.id,
                //url: 'api/Users/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztUsers.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
