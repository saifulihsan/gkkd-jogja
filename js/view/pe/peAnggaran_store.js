jun.PeAnggaranstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeAnggaranstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeAnggaranStoreId',
            url:'PondokEfata/PeAnggaran/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'doc_ref'},
                {name:'periode_bulan'},
                {name:'periode_tahun'},
                {name:'trans_date'},
                {name:'users_id'},
            ]
        }, cfg));
    }
});
jun.rztPeAnggaran = new jun.PeAnggaranstore();
//jun.rztPeAnggaran.load();
