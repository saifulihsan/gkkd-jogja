jun.PahAktivitasstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahAktivitasstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahAktivitasStoreId",
            url: "PondokHarapan/PahAktivitas/?output=json",
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
                name: "pah_suppliers_supplier_id"
            }, {
                name: "pah_bank_accounts_id"
            }, {
                name: "pah_member_id"
            }, {
                name: "pah_sub_aktivitas_id"
            }, {
                name: "users_id"
            }, {
                name: "note"
            } ]
        }, a));
    }
}), jun.rztPahAktivitas = new jun.PahAktivitasstore();