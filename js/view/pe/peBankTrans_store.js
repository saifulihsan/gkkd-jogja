jun.PeBankTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeBankTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeBankTransStoreId",
            url: "PondokEfata/PeBankTrans/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "type"
            }, {
                name: "trans_no"
            }, {
                name: "bank_act"
            }, {
                name: "ref"
            }, {
                name: "trans_date"
            }, {
                name: "amount"
            }, {
                name: "reconciled"
            }, {
                name: "users_id"
            } ]
        }, a));
    }
}), jun.rztPeBankTrans = new jun.PeBankTransstore();