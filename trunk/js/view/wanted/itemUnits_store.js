jun.ItemUnitsstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.ItemUnitsstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'ItemUnitsStoreId',
            url: 'Wanted/ItemUnits/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'abbr'},
{name:'name'},
{name:'decimals'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztItemUnits = new jun.ItemUnitsstore();
jun.rztItemUnits.load();
