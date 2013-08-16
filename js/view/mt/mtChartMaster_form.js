jun.MtChartMasterWin=Ext.extend(Ext.Window,{title:"Kode Rekening",modez:1,width:450,height:270,layout:"form",modal:!0,padding:5,closeForm:!1,initComponent:function(){this.items=[{xtype:"form",frame:!1,bodyStyle:"background-color: #E4E4E4; padding: 10px",id:"form-MtChartMaster",labelWidth:125,labelAlign:"left",layout:"form",ref:"formz",border:!1,items:[{xtype:"textfield",fieldLabel:"Kode Rekening",hideLabel:!1,name:"account_code",id:"account_codeid",ref:"../account_code2",maxLength:15,anchor:"100%"},{xtype:"textfield",fieldLabel:"Nama Rekening",hideLabel:!1,name:"account_name",id:"account_nameid",ref:"../account_name",maxLength:60,anchor:"100%"},{xtype:"combo",typeAhead:!0,triggerAction:"all",lazyRender:!0,mode:"local",fieldLabel:"Kelompok Rekening",store:jun.rztMtChartTypes,hiddenName:"account_type",hiddenValue:"account_type",valueField:"id",forceSelection:!0,displayField:"name",anchor:"100%"},new jun.comboActive({fieldLabel:"Status",hideLabel:!1,width:200,height:20,name:"status",ref:"../cmbActive",id:"statusid"}),{xtype:"textarea",fieldLabel:"Deskripsi",hideLabel:!1,name:"description",id:"descriptionid",ref:"../description",anchor:"100%"}]}],this.fbar={xtype:"toolbar",items:[{xtype:"button",text:"Simpan",hidden:!1,ref:"../btnSave"},{xtype:"button",text:"Simpan & Tutup",ref:"../btnSaveClose"},{xtype:"button",text:"Batal",ref:"../btnCancel"}]},jun.MtChartMasterWin.superclass.initComponent.call(this),this.btnSaveClose.on("click",this.onbtnSaveCloseClick,this),this.btnSave.on("click",this.onbtnSaveclick,this),this.btnCancel.on("click",this.onbtnCancelclick,this),this.modez==1||this.modez==2?this.btnSave.setVisible(!1):this.btnSave.setVisible(!0)},btnDisabled:function(a){this.btnSave.setDisabled(a),this.btnSaveClose.setDisabled(a)},saveForm:function(){this.btnDisabled(!0);var a;this.modez==1||this.modez==2?a="Mahkotrans/MtChartMaster/update/id/"+this.id:a="Mahkotrans/MtChartMaster/create/",Ext.getCmp("form-MtChartMaster").getForm().submit({url:a,timeOut:1e3,scope:this,success:function(a,b){jun.rztMtChartMaster.reload();var c=Ext.decode(b.response.responseText);Ext.MessageBox.show({title:"Info",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO}),this.modez==0&&(Ext.getCmp("form-MtChartMaster").getForm().reset(),this.btnDisabled(!1)),this.closeForm&&this.close()},failure:function(a,b){var c=Ext.decode(b.response.responseText);Ext.MessageBox.show({title:"Warning",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING}),this.btnDisabled(!1)}})},onbtnSaveCloseClick:function(){this.closeForm=!0,this.saveForm(!0)},onbtnSaveclick:function(){this.closeForm=!1,this.saveForm(!1)},onbtnCancelclick:function(){this.close()}}),jun.MtSaldoAwalWin=Ext.extend(Ext.Window,{title:"Saldo Awal",modez:1,width:350,height:170,layout:"form",modal:!0,padding:5,closeForm:!1,iswin:!0,initComponent:function(){this.items=[{xtype:"form",frame:!1,bodyStyle:"background-color: #E4E4E4; padding: 10px",id:"form-MtSaldoAwal",labelWidth:125,labelAlign:"left",layout:"form",ref:"formz",border:!1,items:[{xtype:"xdatefield",ref:"../trans_date",fieldLabel:"Tanggal Transaksi",name:"trans_date",id:"trans_dateid",format:"d M Y",anchor:"100%"},{xtype:"combo",typeAhead:!0,triggerAction:"all",lazyRender:!0,mode:"local",fieldLabel:"Kode Rekening",store:jun.rztMtChartMaster,hiddenName:"account_code",hiddenValue:"account_code",valueField:"account_code",tpl:new Ext.XTemplate('<tpl for="."><div class="search-item">','<h3><span">{account_code} - {account_name}</span></h3><br />{description}',"</div></tpl>"),matchFieldWidth:!1,itemSelector:"div.search-item",editable:!0,listWidth:300,displayField:"account_code",forceSelection:!0,anchor:"100%"},{xtype:"numericfield",fieldLabel:"Jumlah",hideLabel:!1,name:"amount",id:"amountid",ref:"../amount",maxLength:30,anchor:"100%"}]}],this.fbar={xtype:"toolbar",items:[{xtype:"button",text:"Simpan",hidden:!1,ref:"../btnSave"},{xtype:"button",text:"Batal",ref:"../btnCancel"}]},jun.rztMtChartMaster.reload(),jun.MtSaldoAwalWin.superclass.initComponent.call(this),this.on("activate",this.onActivate,this),this.btnSave.on("click",this.onbtnSaveclick,this),this.btnCancel.on("click",this.onbtnCancelclick,this)},btnDisabled:function(a){this.btnSave.setDisabled(a)},onActivate:function(){this.btnSave.hidden=!1},saveForm:function(){this.btnDisabled(!0),Ext.getCmp("form-MtSaldoAwal").getForm().submit({url:"Mahkotrans/MtChartMaster/SetSaldoAwal/",timeOut:1e3,scope:this,success:function(a,b){var c=Ext.decode(b.response.responseText);Ext.MessageBox.show({title:"Info",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO}),Ext.getCmp("form-MtSaldoAwal").getForm().reset(),this.close()},failure:function(a,b){if(b.failureType=="client")return;var c=Ext.decode(b.response.responseText);Ext.MessageBox.show({title:"Warning",msg:c.msg,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING}),this.btnDisabled(!1)}})},onbtnSaveCloseClick:function(){this.closeForm=!0,this.saveForm(!0)},onbtnSaveclick:function(){this.closeForm=!1,this.saveForm(!1)},onbtnCancelclick:function(){this.close()}});