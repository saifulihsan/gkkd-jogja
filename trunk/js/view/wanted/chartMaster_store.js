jun.ChartMasterstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.ChartMasterstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'ChartMasterStoreId',
            url: 'Wanted/ChartMaster/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'account_code'},
{name:'account_code2'},
{name:'account_name'},
{name:'account_type'},
{name:'inactive'},
                
            ]
        }, cfg));
    }
});
jun.rztChartMaster = new jun.ChartMasterstore();
jun.rztChartMaster.load();
