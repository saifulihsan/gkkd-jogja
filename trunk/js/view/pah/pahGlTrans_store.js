jun.PahGlTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahGlTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahGlTransStoreId',
            url: 'PondokHarapan/PahGlTrans/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'counter'},
{name:'type'},
{name:'type_no'},
{name:'tran_date'},
{name:'account'},
{name:'memo_'},
{name:'amount'},
{name:'users_id'},
                
            ]
        }, cfg));
    }
});
jun.rztPahGlTrans = new jun.PahGlTransstore();
//jun.rztPahGlTrans.load();
