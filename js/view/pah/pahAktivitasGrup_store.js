jun.PahAktivitasGrupstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(a) {
        a = a || {}, jun.PahAktivitasGrupstore.superclass.constructor.call(this, Ext.apply({
            storeId: "PahAktivitasGrupStoreId",
            url: "PondokHarapan/PahAktivitasGrup/?output=json",
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
}), jun.rztPahAktivitasGrup = new jun.PahAktivitasGrupstore();