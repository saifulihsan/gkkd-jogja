jun.MtKelompokPelangganstore=Ext.extend(Ext.data.JsonStore,{constructor:function(a){a=a||{},jun.MtKelompokPelangganstore.superclass.constructor.call(this,Ext.apply({storeId:"MtKelompokPelangganStoreId",url:"Mahkotrans/MtKelompokPelanggan/?output=json",root:"results",totalProperty:"total",fields:[{name:"id_kelompok"},{name:"nama"},{name:"discont_persen"},{name:"inactive"}]},a))}}),jun.rztMtKelompokPelanggan=new jun.MtKelompokPelangganstore;