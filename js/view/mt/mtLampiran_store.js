jun.MtLampiranstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtLampiranstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtLampiranStoreId',
            url:'Mahkotrans/MtLampiran/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id_lampiran'},
                {name:'nama'},
                {name:'trans_date'},
                {name:'keterangan'},
                {name:'satuan'},
                {name:'qty'},
                {name:'entry_time'},
            ]
        }, cfg));
    }
});
jun.rztMtLampiran = new jun.MtLampiranstore();
//jun.rztMtLampiran.load();
