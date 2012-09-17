jun.TblUserGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Users",
        id:'docs-jun.TblUserGrid',
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
			header:'username',
			sortable:true,
			resizable:true,                        
                        dataIndex:'username',
			width:100
		},
                        /*        {
			header:'password',
			sortable:true,
			resizable:true,                        
                        dataIndex:'password',
			width:100
		}, */
                                {
			header:'email',
			sortable:true,
			resizable:true,                        
            dataIndex:'email',
			width:100
		},
                                {
			header:'level',
			sortable:true,
			resizable:true,                        
                        dataIndex:'level',
			width:100
		},
                                {
			header:'nick',
			sortable:true,
			resizable:true,                        
                        dataIndex:'nick',
			width:100
		},
                		
                {
			header:'complete',
			sortable:true,
			resizable:true,                        
                        dataIndex:'complete',
			width:100
		},
                		
		
	],
	initComponent: function(){
    //    this.store = jun.rztNotaDtl;
	this.store = jun.rztTblUser;
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
                    }/*
                    ,                    
                    {
                        xtype: 'button',
                        text: 'Delete',
                        ref: '../btnDelete'
                    }*/
                ]
            };
		jun.TblUserGrid.superclass.initComponent.call(this);
	        this.btnAdd.on('Click', this.loadForm, this);
                this.btnEdit.on('Click', this.loadEditForm, this);
                //this.btnDelete.on('Click', this.deleteRec, this);
                this.getSelectionModel().on('rowselect', this.getrow, this);
	},
        
        getrow: function(sm, idx, r){
            this.record = r;

            var selectedz = this.sm.getSelections();
        },
        
        loadForm: function(){
            var form = new jun.TblUserWin({modez:0});
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
            //alert(idz);
            var form = new jun.TblUserWin({modez:1, id:idz});
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
                url: 'user/TblUser/delete/id/' + record.json.id,
                //url: 'api/TblUser/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztTblUser.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
