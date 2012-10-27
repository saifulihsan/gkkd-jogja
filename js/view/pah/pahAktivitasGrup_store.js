jun.PahAktivitasGrupstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PahAktivitasGrupstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PahAktivitasGrupStoreId',
            url:'PondokHarapan/PahAktivitasGrup/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'name'},
                {name:'notes'},
                {name:'inactive'},
            ]
        }, cfg));
    },
    FilterData:function () {
        this.filter([
            {
                property:'inactive',
                value:'0'
            },
        ]);
    }
});
jun.rztPahAktivitasGrup = new jun.PahAktivitasGrupstore();
//jun.rztPahAktivitasGrup.load();
