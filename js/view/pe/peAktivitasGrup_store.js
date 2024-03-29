jun.PeAktivitasGrupstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PeAktivitasGrupstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PeAktivitasGrupStoreId",
            url: "PondokEfata/PeAktivitasGrup/?output=json",
            root: "results",
            totalProperty: "total",
            fields: [ {
                name: "id"
            }, {
                name: "name"
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
}), jun.rztPeAktivitasGrup = new jun.PeAktivitasGrupstore();