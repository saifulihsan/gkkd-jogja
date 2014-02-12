jun.PahDonaturstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahDonaturstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahDonaturStoreId",
            url: "PondokHarapan/PahDonatur/?output=json",
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
                name: "pah_chart_master_account_code"
            } ]
        }, a));
    },
    FilterData: function() {
        this.filter([ {
            property: "inactive",
            value: "0"
        } ]);
    }
}), jun.rztPahDonatur = new jun.PahDonaturstore();