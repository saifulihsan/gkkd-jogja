jun.PeSysPrefsstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeSysPrefsstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeSysPrefsStoreId",
            url: "PondokEfata/PeSysPrefs/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "name"
            }, {
                name: "value"
            } ]
        }, a));
    }
}), jun.rztPeSysPrefs = new jun.PeSysPrefsstore();