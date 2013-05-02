jun.MtSysstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtSysstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtSysStoreId',
            url:'Mahkotrans/MtSys/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'name'},
                {name:'value'},
            ]
        }, cfg));
    }
});
jun.rztMtSys = new jun.MtSysstore();

