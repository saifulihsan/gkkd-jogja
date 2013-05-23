jun.MtChartTypesGrid=Ext.extend(Ext.grid.GridPanel ,{        
	title:"MtChartTypes",
        id:'docs-jun.MtChartTypesGrid',
//	width:400,
//	height:250,
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
			header:'class_id',
			sortable:true,
			resizable:true,                        
            dataIndex:'class_id',
			width:100
		},
                                {
			header:'parent',
			sortable:true,
			resizable:true,                        
            dataIndex:'parent',
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
	this.store = jun.rztMtChartTypes;
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
        jun.rztMtChartTypes.reload();
		jun.MtChartTypesGrid.superclass.initComponent.call(this);
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
            var form = new jun.MtChartTypesWin({modez:0});
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
            var form = new jun.MtChartTypesWin({modez:1, id:idz});
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
                url: 'Mahkotrans/MtChartTypes/delete/id/' + record.json.id,
                method: 'POST',
                success:function (f, a) {
                    jun.rztMtChartTypes.reload();
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
