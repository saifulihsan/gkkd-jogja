jun.PeKasMasukstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeKasMasukstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeKasMasukStoreId",
            url: "PondokEfata/PeKasMasuk/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "kas_masuk_id"
            }, {
                name: "doc_ref"
            }, {
                name: "no_bukti"
            }, {
                name: "amount"
            }, {
                name: "entry_time"
            }, {
                name: "trans_date"
            }, {
                name: "trans_via"
            }, {
                name: "pe_donatur_id"
            }, {
                name: "pe_bank_accounts_id"
            }, {
                name: "users_id"
            }, {
                name: "note"
            } ]
        }, a));
    }
}), jun.rztPeKasMasuk = new jun.PeKasMasukstore();