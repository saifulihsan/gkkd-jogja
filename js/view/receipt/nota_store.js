jun.Notastore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.Notastore.superclass.constructor.call(this, Ext.apply({
            storeId: 'NotaStoreId',
            url: 'user/Nota/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'nota_id'},
{name:'sales_id'},
{name:'term'},
{name:'warehouse'},
{name:'status'},
{name:'currency'},
{name:'notes'},
{name:'rate'},
{name:'doc_date'},
{name:'doc_ref'},
{name:'customer_id'},
{name:'trans_date'},
{name:'total_1'},
{name:'disc'},
{name:'total_2'},
                
            ]
        }, cfg));
    }
});
jun.rztNota = new jun.Notastore();
jun.rztNota.load();
