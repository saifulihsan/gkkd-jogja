jun.MtAktivitasstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtAktivitasstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtAktivitasStoreId',
            url:'Mahkotrans/MtAktivitas/?output=json',
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
                {name:'mt_member_id'},
                {name:'mt_sub_aktivitas_id'},
                {name:'users_id'},
                {name:'note'},
            ]
        }, cfg));
    }
});
jun.rztMtAktivitas = new jun.MtAktivitasstore();
//jun.rztMtAktivitas.load();
