jun.MtKembaliKendaraanGrid=Ext.extend(Ext.grid.GridPanel,{title:"Daftar Pengembalian Kendaraan",id:"docs-jun.MtKembaliKendaraanGrid",iconCls:"silk-grid",viewConfig:{forceFit:!0},sm:new Ext.grid.RowSelectionModel({singleSelect:!0}),plugins:[new Ext.ux.grid.GridHeaderFilters],columns:[{header:"id_kembali",sortable:!0,resizable:!0,dataIndex:"id_kembali",hidden:!0,width:100},{header:"Ref. Dokumen",sortable:!0,resizable:!0,dataIndex:"doc_ref_kembali",width:100,filter:{xtype:"textfield"}},{header:"Tgl Transaksi",sortable:!0,resizable:!0,dataIndex:"trans_date",width:100},{header:"Waktu Kembali",sortable:!0,resizable:!0,dataIndex:"tgl_kembali",width:100},{header:"Pelunasan",sortable:!0,resizable:!0,dataIndex:"pelunasan",width:100,align:"right",renderer:Ext.util.Format.numberRenderer("0,0")},{header:"Total",sortable:!0,resizable:!0,dataIndex:"total",width:100,align:"right",renderer:Ext.util.Format.numberRenderer("0,0")}],initComponent:function(){jun.rztMtPelanggan.baseParams={mode:"all"},jun.rztMtPelanggan.reload(),jun.rztMtPelanggan.baseParams={},jun.rztMtKelompokPelanggan.reload(),jun.rztMtMobil.reload(),jun.rztMtDriver.reload(),jun.rztMtPinjamKendaraan.reload(),this.store=jun.rztMtKembaliKendaraan,this.bbar={items:[{xtype:"paging",store:this.store,displayInfo:!0,pageSize:20}]},this.tbar={xtype:"toolbar",items:[{xtype:"button",text:"Lihat Pengembalian",ref:"../btnAdd"},{xtype:"tbseparator"},{xtype:"button",text:"Void Pengembalian",ref:"../btnDelete"},{xtype:"tbseparator"},{xtype:"button",text:"Refresh",ref:"../btnRefresh"},{xtype:"tbseparator"},{xtype:"button",text:"Print",ref:"../btnPrint"}]},jun.rztMtKembaliKendaraan.reload(),jun.MtKembaliKendaraanGrid.superclass.initComponent.call(this),this.btnAdd.on("Click",this.loadForm,this),this.btnRefresh.on("Click",this.refreshData,this),this.btnPrint.on("Click",this.print,this),this.btnDelete.on("Click",this.deleteRec,this),this.getSelectionModel().on("rowselect",this.getrow,this)},print:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih data pengembalian!");return}var b=a.json.id_kembali;window.open("Mahkotrans/MtKembaliKendaraan/print/id/"+b,"_blank")},refreshData:function(){jun.rztMtKembaliKendaraan.reload()},getrow:function(a,b,c){this.record=c;var d=this.sm.getSelections()},loadForm:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih Jenis Pelayanan");return}var b=a.json.id_pinjam,c=new jun.MtPengembalianWin({modez:1});c.show(this);var d=jun.getMtPinjamKendaraan(this.record.data.id_pinjam);c.formz.getForm().loadRecord(d),c.formz.getForm().loadRecord(this.record);var e=Date.parseDate(d.data.tgl_pinjam,"Y-n-j H:i:s");c.tgl_pinjam.setValue(e);var f=Date.parseDate(d.data.tgl_rencana_kembali,"Y-n-j H:i:s");c.rencana_tanggal_kembali.setValue(f);var g=Date.parseDate(this.record.data.tgl_kembali,"Y-n-j H:i:s");c.tgl_kembali.setValue(g);var h=jun.getMobil(d.data.id_mobil);c.jenis_mobil.setValue(h.data.jenis)},loadEditForm:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih mobil yang dikembalikan.");return}var b=a.json.id_kembali,c=new jun.MtKembaliKendaraanWin({modez:1,id:b});c.show(this),c.formz.getForm().loadRecord(this.record)},deleteRec:function(){var a=this.sm.getSelected();if(a==""){Ext.MessageBox.alert("Warning","Anda belum memilih mobil yang dikembalikan.");return}var b=a.json.id_kembali,c=new jun.MtKembaliVoidWin({id:b});c.show(this)}});