jun.PeSysPrefsstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeSysPrefsstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeSysPrefsStoreId',
            url:'PondokEfata/PeSysPrefs/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'name'},
                {name:'value'},
            ]
        }, cfg));
    }
});
jun.rztPeSysPrefs = new jun.PeSysPrefsstore();
//jun.rztPeSysPrefs.load();
