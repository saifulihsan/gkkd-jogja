jun.PeMemberstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeMemberstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeMemberStoreId",
            url: "PondokEfata/PeMember/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "jemaat_nij"
            }, {
                name: "inactive"
            } ]
        }, a));
    }
}), jun.rztPeMember = new jun.PeMemberstore(), jun.PeMemberbyNamestore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeMemberbyNamestore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeMemberbyNameStoreId",
            url: "PondokEfata/PeMember/IndexbyName",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "jemaat_nij"
            }, {
                name: "real_name"
            }, {
                name: "inactive"
            } ]
        }, a));
    },
    FilterData: function() {
        this.filter([ {
            property: "inactive",
            value: "0"
        } ]);
    }
}), jun.rztPeMemberbyName = new jun.PeMemberbyNamestore();