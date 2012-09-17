jun.PahDonaturstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahDonaturstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahDonaturStoreId',
            url: 'PondokHarapan/PahDonatur/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'name'},
{name:'phone'},
{name:'alamat'},
                
            ]
        }, cfg));
    }
});
jun.rztPahDonatur = new jun.PahDonaturstore();
jun.rztPahDonatur.load();
