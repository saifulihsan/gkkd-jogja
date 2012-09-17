jun.PahAnggaranstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahAnggaranstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahAnggaranStoreId',
            url: 'PondokHarapan/PahAnggaran/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'doc_ref'},
{name:'periode_bulan'},
{name:'periode_tahun'},
{name:'trans_date'},
{name:'lock'},
                
            ]
        }, cfg));
    }
});
jun.rztPahAnggaran = new jun.PahAnggaranstore();
jun.rztPahAnggaran.load();
