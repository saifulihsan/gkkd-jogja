jun.MtChartMasterGrid=Ext.extend(Ext.grid.GridPanel,{title:"Kode Rekening",id:"docs-jun.MtChartMasterGrid",iconCls:"silk-grid",viewConfig:{forceFit:!0},sm:new Ext.grid.RowSelectionModel({singleSelect:!0}),columns:[{header:"Kode Rekening",sortable:!0,resizable:!0,dataIndex:"account_code",width:100},{header:"Nama Rekening",sortable:!0,resizable:!0,dataIndex:"account_name",width:100},{header:"Kelompok Rekening",sortable:!0,resizable:!0,dataIndex:"account_type",renderer:jun.renderMtChartType},{header:"Deskripsi",sortable:!0,resizable:!0,dataIndex:"description",width:400},{header:"Status",dataIndex:"inactive",renderer:jun.renderActive}],initComponent:function(){jun.rztMtChartTypes.reload(),this.store=jun.rztMtChartMaster,this.tbar={xtype:"toolbar",items:[{xtype:"button",text:"Tambah Kode Rekening",ref:"../btnAdd"},{xtype:"tbseparator"},{xtype:"button",text:"Ubah Kode Rekening",ref:"../btnEdit"}]},jun.rztMtChartMaster.reload(),jun.MtChartMasterGrid.superclass.initComponent.call(this),this.btnAdd.on("Click",this.loadForm,this),this.btnEdit.on("Click",this.loadEditForm,this),this.getSelectionModel().on("rowselect",this.getrow,this)},getrow:function(a,b,c){this.record=c;var d=this.sm.getSelections()},loadForm:function(){var a=new jun.MtChartMasterWin({modez:0});a.show()},loadEditForm:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");return}var b=a.json.account_code,c=new jun.MtChartMasterWin({modez:1,id:b});c.show(this),c.formz.getForm().loadRecord(this.record)},deleteRec:function(){Ext.MessageBox.confirm("Pertanyaan","Apakah anda yakin ingin menghapus data ini?",this.deleteRecYes,this)},deleteRecYes:function(a){if(a=="no")return;var b=this.sm.getSelected();if(b==""){Ext.MessageBox.alert("Warning","Anda Belum Memilih Data");return}Ext.Ajax.request({url:"Mahkotrans/MtChartMaster/delete/id/"+b.json.account_code,method:"POST",success:function(a,b){jun.rztMtChartMaster.reload();var c=Ext.decode(a.responseText);Ext.MessageBox.show({title:"Info",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO})},failure:function(a,b){var c=Ext.decode(a.responseText);Ext.MessageBox.show({title:"Warning",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}});