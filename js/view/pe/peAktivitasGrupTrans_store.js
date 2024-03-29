jun.PeAktivitasGrupTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeAktivitasGrupTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeAktivitasGrupTransStoreId",
            url: "PondokEfata/PeAktivitasGrupTrans/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "aktivitas_id"
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
                name: "pe_bank_accounts_id"
            }, {
                name: "users_id"
            }, {
                name: "pe_aktivitas_grup_id"
            }, {
                name: "pe_sub_aktivitas_id"
            }, {
                name: "note"
            } ]
        }, a));
    }
}), jun.rztPeAktivitasGrupTrans = new jun.PeAktivitasGrupTransstore();