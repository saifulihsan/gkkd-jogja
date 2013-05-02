jun.MtAktivitasGrupstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtAktivitasGrupstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtAktivitasGrupStoreId',
            url:'Mahkotrans/MtAktivitasGrup/?output=json',
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
jun.rztMtAktivitasGrup = new jun.MtAktivitasGrupstore();
//jun.rztMtAktivitasGrup.load();
