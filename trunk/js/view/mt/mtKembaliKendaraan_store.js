jun.MtKembaliKendaraanstore = Ext.extend(Ext.data.JsonStore, {
    constructor: function(cfg) {
        cfg = cfg || {};
        jun.MtKembaliKendaraanstore.superclass.constructor.call(this, Ext.apply({
            storeId: 'MtKembaliKendaraanStoreId',
            url: 'Mahkotrans/MtKembaliKendaraan/?output=json',
            root: 'results',
            totalProperty: 'total',
            fields: [
                {name: 'id_kembali'},
                {name: 'id_pinjam'},
                {name: 'trans_date'},
                {name: 'tgl_kembali'},
                {name: 'extend_bln'},
                {name: 'extend_hari'},
                {name: 'extend_jam'},
                {name: 'overtime_jam'},
                {name: 'pelunasan'},
                {name: 'ongkos_sewa'},
                {name: 'ongkos_driver'},
                {name: 'ongkos_bbm'},
                {name: 'total_ongkos'},
                {name: 'dp'},
                {name: 'disc'},
                {name: 'total'},
                {name: 'users_id'},
                {name: 'trans_via'},
                {name: 'no_bukti_bayar'},
                {name: 'notes'},
                {name: 'is_void'},
                {name: 'ongkos_extend'},
                {name: 'entry_time'},
                {name: 'doc_ref_kembali'},
            ]
        }, cfg));
    }
});
jun.rztMtKembaliKendaraan = new jun.MtKembaliKendaraanstore();
//jun.rztMtKembaliKendaraan.load();
