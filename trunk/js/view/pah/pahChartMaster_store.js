jun.PahChartMasterstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PahChartMasterstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PahChartMasterStoreId',
            url:'PondokHarapan/PahChartMaster/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'account_code'},
                {name:'account_code2'},
                {name:'account_name'},
                {name:'account_type'},
                {name:'inactive'},
                {name:'description'},
            ]
        }, cfg));
    },
    FilterData:function () {
        this.filter([
            {
                property:'inactive',
                value:'0'
            },
        ]);
    }
});
jun.rztPahChartMaster = new jun.PahChartMasterstore();
