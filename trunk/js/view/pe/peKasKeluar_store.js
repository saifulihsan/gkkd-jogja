jun.PeKasKeluarstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeKasKeluarstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeKasKeluarStoreId",
            url: "PondokEfata/PeKasKeluar/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "kas_keluar_id"
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
                name: "pe_supplier_id"
            }, {
                name: "pe_account_code"
            }, {
                name: "pe_bank_accounts_id"
            }, {
                name: "users_id"
            }, {
                name: "note"
            } ]
        }, a));
    }
}), jun.rztPeKasKeluar = new jun.PeKasKeluarstore();