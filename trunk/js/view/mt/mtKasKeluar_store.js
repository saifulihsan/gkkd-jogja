jun.MtKasKeluarstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtKasKeluarstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtKasKeluarStoreId',
            url: 'Mahkotrans/MtKasKeluar/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'kas_keluar_id'},
{name:'doc_ref'},
{name:'no_bukti'},
{name:'amount'},
{name:'entry_time'},
{name:'trans_date'},
{name:'trans_via'},
{name:'mt_account_code'},
{name:'mt_bank_accounts_id'},
{name:'users_id'},
{name:'note'},
{name:'id_mobil'},
                
            ]
        }, cfg));
    }
});
jun.rztMtKasKeluar = new jun.MtKasKeluarstore();
//jun.rztMtKasKeluar.load();
