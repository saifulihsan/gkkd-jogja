jun.MtAnggaranDetilstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.MtAnggaranDetilstore.superclass.constructor.call(this, Ext.apply({
            storeId:'MtAnggaranDetilStoreId',
            //url: 'Mahkotrans/MtAnggaranDetil/?output=json',
            autoLoad:false,
            autoSave:false,
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'mt_anggaran_id'},
                {name:'amount', type:'float'},
                {name:'mt_chart_master_account_code'},
            ]
        }, cfg));
    },
    refreshData:function () {
        Ext.getCmp('totalangsudid').setValue(this.sum('amount'));
        Ext.get('totalangsudid').focus();
        Ext.getCmp('totalangblmid').setValue(Ext.getCmp('totalangid').getValue() - this.sum('amount'));
        Ext.get('totalangblmid').focus();
        Ext.get('doc_refid').focus();
    },
});
jun.rztMtAnggaranDetil = new jun.MtAnggaranDetilstore();
//jun.rztMtAnggaranDetil.load();
