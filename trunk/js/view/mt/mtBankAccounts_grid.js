jun.MtBankAccountsGrid=Ext.extend(Ext.grid.GridPanel,{title:"Kas dan Bank",id:"docs-jun.MtBankAccountsGrid",iconCls:"silk-grid",viewConfig:{forceFit:!0},sm:new Ext.grid.RowSelectionModel({singleSelect:!0}),columns:[{header:"Kode Rekening",sortable:!0,resizable:!0,dataIndex:"account_code"},{header:"Kas/Bank",sortable:!0,resizable:!0,dataIndex:"bank_account_name"},{header:"Nama Bank",sortable:!0,resizable:!0,dataIndex:"bank_name"},{header:"Nomer Rekening Bank",sortable:!0,resizable:!0,dataIndex:"bank_account_number"},{header:"Atas Nama",sortable:!0,resizable:!0,dataIndex:"atas_nama"},{header:"Telepon",sortable:!0,resizable:!0,dataIndex:"bank_phone"},{header:"Alamat Bank",sortable:!0,resizable:!0,dataIndex:"bank_address"},{header:"Status",dataIndex:"inactive",renderer:jun.renderActive}],initComponent:function(){this.store=jun.rztMtBankAccounts,this.tbar={xtype:"toolbar",items:[{xtype:"button",text:"Tambah Kas/Bank",ref:"../btnAdd"},{xtype:"tbseparator"},{xtype:"button",text:"Ubah Kas/Bank",ref:"../btnEdit"}]},jun.MtBankAccountsGrid.superclass.initComponent.call(this),this.btnAdd.on("Click",this.loadForm,this),this.btnEdit.on("Click",this.loadEditForm,this),this.getSelectionModel().on("rowselect",this.getrow,this),this.on("activate",this.onActivate,this),jun.rztMtBankAccounts.load()},onActivate:function(){},getrow:function(a,b,c){this.record=c;var d=this.sm.getSelections()},loadForm:function(){var a=new jun.MtBankAccountsWin({modez:0});a.show()},loadEditForm:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");return}var b=a.json.id,c=new jun.MtBankAccountsWin({modez:1,id:b});c.show(this),c.formz.getForm().loadRecord(a)},deleteRec:function(){Ext.MessageBox.confirm("Pertanyaan","Apakah anda yakin ingin menghapus data ini?",this.deleteRecYes,this)},deleteRecYes:function(a){if(a=="no")return;var b=this.sm.getSelected();if(b==""){Ext.MessageBox.alert("Warning","Anda Belum Memilih Data");return}Ext.Ajax.request({url:"Mahkotrans/MtBankAccounts/delete/id/"+b.json.id,method:"POST",success:function(a,b){var c=Ext.decode(a.responseText);Ext.MessageBox.show({title:"Info",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO}),jun.rztMtBankAccounts.reload()},failure:function(a,b){var c=Ext.decode(b.response.responseText);Ext.MessageBox.show({title:"Warning",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}});