jun.PeLampiranstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeLampiranstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeLampiranStoreId",
            url: "PondokEfata/PeLampiran/?output=json",
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
}), jun.rztPeLampiran = new jun.PeLampiranstore();