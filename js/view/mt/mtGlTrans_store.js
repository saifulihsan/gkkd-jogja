jun.MtGlTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtGlTransstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtGlTransStoreId',
            url:'Mahkotrans/MtGlTrans/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'counter'},
                {name:'type'},
                {name:'type_no'},
                {name:'tran_date'},
                {name:'account'},
                {name:'memo_'},
                {name:'amount'},
                {name:'users_id'},
            ]
        }, cfg));
    }
});
jun.rztMtGlTrans = new jun.MtGlTransstore();
//jun.rztMtGlTrans.load();
