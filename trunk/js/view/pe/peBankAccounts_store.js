jun.PeBankAccountsstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeBankAccountsstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeBankAccountsStoreId",
            url: "PondokEfata/PeBankAccounts/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "account_code"
            }, {
                name: "account_type"
            }, {
                name: "bank_account_name"
            }, {
                name: "bank_account_number"
            }, {
                name: "bank_name"
            }, {
                name: "bank_address"
            }, {
                name: "bank_curr_code"
            }, {
                name: "dflt_curr_act"
            }, {
                name: "ending_reconcile_balance"
            }, {
                name: "inactive"
            }, {
                name: "bank_phone"
            }, {
                name: "atas_nama"
            } ]
        }, a));
    },
    FilterData: function() {
        this.filter([ {
            property: "inactive",
            value: "0"
        } ]);
    }
}), jun.rztPeBankAccounts = new jun.PeBankAccountsstore();