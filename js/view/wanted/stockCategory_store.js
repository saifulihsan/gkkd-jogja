jun.StockCategorystore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.StockCategorystore.superclass.constructor.call(this, Ext.apply({
            storeId: 'StockCategoryStoreId',
            url: 'Wanted/StockCategory/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'category_id'},
{name:'description'},
{name:'dflt_tax_type'},
{name:'dflt_units'},
{name:'dflt_mb_flag'},
{name:'dflt_sales_act'},
{name:'dflt_cogs_act'},
{name:'dflt_inventory_act'},
{name:'dflt_adjustment_act'},
{name:'dflt_assembly_act'},
{name:'dflt_dim1'},
{name:'dflt_dim2'},
{name:'inactive'},
{name:'dflt_no_sale'},
                
            ]
        }, cfg));
    }
});
jun.rztStockCategory = new jun.StockCategorystore();
jun.rztStockCategory.load();
