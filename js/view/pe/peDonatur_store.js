jun.PeDonaturstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeDonaturstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeDonaturStoreId",
            url: "PondokEfata/PeDonatur/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "name"
            }, {
                name: "phone"
            }, {
                name: "alamat"
            }, {
                name: "inactive"
            }, {
                name: "account_code"
            } ]
        }, a));
    },
    FilterData: function() {
        this.filter([ {
            property: "inactive",
            value: "0"
        } ]);
    }
}), jun.rztPeDonatur = new jun.PeDonaturstore();