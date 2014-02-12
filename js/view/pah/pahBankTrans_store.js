jun.PahBankTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahBankTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahBankTransStoreId",
            url: "PondokHarapan/PahBankTrans/?output=json",
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
}), jun.rztPahBankTrans = new jun.PahBankTransstore();