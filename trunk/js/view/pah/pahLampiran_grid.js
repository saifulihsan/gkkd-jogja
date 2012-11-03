jun.PahLampiranGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"Donasi Non Tunai",
        id:'docs-jun.PahLampiranGrid',
//	width:400,
//	height:250,
    viewConfig:{
        forceFit:true,
    },
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
	columns:[
                        {
			header:'id_lampiran',
			sortable:true,
			resizable:true,                        
            dataIndex:'id_lampiran',
            hidden:true,
			width:100
		},
                                {
			header:'Nama Donatur',
			sortable:true,
			resizable:true,                        
            dataIndex:'nama',
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
			header:'Keterangan',
			sortable:true,
			resizable:true,                        
            dataIndex:'keterangan',
			width:100
		},
                                {
			header:'Satuan',
			sortable:true,
			resizable:true,                        
            dataIndex:'satuan',
			width:100
		},
                                {
			header:'Jumlah',
			sortable:true,
			resizable:true,                        
            dataIndex:'qty',
			width:100
		},
                		
	],
	initComponent: function(){
	this.store = jun.rztPahLampiran;
//        this.bbar = {
//            items: [
//           {
//            xtype: 'paging',
//            store: this.store,
//            displayInfo: true,
//            pageSize: 10
//           }]
//        };
            
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
        jun.rztPahLampiran.reload();
		jun.PahLampiranGrid.superclass.initComponent.call(this);
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
            var form = new jun.PahLampiranWin({modez:0});
            form.show();
        },
        
        loadEditForm: function(){
            
            var selectedz = this.sm.getSelected();
            
            //var dodol = this.store.getAt(0);
             if(selectedz == ""){
                 Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");
                 return;
             }
            var idz = selectedz.json.id_lampiran;
            var form = new jun.PahLampiranWin({modez:1, id:idz});
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
                Ext.MessageBox.alert("Warning","Anda Belum Memilih Data");
                return;
            }

            Ext.Ajax.request({
                url: 'PondokHarapan/PahLampiran/delete/id/' + record.json.id_lampiran,
                method: 'POST',
                success:function (f, a) {
                    jun.rztPahLampiran.reload();
                    var response = Ext.decode(f.responseText);
                    Ext.MessageBox.show({
                    title:'Info',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.INFO
                    });
                },
                failure:function (f, a) {
                    var response = Ext.decode(f.responseText);
                    Ext.MessageBox.show({
                    title:'Warning',
                    msg:response.msg,
                    buttons:Ext.MessageBox.OK,
                    icon:Ext.MessageBox.WARNING
                    });
                }
             });
        
        }
})
