jun.MtChartTypesstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtChartTypesstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtChartTypesStoreId',
            url: 'Mahkotrans/MtChartTypes/?output=json',           
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
jun.rztMtChartTypes = new jun.MtChartTypesstore();
//jun.rztMtChartTypes.load();
