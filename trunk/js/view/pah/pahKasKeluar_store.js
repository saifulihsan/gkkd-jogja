jun.PahKasKeluarstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahKasKeluarstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahKasKeluarStoreId',
            url: 'PondokHarapan/PahKasKeluar/?output=json',           
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
{name:'pah_suppliers_supplier_id'},
{name:'pah_chart_master_account_code'},
{name:'pah_bank_accounts_id'},
{name:'users_id'},
                
            ]
        }, cfg));
    }
});
jun.rztPahKasKeluar = new jun.PahKasKeluarstore();
jun.rztPahKasKeluar.load();
