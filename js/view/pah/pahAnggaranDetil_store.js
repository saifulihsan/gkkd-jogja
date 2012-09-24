jun.PahAnggaranDetilstore = Ext.extend(Ext.data.JsonStore, {
    constructor:function (cfg) {
        cfg = cfg || {};
        jun.PahAnggaranDetilstore.superclass.constructor.call(this, Ext.apply({
            storeId:'PahAnggaranDetilStoreId',
            //url: 'PondokHarapan/PahAnggaranDetil/?output=json',
//            autoLoad:false,
//            autoSave: false,
            root:'results',
            totalProperty:'total',
            fields:[
                {name:'id'},
                {name:'pah_anggaran_id'},
                {name:'amount'},
                {name:'pah_chart_master_account_code'},

            ]
        }, cfg));
    },
    refreshData: function(){
        Ext.get('totalangsudid').set({value:this.sum('amount')});
        Ext.get('totalangsudid').focus();
        Ext.get('doc_refid').focus();
    },
});
jun.rztPahAnggaranDetil = new jun.PahAnggaranDetilstore();
//jun.rztPahAnggaranDetil.load();
