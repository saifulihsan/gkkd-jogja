jun.MtKelompokPelangganstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtKelompokPelangganstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtKelompokPelangganStoreId',
            url: 'Mahkotrans/MtKelompokPelanggan/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [
                {name: 'id_kelompok'},
                {name: 'nama'},
                {name: 'discont_persen'},
                {name: 'inactive'},
            ]
        }, cfg));
    }
});
jun.rztMtKelompokPelanggan = new jun.MtKelompokPelangganstore();
//jun.rztMtKelompokPelanggan.load();
