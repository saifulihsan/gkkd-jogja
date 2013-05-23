jun.MtPinjamKendaraanstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtPinjamKendaraanstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtPinjamKendaraanStoreId',
            url: 'Mahkotrans/MtPinjamKendaraan/?output=json',           
            root: 'results',
            totalProperty: 'total',
            fields: [                
                {name:'id_pinjam'},
{name:'doc_ref'},
{name:'entry_time'},
{name:'trans_date'},
{name:'tanda_pengenal'},
{name:'no_identitas'},
{name:'jaminan'},
{name:'jaminan_desc'},
{name:'id_pelanggan'},
{name:'id_kelompok'},
{name:'tgl_pinjam'},
{name:'jam_pinjam'},
{name:'season'},
{name:'sewa_bln'},
{name:'sewa_hari'},
{name:'sewa_jam'},
{name:'driver'},
{name:'bbm'},
{name:'cara_bayar'},
{name:'no_bukti_bayar'},
{name:'id_driver'},
{name:'id_mobil'},
{name:'ongkos_sewa'},
{name:'ongkos_driver'},
{name:'ongkos_bbm'},
{name:'total_ongkos'},
{name:'dp'},
{name:'sisa_tagihan'},
{name:'disc'},
{name:'total'},
{name:'tgl_rencana_kembali'},
{name:'jam_rencana_kembali'},
                
            ]
        }, cfg));
    }
});
jun.rztMtPinjamKendaraan = new jun.MtPinjamKendaraanstore();
//jun.rztMtPinjamKendaraan.load();
