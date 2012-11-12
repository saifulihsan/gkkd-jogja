jun.PeSubAktivitasstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeSubAktivitasstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeSubAktivitasStoreId',
            url:'PondokEfata/PeSubAktivitas/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'nama'},
                {name:'desc_'},
                {name:'account_code'},
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
jun.rztPeSubAktivitas = new jun.PeSubAktivitasstore();
//jun.rztPeSubAktivitas.load();
