jun.JemaatGrid=Ext.extend(Ext.grid.GridPanel,{title:"Data Jemaat",id:"docs-jun.JemaatGrid",iconCls:"silk-grid",viewConfig:{forceFit:!0},sm:new Ext.grid.RowSelectionModel({singleSelect:!0}),plugins:[new Ext.ux.grid.GridHeaderFilters],columns:[{header:"Nomor Induk Jemaat",sortable:!0,resizable:!0,dataIndex:"nij",width:100,filter:{xtype:"textfield",filterName:"nij"}},{header:"Nama Lengkap",sortable:!0,resizable:!0,dataIndex:"real_name",width:100,filter:{xtype:"textfield",filterName:"real_name"}},{header:"Phone",sortable:!0,resizable:!0,dataIndex:"phone",width:100,filter:{xtype:"textfield",filterName:"phone"}},{header:"E-Mail",sortable:!0,resizable:!0,dataIndex:"email",width:100,filter:{xtype:"textfield",filterName:"email"}},{header:"Alamat",sortable:!0,resizable:!0,dataIndex:"alamat",width:100,filter:{xtype:"textfield",filterName:"alamat"}},{header:"Status",sortable:!0,resizable:!0,dataIndex:"inactive",renderer:jun.renderActive,width:100,filter:{xtype:"combo",mode:"local",store:[[-1,"All"],[0,"Aktif"],[1,"Non Aktif"]],allowBlank:!0,triggerAction:"all"}}],initComponent:function(){this.store=jun.rztJemaat,this.bbar={items:[{xtype:"paging",store:this.store,displayInfo:!0,pageSize:20}]},this.tbar={xtype:"toolbar",items:[{xtype:"button",iconCls:"asp-user3_add",text:"Tambah Data",ref:"../btnAdd"},{xtype:"tbseparator"},{xtype:"button",iconCls:"asp-user3_edit",text:"Ubah Data",ref:"../btnEdit"}]},jun.rztJemaat.reload(),jun.rztSecurityRoles.reload(),jun.JemaatGrid.superclass.initComponent.call(this),this.btnAdd.on("Click",this.loadForm,this),this.btnEdit.on("Click",this.loadEditForm,this),this.getSelectionModel().on("rowselect",this.getrow,this)},getrow:function(a,b,c){this.record=c;var d=this.sm.getSelections()},loadForm:function(){var a=new jun.JemaatWin({modez:0});a.show()},loadEditForm:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");return}var b=a.json.nij,c=new jun.JemaatWin({modez:1,id:b});c.show(this),c.formz.getForm().loadRecord(this.record)},deleteRec:function(){Ext.MessageBox.confirm("Pertanyaan","Apakah anda yakin ingin menghapus data ini?",this.deleteRecYes,this)},deleteRecYes:function(a){if(a=="no")return;var b=this.sm.getSelected();if(b==""){Ext.MessageBox.alert("Warning","Anda Belum Memilih Jenis Pelayanan");return}Ext.Ajax.request({waitMsg:"Please Wait",url:"general/Jemaat/delete/id/"+b.json.nij,method:"POST",success:function(a){jun.rztJemaat.reload(),Ext.Msg.alert("Pelayanan","Delete Berhasil")},failure:function(a){Ext.MessageBox.alert("error","could not connect to the database. retry later")}})}});