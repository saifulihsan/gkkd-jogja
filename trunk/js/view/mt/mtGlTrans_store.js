jun.MtGlTransstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtGlTransstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtGlTransStoreId',
//            url:'Mahkotrans/MtGlTrans/?output=json',
            autoLoad: false,
            autoSave: false,
            root: 'results',
            totalProperty: 'total',
            fields: [
                {name: 'counter'},
//                {name:'type'},
//                {name:'type_no'},
//                {name:'tran_date'},
                {name: 'account'},
//                {name:'memo_'},
                {name: 'debit', type: 'float'},
                {name: 'kredit', type: 'float'},
            ]
        }, cfg));
    },
    refreshData: function() {
        Ext.getCmp('tot_debit_id').setValue(this.sum('debit'));
        Ext.getCmp('tot_kredit_id').setValue(this.sum('kredit'));
//        Ext.getCmp('totalangsudid').setValue(this.sum('amount'));
//        Ext.get('totalangsudid').focus();
//        Ext.getCmp('totalangblmid').setValue(Ext.getCmp('totalangid').getValue() - this.sum('amount'));
//        Ext.get('totalangblmid').focus();
//        Ext.get('doc_refid').focus();
    },
});
jun.rztMtGlTrans = new jun.MtGlTransstore();
//jun.rztMtGlTrans.load();
