jun.BankAccountsstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.BankAccountsstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'BankAccountsStoreId',
            url: 'Wanted/BankAccounts/?output=json',
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
{name:'bank_curr_code'},
{name:'dflt_curr_act'},
{name:'last_reconciled_date'},
{name:'ending_reconcile_balance'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztBankAccounts = new jun.BankAccountsstore();
jun.rztBankAccounts.load();
