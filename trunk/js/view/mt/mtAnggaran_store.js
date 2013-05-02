jun.MtAnggaranstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtAnggaranstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtAnggaranStoreId',
            url:'Mahkotrans/MtAnggaran/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'doc_ref'},
                {name:'periode_bulan'},
                {name:'periode_tahun'},
                {name:'trans_date'},
                {name:'lock'},
                {name:'users_id'},
            ]
        }, cfg));
    }
});
jun.rztMtAnggaran = new jun.MtAnggaranstore();

