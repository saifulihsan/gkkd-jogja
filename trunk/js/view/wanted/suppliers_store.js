jun.Suppliersstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Suppliersstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'SuppliersStoreId',
            url: 'Wanted/Suppliers/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'supplier_id'},
{name:'supp_name'},
{name:'supp_ref'},
{name:'address'},
{name:'supp_address'},
{name:'gst_no'},
{name:'contact'},
{name:'supp_account_no'},
{name:'website'},
{name:'bank_account'},
{name:'curr_code'},
{name:'payment_terms'},
{name:'tax_included'},
{name:'dimension_id'},
{name:'dimension2_id'},
{name:'tax_group_id'},
{name:'credit_limit'},
{name:'purchase_account'},
{name:'payable_account'},
{name:'payment_discount_account'},
{name:'notes'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztSuppliers = new jun.Suppliersstore();
jun.rztSuppliers.load();
