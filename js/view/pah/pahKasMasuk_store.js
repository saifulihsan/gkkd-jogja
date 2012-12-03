jun.PahKasMasukstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahKasMasukstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahKasMasukStoreId',
            url: 'PondokHarapan/PahKasMasuk/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'kas_masuk_id'},
{name:'doc_ref'},
{name:'no_bukti'},
{name:'amount'},
{name:'entry_time'},
{name:'trans_date'},
{name:'trans_via'},
{name:'pah_donatur_id'},
{name:'pah_bank_accounts_id'},
{name:'users_id'},
{name:'note'},
                
            ]
        }, cfg));
    }
});
jun.rztPahKasMasuk = new jun.PahKasMasukstore();
//jun.rztPahKasMasuk.load();
