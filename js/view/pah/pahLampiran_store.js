jun.PahLampiranstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahLampiranstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahLampiranStoreId",
            url: "PondokHarapan/PahLampiran/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id_lampiran"
            }, {
                name: "nama"
            }, {
                name: "trans_date"
            }, {
                name: "keterangan"
            }, {
                name: "satuan"
            }, {
                name: "qty"
            }, {
                name: "entry_time"
            } ]
        }, a));
    }
}), jun.rztPahLampiran = new jun.PahLampiranstore();