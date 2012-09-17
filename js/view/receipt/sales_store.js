jun.Salesstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Salesstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'SalesStoreId',
            url: 'user/Sales/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'sales_id'},
{name:'ref'},
{name:'name'},
{name:'address'},
{name:'phone'},
{name:'phone2'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztSales = new jun.Salesstore();
jun.rztSales.load();
