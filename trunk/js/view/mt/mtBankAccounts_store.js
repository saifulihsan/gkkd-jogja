jun.MtBankAccountsstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtBankAccountsstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtBankAccountsStoreId',
            url: 'Mahkotrans/MtBankAccounts/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'account_code'},
{name:'account_type'},
{name:'bank_account_name'},
{name:'bank_account_number'},
{name:'bank_name'},
{name:'bank_address'},
{name:'inactive'},
{name:'bank_phone'},
{name:'atas_nama'},
                
            ]
        }, cfg));
    }
});
jun.rztMtBankAccounts = new jun.MtBankAccountsstore();
//jun.rztMtBankAccounts.load();
