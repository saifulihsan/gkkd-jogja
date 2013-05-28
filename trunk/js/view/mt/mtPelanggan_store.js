jun.MtPelangganstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtPelangganstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtPelangganStoreId',
            url: 'Mahkotrans/MtPelanggan/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [
                {name: 'id_pelanggan'},
                {name: 'nama'},
                {name: 'no_tlp'},
                {name: 'alamat'},
                {name: 'inactive'},
            ]
        }, cfg));
    }
});
jun.rztMtPelanggan = new jun.MtPelangganstore();
//jun.rztMtPelanggan.load();
