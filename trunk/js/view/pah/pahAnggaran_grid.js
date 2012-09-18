jun.PahAnggaranGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Anggaran",
        id:'docs-jun.PahAnggaranGrid',
    viewConfig:{
        forceFit:true,
    },
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'id',
			sortable:true,
			resizable:true,                        
            dataIndex:'id',
            hidden:true,
			width:100
		},
                                {
			header:'doc_ref',
			sortable:true,
			resizable:true,                        
            dataIndex:'doc_ref',
		},
                                {
			header:'Periode Bulan',
			sortable:true,
			resizable:true,                        
            dataIndex:'periode_bulan',
			width:100
		},
                                {
			header:'Periode Tahun',
			sortable:true,
			resizable:true,                        
            dataIndex:'periode_tahun',
			width:100
		},
                                {
			header:'Entry Date',
			sortable:true,
			resizable:true,                        
            dataIndex:'trans_date',
			width:100
		},
//                                {
//			header:'lock',
//			sortable:true,
//			resizable:true,
//                        dataIndex:'lock',
//			width:100
//		},
                		
	],
	initComponent: function(){
	this.store = jun.rztPahAnggaran;
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
		jun.PahAnggaranGrid.superclass.initComponent.call(this);
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
            var form = new jun.PahAnggaranWin({modez:0});
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
            var form = new jun.PahAnggaranWin({modez:1, id:idz});
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
                url: 'PondokHarapan/PahAnggaran/delete/id/' + record.json.id,
                //url: 'index.php/api/PahAnggaran/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztPahAnggaran.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
