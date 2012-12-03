jun.PeAktivitasstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PeAktivitasstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PeAktivitasStoreId',
            url: 'PondokEfata/PeAktivitas/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'aktivitas_id'},
{name:'doc_ref'},
{name:'no_bukti'},
{name:'amount'},
{name:'entry_time'},
{name:'trans_date'},
{name:'trans_via'},
{name:'pe_supplier_id'},
{name:'pe_bank_accounts_id'},
{name:'pe_member_id'},
{name:'pe_sub_aktivitas_id'},
{name:'users_id'},
{name:'note'},
                
            ]
        }, cfg));
    }
});
jun.rztPeAktivitas = new jun.PeAktivitasstore();
//jun.rztPeAktivitas.load();
