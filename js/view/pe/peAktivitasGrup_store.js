jun.PeAktivitasGrupstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeAktivitasGrupstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeAktivitasGrupStoreId',
            url:'PondokEfata/PeAktivitasGrup/?output=json',
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
jun.rztPeAktivitasGrup = new jun.PeAktivitasGrupstore();
//jun.rztPeAktivitasGrup.load();
