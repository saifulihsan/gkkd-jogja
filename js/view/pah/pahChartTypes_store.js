jun.PahChartTypesstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahChartTypesstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahChartTypesStoreId",
            url: "PondokHarapan/PahChartTypes/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "name"
            }, {
                name: "class_id"
            }, {
                name: "parent"
            }, {
                name: "inactive"
            } ]
        }, a));
    }
}), jun.rztPahChartTypes = new jun.PahChartTypesstore();