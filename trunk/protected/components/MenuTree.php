<?php

class MenuTree {

    var $security_role;
    var $menu_data_jemaat = "{text: 'Data Jemaat',
                                id: 'jun.JemaatGrid',
                                leaf: true
                                },";
    var $menu_users = "{text: 'Manajemen User',
                                id: 'jun.UsersGrid',
                                leaf: true
                                },";
    var $security = "{text: 'Security Role',
                                id: 'jun.SecurityRolesWin',
                                leaf: true
                                },";

    function __construct($id) {
        //$this->security_role_id = $id;
        $role = SecurityRoles::model()->findByPk($id);
        $this->security_role = explode(",", $role->sections);
    }

    function get_menu_mahkotrans() {
        $menu = "{text: 'Mahkotrans',
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
                            text: 'Kelompok Pelanggan',
                            id: 'jun.MtKelompokPelangganGrid',
                            leaf: true
                        },
                        {
                            text: 'Pelanggan',
                            id: 'jun.MtPelangganGrid',
                            leaf: true
                        },
                        {
                            text: 'Kode Rekening',
                            id: 'jun.MtChartMasterGrid',
                            leaf: true
                        },
                        {
                            text: 'Kas dan Bank',
                            id: 'jun.MtBankAccountsGrid',
                            leaf: true
                        },
                        {
                            text: 'Mobil',
                            id: 'jun.MtMobilGrid',
                            leaf: true
                        },
                        {
                            text: 'Driver',
                            id: 'jun.MtDriverGrid',
                            leaf: true
                        },

                        ]
                    },
                    {
                    text: 'Transaksi',
                    expanded: false,
                    children:[{
                            text: 'Sewa Kendaraan',
                            id: 'jun.MtPinjamKendaraanGrid',
                            leaf: true
                        },                        
                        {
                            text: 'Kas Masuk',
                            id: 'jun.MtKasMasukGrid',
                            leaf: true
                        },
                        {
                            text: 'Kas Keluar',
                            id: 'jun.MtKasKeluarGrid',
                            leaf: true
                        },
                        {
                            text: 'Mutasi antar Rekening Kas',
                            id: 'jun.MtTranferBankWin',
                            leaf: true
                        },
                        {
                            text: 'Jurnal Umum',
                            id: 'jun.MtGlTransWin',
                            leaf: true
                        },";
        $menu .= in_array(ADMINISTRATOR, $this->security_role) ? "
                        {
                            text: 'Set Saldo Awal',
                            id: 'jun.MtSaldoAwalWin',
                            leaf: true
                        }," : '';
        $menu .= "
                        ]
                    },
                    {
                    text: 'Laporan',
                    expanded: false,
                    children:[
                        {
                            text: 'Mutasi Kas per Bank',
                            id: 'jun.MtBankTransGrid',
                            leaf: true
                        },
                        {
                            text: 'Pendapatan',
                            id: 'jun.MtReportPendapatanWin',
                            leaf:true
                        },
                        {
                            text: 'Pengeluaran',
                            id: 'jun.MtReportPengeluaranWin',
                            leaf: true
                        },
                        {
                            text: 'Pengeluaran Detil',
                            id: 'jun.MtReportPengeluaranDetilWin',
                            leaf: true
                        },]
                    },
                    ]
                  },";
        return $menu;
    }

    function get_menu_pondok_harapan() {
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
                            text: 'Penghuni Pondok',
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
                        },  ";
        $menu .= in_array(ADMINISTRATOR, $this->security_role) ? "
                        {
                            text: 'Set Saldo Awal',
                            id: 'jun.PahSaldoAwalWin',
                            leaf: true
                        }," : '';
        $menu .= "
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
                            text: 'Pengeluaran Detil',
                            id: 'jun.PahReportPengeluaranDetilWin',
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

    function get_menu_pondok_efata() {
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
                        },  ";
        $menu .= in_array(ADMINISTRATOR, $this->security_role) ? "{
                            text: 'Set Saldo Awal',
                            id: 'jun.PeSaldoAwalWin',
                            leaf: true
                        }," : '';
        $menu .= "
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
                            text: 'Pengeluaran Detil',
                            id: 'jun.PeReportPengeluaranDetilWin',
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

    function get_menu_general() {
        $menu = "{text: 'Administrasi',
                  expanded: false,
                  children:[
                  $this->menu_data_jemaat
                  $this->menu_users
                  ]},";
        return $menu;
    }

    public function get_menu() {
        $username = Yii::app()->user->name;
        $data = "[";
        $data .= in_array(PONDOKHARAPAN, $this->security_role) ? $this->get_menu_pondok_harapan() : '';
        $data .= in_array(PONDOKEFATA, $this->security_role) ? $this->get_menu_pondok_efata() : '';
        $data .= in_array(MAHKOTRANS, $this->security_role) ? $this->get_menu_mahkotrans() : '';
        $data .= in_array(ADMINISTRATOR, $this->security_role) ? $this->get_menu_general() : '';
        $data .= "{
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
