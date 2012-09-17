jun.ChartClassstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.ChartClassstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'ChartClassStoreId',
            url: 'Wanted/ChartClass/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'cid'},
{name:'class_name'},
{name:'ctype'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztChartClass = new jun.ChartClassstore();
jun.rztChartClass.load();
