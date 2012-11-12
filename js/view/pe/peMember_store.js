jun.PeMemberstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeMemberstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeMemberStoreId',
            url:'PondokEfata/PeMember/?output=json',
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
jun.rztPeMember = new jun.PeMemberstore();
//jun.rztPeMember.load();
jun.PeMemberbyNamestore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeMemberbyNamestore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeMemberbyNameStoreId',
            url:'PondokEfata/PeMember/IndexbyName',
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
jun.rztPeMemberbyName = new jun.PeMemberbyNamestore();
