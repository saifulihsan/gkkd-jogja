jun.PahSysstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahSysstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahSysStoreId",
            url: "PondokHarapan/PahSys/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "name"
            }, {
                name: "value"
            } ]
        }, a));
    }
}), jun.rztPahSys = new jun.PahSysstore();