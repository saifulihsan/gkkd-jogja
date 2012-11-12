jun.PeChartTypesstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeChartTypesstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeChartTypesStoreId',
            url:'PondokEfata/PeChartTypes/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'name'},
                {name:'class_id'},
                {name:'parent'},
                {name:'inactive'},
            ]
        }, cfg));
    }
});
jun.rztPeChartTypes = new jun.PeChartTypesstore();
//jun.rztPeChartTypes.load();
