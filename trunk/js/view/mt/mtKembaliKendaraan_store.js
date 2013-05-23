jun.MtKembaliKendaraanstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtKembaliKendaraanstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtKembaliKendaraanStoreId',
            url: 'Mahkotrans/MtKembaliKendaraan/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id_kembali'},
{name:'id_pinjam'},
{name:'trans_date'},
{name:'tgl_kembali'},
{name:'jam_kembali'},
{name:'extend_bln'},
{name:'extend_hari'},
{name:'extend_jam'},
{name:'overtime_jam'},
{name:'pelunasan'},
{name:'ongkos_sewa'},
{name:'ongkos_driver'},
{name:'ongkos_bbm'},
{name:'total_ongkos'},
{name:'dp'},
{name:'sisa_tagihan'},
{name:'disc'},
{name:'total'},
                
            ]
        }, cfg));
    }
});
jun.rztMtKembaliKendaraan = new jun.MtKembaliKendaraanstore();
//jun.rztMtKembaliKendaraan.load();
