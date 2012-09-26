jun.PahBankTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahBankTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahBankTransStoreId',
            url: 'PondokHarapan/PahBankTrans/?output=json',           
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
{name:'person_type_id'},
{name:'person_id'},
{name:'reconciled'},
                
            ]
        }, cfg));
    }
});
jun.rztPahBankTrans = new jun.PahBankTransstore();

