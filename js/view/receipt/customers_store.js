jun.Customersstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Customersstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'CustomersStoreId',
            url: 'user/Customers/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'customer_id'},
{name:'name'},
{name:'phone'},
{name:'phone2'},
{name:'address'},
{name:'email'},
{name:'fax'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztCustomers = new jun.Customersstore();
jun.rztCustomers.load();
