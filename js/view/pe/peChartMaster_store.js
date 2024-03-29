jun.PeChartMasterstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeChartMasterstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeChartMasterStoreId",
            url: "PondokEfata/PeChartMaster/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "account_code"
            }, {
                name: "account_code2"
            }, {
                name: "account_name"
            }, {
                name: "account_type"
            }, {
                name: "inactive"
            }, {
                name: "description"
            } ]
        }, a));
    },
    FilterData: function() {
        this.filter([ {
            property: "inactive",
            value: "0"
        } ]);
    }
}), jun.rztPeChartMaster = new jun.PeChartMasterstore();