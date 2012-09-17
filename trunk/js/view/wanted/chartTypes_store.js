jun.ChartTypesstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.ChartTypesstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'ChartTypesStoreId',
            url: 'Wanted/ChartTypes/?output=json',
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
jun.rztChartTypes = new jun.ChartTypesstore();
jun.rztChartTypes.load();
