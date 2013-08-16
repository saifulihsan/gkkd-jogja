jun.MtDriverGrid=Ext.extend(Ext.grid.GridPanel,{title:"Daftar Driver",id:"docs-jun.MtDriverGrid",iconCls:"silk-grid",viewConfig:{forceFit:!0},sm:new Ext.grid.RowSelectionModel({singleSelect:!0}),columns:[{header:"Nama",sortable:!0,resizable:!0,dataIndex:"nama",width:100},{header:"Telp",sortable:!0,resizable:!0,dataIndex:"telp",width:100},{header:"status",sortable:!0,resizable:!0,dataIndex:"inactive",renderer:jun.renderActive}],initComponent:function(){this.store=jun.rztMtDriver,this.tbar={xtype:"toolbar",items:[{xtype:"button",text:"Tambah Driver",ref:"../btnAdd"},{xtype:"tbseparator"},{xtype:"button",text:"Ubah Driver",ref:"../btnEdit"}]},jun.rztMtDriver.reload(),jun.MtDriverGrid.superclass.initComponent.call(this),this.btnAdd.on("Click",this.loadForm,this),this.btnEdit.on("Click",this.loadEditForm,this),this.getSelectionModel().on("rowselect",this.getrow,this)},getrow:function(a,b,c){this.record=c;var d=this.sm.getSelections()},loadForm:function(){var a=new jun.MtDriverWin({modez:0});a.show()},loadEditForm:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");return}var b=a.json.id_driver,c=new jun.MtDriverWin({modez:1,id:b});c.show(this),c.formz.getForm().loadRecord(this.record)},deleteRec:function(){Ext.MessageBox.confirm("Pertanyaan","Apakah anda yakin ingin menghapus data ini?",this.deleteRecYes,this)},deleteRecYes:function(a){if(a=="no")return;var b=this.sm.getSelected();if(b==""){Ext.MessageBox.alert("Warning","Anda Belum Memilih Data");return}Ext.Ajax.request({url:"Mahkotrans/MtDriver/delete/id/"+b.json.id_driver,method:"POST",success:function(a,b){jun.rztMtDriver.reload();var c=Ext.decode(a.responseText);Ext.MessageBox.show({title:"Info",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO})},failure:function(a,b){var c=Ext.decode(a.responseText);Ext.MessageBox.show({title:"Warning",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}});