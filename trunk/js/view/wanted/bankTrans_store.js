jun.BankTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.BankTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'BankTransStoreId',
            url: 'Wanted/BankTrans/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'type'},
{name:'trans_no'},
{name:'bank_act'},
{name:'ref'},
{name:'trans_date'},
{name:'amount'},
{name:'dimension_id'},
{name:'dimension2_id'},
{name:'person_type_id'},
{name:'person_id'},
{name:'reconciled'},
                
            ]
        }, cfg));
    }
});
jun.rztBankTrans = new jun.BankTransstore();
jun.rztBankTrans.load();
