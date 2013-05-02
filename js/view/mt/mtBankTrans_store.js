jun.MtBankTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtBankTransstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtBankTransStoreId',
            url:'Mahkotrans/MtBankTrans/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'type'},
                {name:'trans_no'},
                {name:'bank_act'},
                {name:'ref'},
                {name:'trans_date'},
                {name:'amount'},
                {name:'reconciled'},
                {name:'users_id'},
            ]
        }, cfg));
    }
});
jun.rztMtBankTrans = new jun.MtBankTransstore();
//jun.rztMtBankTrans.load();
