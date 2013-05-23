jun.MtMemberstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtMemberstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtMemberStoreId',
            url: 'Mahkotrans/MtMember/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'jemaat_nij'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztMtMember = new jun.MtMemberstore();
//jun.rztMtMember.load();
