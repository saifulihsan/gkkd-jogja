<?php

class MenuTree
{
    var $security_role_id;
    var $menu_data_jemaat = "{text: 'Data Jemaat',
                                id: 'jun.JemaatGrid',
                                leaf: true
                                },";
    var $menu_users = "{text: 'Manajemen User',
                                id: 'jun.UsersGrid',
                                leaf: true
                                },";

    function __construct($id)
    {
        $this->security_role_id = $id;
    }

    function get_menu_pondok_harapan()
    {
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
                            text: 'Grup Anak',
                            id: 'jun.PahAktivitasGrupGrid',
                            leaf: true
                        },
                        {
                            text: 'Pemasok',
                            id: 'jun.PahSuppliersGrid',
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
                            text: 'Aktivitas Grup Anak',
                            id: 'jun.PahAktivitasGrupTransGrid',
                            leaf: true
                        },
                        {
                            text: 'Mutasi antar Rekening Kas',
                            id: 'jun.PahTranferBankWin',
                            leaf: true
                        },
                        {
                            text: 'Donasi Non Tunai',
                            id: 'jun.PahLampiranGrid',
                            leaf: true
                        },
                        {
                            text: 'Set Saldo Awal',
                            id: 'jun.PahSaldoAwalWin',
                            leaf: true
                        },
                        ]
                    },
                    {
                    text: 'Laporan',
                    expanded: false,
                    children:[
                        {
                            text: 'Mutasi Kas per Bank',
                            id: 'jun.PahBankTransGrid',
                            leaf: true
                        },                        
                        {
                            text: 'Pertanggungjawaban',
                            id: 'jun.PahReportTanggungJawabWin',
                            leaf: true
                        },
                        {
                            text: 'Anggaran versus Realisasi',
                            id: 'jun.PahReportAnggaranRealisasiWin',
                            leaf: true
                        },
                        {
                            text: 'Pendapatan',
                            id: 'jun.PahReportPendapatanWin',
                            leaf:true
                        },
                        {
                            text: 'Pengeluaran',
                            id: 'jun.PahReportPengeluaranWin',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas',
                            id: 'jun.PahReportBebanAktivitasWin',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas per Anak',
                            id: 'jun.PahReportBebanAktivitasAnakWin ',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas per Grup',
                            id: 'jun.PahReportBebanAktivitasGrupWin',
                            leaf: true
                        },
                        {
                            text: 'Lampiran Donasi Non Tunai',
                            id: 'jun.PahReportLampiranWin',
                            leaf: true
                        }]
                    },
                    ]
                  },";
        return $menu;
    }

    function get_menu_pondok_efata()
    {
        $menu = "{text: 'Pondok Efata',
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
                            id: 'jun.PeChartMasterGrid',
                            leaf: true
                        },
                        {
                            text: 'Kas dan Bank',
                            id: 'jun.PeBankAccountsGrid',
                            leaf: true
                        },
                        {
                            text: 'Anggota',
                            id: 'jun.PeMemberGrid',
                            leaf: true
                        },
                        {
                            text: 'Grup Anggota',
                            id: 'jun.PeAktivitasGrupGrid',
                            leaf: true
                        },
                        {
                            text: 'Pemasok',
                            id: 'jun.PeSuppliersGrid',
                            leaf: true
                        },
                        {
                            text: 'Sub Aktivitas',
                            id: 'jun.PeSubAktivitasGrid',
                            leaf: true
                        },]
                    },
                    {
                    text: 'Transaksi',
                    expanded: false,
                    children:[{
                            text: 'Kas Masuk',
                            id: 'jun.PeKasMasukGrid',
                            leaf: true
                        },
                        {
                            text: 'Anggaran',
                            id: 'jun.PeAnggaranGrid',
                            leaf: true
                        },
                        {
                            text: 'Pengeluaran Kas Umum',
                            id: 'jun.PeKasKeluarGrid',
                            leaf: true
                        },
                        {
                            text: 'Aktivitas Anggota',
                            id: 'jun.PeAktivitasGrid',
                            leaf: true
                        },
                        {
                            text: 'Aktivitas Grup Anggota',
                            id: 'jun.PeAktivitasGrupTransGrid',
                            leaf: true
                        },
                        {
                            text: 'Mutasi antar Rekening Kas',
                            id: 'jun.PeTranferBankWin',
                            leaf: true
                        },
                        {
                            text: 'Donasi Non Tunai',
                            id: 'jun.PeLampiranGrid',
                            leaf: true
                        },
                        {
                            text: 'Set Saldo Awal',
                            id: 'jun.PeSaldoAwalWin',
                            leaf: true
                        },
                        ]
                    },
                    {
                    text: 'Laporan',
                    expanded: false,
                    children:[
                        {
                            text: 'Mutasi Kas per Bank',
                            id: 'jun.PeBankTransGrid',
                            leaf: true
                        },
                        {
                            text: 'Pertanggungjawaban',
                            id: 'jun.PeReportTanggungJawabWin',
                            leaf: true
                        },
                        {
                            text: 'Anggaran versus Realisasi',
                            id: 'jun.PeReportAnggaranRealisasiWin',
                            leaf: true
                        },
                        {
                            text: 'Pendapatan',
                            id: 'jun.PeReportPendapatanWin',
                            leaf:true
                        },
                        {
                            text: 'Pengeluaran',
                            id: 'jun.PeReportPengeluaranWin',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas',
                            id: 'jun.PeReportBebanAktivitasWin',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas per Anggota',
                            id: 'jun.PeReportBebanAktivitasAnakWin ',
                            leaf: true
                        },
                        {
                            text: 'Beban Aktivitas per Grup',
                            id: 'jun.PeReportBebanAktivitasGrupWin',
                            leaf: true
                        },
                        {
                            text: 'Lampiran Donasi Non Tunai',
                            id: 'jun.PeReportLampiranWin',
                            leaf: true
                        }]
                    },
                    ]
                  },";
        return $menu;
    }

    function get_menu_general()
    {
        $menu = "{text: 'Administrasi',
                  expanded: false,
                  children:[
                  $this->menu_data_jemaat
                  $this->menu_users
                  ]},";
        return $menu;
    }

    public function get_menu()
    {
        $username = Yii::app()->user->name;
        $data = "[" . $this->get_menu_pondok_harapan() .
            $this->get_menu_pondok_efata() .
            $this->get_menu_general() .
            "{
                text: 'Ganti Password',
                id: 'jun.PasswordWin',
                leaf: true
              },
            {
                text: 'Logout ($username)',
                id: 'logout',
                leaf: true
              }]";
        return $data;
    }
}