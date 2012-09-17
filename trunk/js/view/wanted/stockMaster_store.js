jun.StockMasterstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.StockMasterstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'StockMasterStoreId',
            url: 'Wanted/StockMaster/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'stock_id'},
{name:'category_id'},
{name:'tax_type_id'},
{name:'description'},
{name:'long_description'},
{name:'units'},
{name:'mb_flag'},
{name:'sales_account'},
{name:'cogs_account'},
{name:'inventory_account'},
{name:'adjustment_account'},
{name:'assembly_account'},
{name:'dimension_id'},
{name:'dimension2_id'},
{name:'actual_cost'},
{name:'last_cost'},
{name:'material_cost'},
{name:'labour_cost'},
{name:'overhead_cost'},
{name:'inactive'},
{name:'no_sale'},
{name:'editable'},
                
            ]
        }, cfg));
    }
});
jun.rztStockMaster = new jun.StockMasterstore();
jun.rztStockMaster.load();
