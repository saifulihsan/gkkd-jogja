jun.MtDriverstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtDriverstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtDriverStoreId',
            url: 'Mahkotrans/MtDriver/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id_driver'},
{name:'nama'},
{name:'telp'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztMtDriver = new jun.MtDriverstore();
//jun.rztMtDriver.load();
