jun.MtAktivitasGrupTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtAktivitasGrupTransstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtAktivitasGrupTransStoreId',
            url:'Mahkotrans/MtAktivitasGrupTrans/?output=json',
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
                {name:'mt_suppliers_supplier_id'},
                {name:'mt_bank_accounts_id'},
                {name:'users_id'},
                {name:'mt_aktivitas_grup_id'},
                {name:'mt_sub_aktivitas_id'},
                {name:'note'},
            ]
        }, cfg));
    }
});
jun.rztMtAktivitasGrupTrans = new jun.MtAktivitasGrupTransstore();
//jun.rztMtAktivitasGrupTrans.load();
