jun.PahLampiranstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PahLampiranstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PahLampiranStoreId',
            url:'PondokHarapan/PahLampiran/?output=json',
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
jun.rztPahLampiran = new jun.PahLampiranstore();
//jun.rztPahLampiran.load();
