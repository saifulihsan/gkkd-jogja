jun.MtMobilstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtMobilstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtMobilStoreId',
            url: 'Mahkotrans/MtMobil/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [
                {name: 'id_mobil'},
                {name: 'nopol'},
                {name: 'jenis'},
                {name: 'tahun'},
                {name: 'tarif_12'},
                {name: 'tarif_24'},
                {name: 'tarif_high_12'},
                {name: 'tarif_high_24'},
                {name: 'tarif_bulanan'},
                {name: 'overtime'},
                {name: 'discount_other_rental'},
                {name: 'status_pemilik'},
                {name: 'inactive'},
                {name: 'other_tarif_12'},
                {name: 'other_tarif_24'},
                {name: 'other_tarif_high_12'},
                {name: 'other_tarif_high_24'},
                {name: 'other_tarif_bulanan'},
                {name: 'other_overtime'},
            ]
        }, cfg));
    }
});
jun.rztMtMobil = new jun.MtMobilstore();
//jun.rztMtMobil.load();
