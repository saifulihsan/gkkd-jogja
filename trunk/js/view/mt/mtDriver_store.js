jun.MtDriverstore=Ext.extend(Ext.data.JsonStore,{constructor:function(a){a=a||{},jun.MtDriverstore.superclass.constructor.call(this,Ext.apply({storeId:"MtDriverStoreId",url:"Mahkotrans/MtDriver/?output=json",root:"results",totalProperty:"total",fields:[{name:"id_driver"},{name:"nama"},{name:"telp"},{name:"inactive"}]},a))}}),jun.rztMtDriver=new jun.MtDriverstore;