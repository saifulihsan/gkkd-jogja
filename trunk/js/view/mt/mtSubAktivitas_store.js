jun.MtSubAktivitasstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtSubAktivitasstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtSubAktivitasStoreId',
            url:'Mahkotrans/MtSubAktivitas/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'nama'},
                {name:'desc'},
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
jun.rztMtSubAktivitas = new jun.MtSubAktivitasstore();
