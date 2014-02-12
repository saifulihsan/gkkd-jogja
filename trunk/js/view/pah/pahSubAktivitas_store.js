jun.PahSubAktivitasstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahSubAktivitasstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahSubAktivitasStoreId",
            url: "PondokHarapan/PahSubAktivitas/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "nama"
            }, {
                name: "desc"
            }, {
                name: "account_code"
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
}), jun.rztPahSubAktivitas = new jun.PahSubAktivitasstore();