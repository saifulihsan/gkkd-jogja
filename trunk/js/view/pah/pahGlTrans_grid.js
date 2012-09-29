jun.PahGlTransGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"PahGlTrans",
        id:'docs-jun.PahGlTransGrid',
//	width:400,
//	height:250,
    viewConfig:{
        forceFit:true,
    },
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'counter',
			sortable:true,
			resizable:true,                        
            dataIndex:'counter',
			width:100
		},
                                {
			header:'type',
			sortable:true,
			resizable:true,                        
            dataIndex:'type',
			width:100
		},
                                {
			header:'type_no',
			sortable:true,
			resizable:true,                        
            dataIndex:'type_no',
			width:100
		},
                                {
			header:'tran_date',
			sortable:true,
			resizable:true,                        
            dataIndex:'tran_date',
			width:100
		},
                                {
			header:'account',
			sortable:true,
			resizable:true,                        
            dataIndex:'account',
			width:100
		},
                                {
			header:'memo_',
			sortable:true,
			resizable:true,                        
            dataIndex:'memo_',
			width:100
		},
                		/*
                {
			header:'amount',
			sortable:true,
			resizable:true,                        
            dataIndex:'amount',
			width:100
		},
                                {
			header:'person_type_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'person_type_id',
			width:100
		},
                                {
			header:'person_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'person_id',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztPahGlTrans;
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
                        text: 'Tambah',
                        ref: '../btnAdd'
                    },
                    {
                        xtype:'tbseparator',
                    },
                    {
                        xtype: 'button',
                        text: 'Ubah',
                        ref: '../btnEdit'
                    },
                    {
                        xtype:'tbseparator',
                    },
                    {
                        xtype: 'button',
                        text: 'Hapus',
                        ref: '../btnDelete'
                    }
                ]
            };
		jun.PahGlTransGrid.superclass.initComponent.call(this);
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
            var form = new jun.PahGlTransWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.counter;
            var form = new jun.PahGlTransWin({modez:1, id:idz});
            form.show(this);
            form.formz.getForm().loadRecord(this.record);
        },
        
        deleteRec : function(){
            Ext.MessageBox.confirm('Pertanyaan','Apakah anda yakin ingin menghapus data ini?', this.deleteRecYes, this);
        },
        
        deleteRecYes : function(btn){

            if (btn == 'no') {
            return;
            }

            var record = this.sm.getSelected();

            // Check is list selected
            if(record == ""){
                Ext.MessageBox.alert("Warning","Anda Belum Memilih Jenis Pelayanan");
                return;
            }

            Ext.Ajax.request({
                waitMsg: 'Please Wait',
                url: 'PondokHarapan/PahGlTrans/delete/id/' + record.json.counter,
                //url: 'index.php/api/PahGlTrans/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztPahGlTrans.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
