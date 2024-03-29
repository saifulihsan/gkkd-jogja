jun.PeGlTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeGlTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeGlTransStoreId",
            url: "PondokEfata/PeGlTrans/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "counter"
            }, {
                name: "type"
            }, {
                name: "type_no"
            }, {
                name: "tran_date"
            }, {
                name: "account"
            }, {
                name: "memo_"
            }, {
                name: "amount"
            }, {
                name: "users_id"
            } ]
        }, a));
    }
}), jun.rztPeGlTrans = new jun.PeGlTransstore();