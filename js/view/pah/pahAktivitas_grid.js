jun.PahAktivitasGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Aktivitas",
        id:'docs-jun.PahAktivitasGrid',
//	width:400,
//	height:250,
    viewConfig:{
        forceFit:true,
    },
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'aktivitas_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'aktivitas_id',
            hidden:true,
			width:100
		},
        {
            header:'Tanggal Transaksi',
            sortable:true,
            resizable:true,
            dataIndex:'trans_date',
            width:100
        },
        {
			header:'Ref. Dokumen',
			sortable:true,
			resizable:true,                        
            dataIndex:'doc_ref',
			width:100
		},
                                {
			header:'No. Bukti',
			sortable:true,
			resizable:true,                        
            dataIndex:'no_bukti',
			width:100
		},
                                {
			header:'Jumlah',
			sortable:true,
			resizable:true,                        
            dataIndex:'amount',
			width:100
		},
//                                {
//			header:'entry_time',
//			sortable:true,
//			resizable:true,
//            dataIndex:'entry_time',
//			width:100
//		},

                		/*
                {
			header:'trans_via',
			sortable:true,
			resizable:true,                        
            dataIndex:'trans_via',
			width:100
		},
                                {
			header:'pah_suppliers_supplier_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'pah_suppliers_supplier_id',
			width:100
		},
                                {
			header:'pah_chart_master_account_code',
			sortable:true,
			resizable:true,                        
            dataIndex:'pah_chart_master_account_code',
			width:100
		},
                                {
			header:'pah_bank_accounts_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'pah_bank_accounts_id',
			width:100
		},
                                {
			header:'pah_member_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'pah_member_id',
			width:100
		},
                                {
			header:'pah_sub_aktivitas_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'pah_sub_aktivitas_id',
			width:100
		},
                                {
			header:'users_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'users_id',
			width:100
		},
                		*/
		
	],
	initComponent: function(){
	this.store = jun.rztPahAktivitas;
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
		jun.PahAktivitasGrid.superclass.initComponent.call(this);
	        this.btnAdd.on('Click', this.loadForm, this);
                this.btnEdit.on('Click', this.loadEditForm, this);
                this.btnDelete.on('Click', this.deleteRec, this);
                this.getSelectionModel().on('rowselect', this.getrow, this);
        jun.rztPahAktivitas.load();
	},
        
        getrow: function(sm, idx, r){
            this.record = r;

            var selectedz = this.sm.getSelections();
        },
        
        loadForm: function(){
            var form = new jun.PahAktivitasWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.aktivitas_id;
            var form = new jun.PahAktivitasWin({modez:1, id:idz});
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
                url: 'PondokHarapan/PahAktivitas/delete/id/' + record.json.aktivitas_id,
                //url: 'index.php/api/PahAktivitas/delete/' + record[0].json.nosjp,
                method: 'POST',
                
                success: function(response){
                  jun.rztPahAktivitas.reload();
                  Ext.Msg.alert('Pelayanan', 'Delete Berhasil');

                },
                failure: function(response){
                  Ext.MessageBox.alert('error','could not connect to the database. retry later');
                  }
             });
        
        }
})
