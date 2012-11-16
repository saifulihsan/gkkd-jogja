jun.Jemaatstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Jemaatstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'JemaatStoreId',
            url: 'general/Jemaat/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'nij'},
{name:'real_name'},
{name:'phone'},
{name:'email'},
{name:'inactive'},
{name:'alamat'},
                
            ]
        }, cfg));
    }
});
jun.rztJemaat = new jun.Jemaatstore();
jun.rztJemaat.load();

