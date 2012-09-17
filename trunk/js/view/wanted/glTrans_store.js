jun.GlTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.GlTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'GlTransStoreId',
            url: 'Wanted/GlTrans/?output=json',           
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
{name:'dimension_id'},
{name:'dimension2_id'},
{name:'person_type_id'},
{name:'person_id'},
                
            ]
        }, cfg));
    }
});
jun.rztGlTrans = new jun.GlTransstore();
jun.rztGlTrans.load();
