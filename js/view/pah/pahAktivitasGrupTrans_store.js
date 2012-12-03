jun.PahAktivitasGrupTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PahAktivitasGrupTransstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PahAktivitasGrupTransStoreId',
            url:'PondokHarapan/PahAktivitasGrupTrans/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'aktivitas_id'},
                {name:'doc_ref'},
                {name:'no_bukti'},
                {name:'amount'},
                {name:'entry_time'},
                {name:'trans_date'},
                {name:'trans_via'},
                {name:'pah_suppliers_supplier_id'},
                {name:'pah_bank_accounts_id'},
                {name:'users_id'},
                {name:'pah_aktivitas_grup_id'},
                {name:'pah_sub_aktivitas_id'},
                {name:'note'},
            ]
        }, cfg));
    }
});
jun.rztPahAktivitasGrupTrans = new jun.PahAktivitasGrupTransstore();
//jun.rztPahAktivitasGrupTrans.load();
