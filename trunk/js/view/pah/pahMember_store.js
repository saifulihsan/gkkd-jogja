jun.PahMemberstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahMemberstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahMemberStoreId',
            url: 'PondokHarapan/PahMember/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'jemaat_nij'},
                
            ]
        }, cfg));
    }
});
jun.rztPahMember = new jun.PahMemberstore();
jun.rztPahMember.load();
