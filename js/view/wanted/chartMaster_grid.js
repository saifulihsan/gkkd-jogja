jun.ChartMasterGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"ChartMaster",
        id:'docs-jun.ChartMasterGrid',
	width:400,
	height:250,
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'account_code',
			sortable:true,
			resizable:true,                        
                        dataIndex:'account_code',
			width:100
		},
                                {
			header:'account_code2',
			sortable:true,
			resizable:true,                        
                        dataIndex:'account_code2',
			width:100
		},
                                {
			header:'account_name',
			sortable:true,
			resizable:true,                        
                        dataIndex:'account_name',
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
			header:'inactive',
			sortable:true,
			resizable:true,                        
                        dataIndex:'inactive',
			width:100
		},
                		
	],
	initComponent: function(){
	this.store = jun.rztChartMaster;
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
		jun.ChartMasterGrid.superclass.initComponent.call(this);
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
            var form = new jun.ChartMasterWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.account_code;
            var form = new jun.ChartMasterWin({modez:1, id:idz});
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
                url: 'Wanted/ChartMaster/delete/id/' + record.json.account_code,
                //url: 'api/ChartMaster/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztChartMaster.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
