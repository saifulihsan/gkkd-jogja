jun.NotaDtlstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.NotaDtlstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'NotaDtlStoreId',
            url: 'user/NotaDtl/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'nota_dtl_id'},
{name:'nota_id'},
{name:'barang_id'},
{name:'jml'},
{name:'harga_satuan'},
{name:'total_harga_1'},
{name:'disc_per'},
{name:'disc_rp'},
{name:'total_harga_2'},
                
            ]
        }, cfg));
    }
});
jun.rztNotaDtl = new jun.NotaDtlstore();
jun.rztNotaDtl.load();

jun.NotaDtlReader = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.NotaDtlReader.superclass.constructor.call(this, Ext.apply({
            storeId: 'NotaDtlReaderId',
            //url: 'user/NotaDtl/view/?output=json',
            root: 'results',
            totalProperty: 'total',
            autoLoad:false,
            fields: [
                {name:'nota_dtl_id'},
                {name:'nota_id'},
                {name:'barang_id'},
                {name:'jml'},
                {name:'harga_satuan'},
                {name:'total_harga_1'},
                {name:'disc_per'},
                {name:'disc_rp'},
                {name:'total_harga_2'},

            ]
        }, cfg));
    }
});
//jun.rztNotaDtl = new jun.NotaDtlstore();
//jun.rztNotaDtl.load();
