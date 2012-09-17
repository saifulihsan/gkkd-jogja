jun.Customersstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Customersstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'CustomersStoreId',
            url: 'Wanted/Customers/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'cust_id'},
{name:'br_name'},
{name:'branch_ref'},
{name:'br_address'},
{name:'area'},
{name:'salesman'},
{name:'contact_name'},
{name:'default_location'},
{name:'tax_group_id'},
{name:'sales_account'},
{name:'sales_discount_account'},
{name:'receivables_account'},
{name:'payment_discount_account'},
{name:'default_ship_via'},
{name:'disable_trans'},
{name:'br_post_address'},
{name:'group_no'},
{name:'notes'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztCustomers = new jun.Customersstore();
jun.rztCustomers.load();
