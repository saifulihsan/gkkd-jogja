jun.PahAnggaranstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahAnggaranstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahAnggaranStoreId",
            url: "PondokHarapan/PahAnggaran/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "doc_ref"
            }, {
                name: "periode_bulan"
            }, {
                name: "periode_tahun"
            }, {
                name: "trans_date"
            }, {
                name: "lock"
            }, {
                name: "users_id"
            } ]
        }, a));
    }
}), jun.rztPahAnggaran = new jun.PahAnggaranstore();