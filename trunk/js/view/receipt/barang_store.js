jun.Barangstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Barangstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'BarangStoreId',
            url: 'user/Barang/?output=json',
            idIndex: 0,
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'barang_id'},
{name:'ref'},
{name:'desc'},
{name:'harga'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztBarang = new jun.Barangstore();
jun.rztBarang.load();
