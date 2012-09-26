<?php
/**
 * Created by JetBrains PhpStorm.
 * User: axioo
 * Date: 9/12/12
 * Time: 11:15 AM
 * To change this template use File | Settings | File Templates.
 */
class MenuTree
{
    var $security_role_id;
    var $menu_data_jemaat = "{text: 'Data Jemaat',
                                id: 'jun.JemaatGrid',
                                leaf: true
                                },";
    var $menu_users= "{text: 'User',
                                id: 'jun.UsersGrid',
                                leaf: true
                                },";

    function __construct($id){
        $this->security_role_id = $id;
    }

    function get_menu_pondok_harapan(){
        $menu = "{text: 'Pondok Asuh Harapan',
                  expanded: false,
                  children:[{
                    text: 'File',
                    expanded: false,
                    children:[{
                            text: 'Eksport',
                            id: 'jun.NotaGrid',
                            leaf: true
                        },
                        {
                            text: 'Import',
                            id: 'jun.NotaGrid',
                            leaf: true
                        }]
                    },
                    {
                    text: 'Master',
                    expanded: false,
                    children:[{
                            text: 'Kode Rekening',
                            id: 'jun.PahChartMasterGrid',
                            leaf: true
                        },
                        {
                            text: 'Kas dan Bank',
                            id: 'jun.PahBankAccountsGrid',
                            leaf: true
                        },
                        {
                            text: 'Anak',
                            id: 'jun.PahMemberGrid',
                            leaf: true
                        },
                        {
                            text: 'Pemasok',
                            id: 'jun.PahSuppliersGrid',
                            leaf: true
                        },
                        {
                            text: 'Donatur',
                            id: 'jun.PahDonaturGrid',
                            leaf: true
                        },
                        {
                            text: 'Pengelola',
                            id: 'jun.NotaGrid',
                            leaf: true
                        },
                        {
                            text: 'Sub Aktivitas',
                            id: 'jun.PahSubAktivitasGrid',
                            leaf: true
                        },]
                    },
                    {
                    text: 'Transaksi',
                    expanded: false,
                    children:[{
                            text: 'Kas Masuk',
                            id: 'jun.PahKasMasukGrid',
                            leaf: true
                        },
                        {
                            text: 'Anggaran',
                            id: 'jun.PahAnggaranGrid',
                            leaf: true
                        },
                        {
                            text: 'Pengeluaran Kas Umum',
                            id: 'jun.PahKasKeluarGrid',
                            leaf: true
                        },
                        {
                            text: 'Aktivitas Anak',
                            id: 'jun.PahAktivitasGrid',
                            leaf: true
                        },
                        {
                            text: 'Mutasi antar Rekening Kas',
                            id: 'jun.PahTranferBankWin',
                            leaf: true
                        },]
                    },
                    {
                    text: 'Report',
                    expanded: false,
                    children:[{
                            text: 'Mutasi Kas per Bank',
                            id: 'jun.PahBankTransGrid',
                            leaf: true
                        },
                        {
                            text: 'Laporan Pertanggungjawaban',
                            id: 'jun.NotaGrid',
                            leaf: true
                        },
                        {
                            text: 'Anggaran versus Realisasi',
                            id: 'jun.NotaGrid',
                            leaf: true
                        },
                        {
                            text: 'Pengeluaran per Kode Rekening',
                            id: 'jun.NotaGrid',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas per Bulan',
                            id: 'jun.NotaGrid',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas per Anak',
                            id: 'jun.NotaGrid',
                            leaf: true
                        }]
                    },
                    {
                            text: 'Setting',
                            id: 'jun.PahSysGrid',
                            leaf: true
                        },
                    ]
                  }";
        return $menu;
    }

    function get_menu_pondok_efata(){
        $menu = "{text: 'Pondok Asuh Efata',
                  expanded: false,
                  children:[{
                    text: 'Faktur Penjualan',
                    id: 'jun.NotaGrid',
                    leaf: true
                    }]
                  }";
        return $menu;
    }

    function get_menu_general(){
        $menu = $this->menu_data_jemaat.$this->menu_users;
        return $menu;
    }

    public function get_menu(){
        $data = "[".$this->get_menu_pondok_harapan().','.$this->get_menu_pondok_efata().','.$this->get_menu_general()
            ."]";
        return $data;
    }
}
