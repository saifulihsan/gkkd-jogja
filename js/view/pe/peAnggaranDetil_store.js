jun.PeAnggaranDetilstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PeAnggaranDetilstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PeAnggaranDetilStoreId',
            url:'PondokEfata/PeAnggaranDetil/?output=json',
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'anggaran_id'},
                {name:'amount', type:'float'},
                {name:'account_code'},
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
jun.rztPeAnggaranDetil = new jun.PeAnggaranDetilstore();
//jun.rztPeAnggaranDetil.load();
