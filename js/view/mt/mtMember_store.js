jun.MtMemberstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtMemberstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtMemberStoreId',
            url:'Mahkotrans/MtMember/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'jemaat_nij'},
                {name:'inactive'},
            ]
        }, cfg));
    }
});
jun.rztMtMember = new jun.MtMemberstore();
//jun.rztMtMember.load();
jun.MtMemberbyNamestore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtMemberbyNamestore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtMemberbyNameStoreId',
            url:'Mahkotrans/MtMember/IndexbyName',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'jemaat_nij'},
                {name:'real_name'},
                {name:'inactive'},
            ]
        }, cfg));
    },
    FilterData:function () {
        this.filter([
            {
                property:'inactive',
                value:'0'
            },
        ]);
    }
});
jun.rztMtMemberbyName = new jun.MtMemberbyNamestore();
