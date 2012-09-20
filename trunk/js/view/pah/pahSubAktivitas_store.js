jun.PahSubAktivitasstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahSubAktivitasstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahSubAktivitasStoreId',
            url: 'PondokHarapan/PahSubAktivitas/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'nama'},
{name:'desc'},
{name:'account_code'},
                
            ]
        }, cfg));
    }
});
jun.rztPahSubAktivitas = new jun.PahSubAktivitasstore();
jun.rztPahSubAktivitas.load();
