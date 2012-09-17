jun.PahAnggaranDetilstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahAnggaranDetilstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahAnggaranDetilStoreId',
            url: 'PondokHarapan/PahAnggaranDetil/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'pah_anggaran_id'},
{name:'kode_rekening'},
{name:'amount'},
                
            ]
        }, cfg));
    }
});
jun.rztPahAnggaranDetil = new jun.PahAnggaranDetilstore();
jun.rztPahAnggaranDetil.load();
