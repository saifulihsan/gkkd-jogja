jun.MtKasMasukstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtKasMasukstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtKasMasukStoreId',
            url: 'Mahkotrans/MtKasMasuk/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [
                {name: 'kas_masuk_id'},
                {name: 'doc_ref'},
                {name: 'no_bukti'},
                {name: 'amount'},
                {name: 'entry_time'},
                {name: 'trans_date'},
                {name: 'trans_via'},
                {name: 'mt_bank_accounts_id'},
                {name: 'users_id'},
                {name: 'note'},
                {name: 'id_mobil'},
                {name: 'account_code'},
            ]
        }, cfg));
    }
});
jun.rztMtKasMasuk = new jun.MtKasMasukstore();
//jun.rztMtKasMasuk.load();
