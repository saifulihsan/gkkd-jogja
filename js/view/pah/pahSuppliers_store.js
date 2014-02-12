jun.PahSuppliersstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahSuppliersstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahSuppliersStoreId",
            url: "PondokHarapan/PahSuppliers/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "supplier_id"
            }, {
                name: "supp_name"
            }, {
                name: "supp_ref"
            }, {
                name: "address"
            }, {
                name: "mail_address"
            }, {
                name: "gst_no"
            }, {
                name: "contact"
            }, {
                name: "supp_account_no"
            }, {
                name: "website"
            }, {
                name: "bank_account"
            }, {
                name: "curr_code"
            }, {
                name: "payment_terms"
            }, {
                name: "credit_limit"
            }, {
                name: "purchase_account"
            }, {
                name: "payable_account"
            }, {
                name: "payment_discount_account"
            }, {
                name: "notes"
            }, {
                name: "inactive"
            } ]
        }, a));
    },
    FilterData: function() {
        this.filter([ {
            property: "inactive",
            value: "0"
        } ]);
    }
}), jun.rztPahSuppliers = new jun.PahSuppliersstore();