jun.MtSysPrefsstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtSysPrefsstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtSysPrefsStoreId',
            url: 'Mahkotrans/MtSysPrefs/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'name'},
{name:'value'},
                
            ]
        }, cfg));
    }
});
jun.rztMtSysPrefs = new jun.MtSysPrefsstore();
jun.rztMtSysPrefs.load();
