jun.PahChartTypesstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.PahChartTypesstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'PahChartTypesStoreId',
            url: 'PondokHarapan/PahChartTypes/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id'},
{name:'name'},
{name:'class_id'},
{name:'parent'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztPahChartTypes = new jun.PahChartTypesstore();
jun.rztPahChartTypes.load();
