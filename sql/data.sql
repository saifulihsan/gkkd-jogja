-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.16 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             8.0.0.4396
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- Dumping data for table gkkd.jemaat: ~32 rows (approximately)
/*!40000 ALTER TABLE `jemaat` DISABLE KEYS */;
REPLACE INTO `jemaat` (`nij`, `real_name`, `phone`, `email`, `inactive`, `alamat`, `gender`, `birthdate`, `education`, `hometown`) VALUES
	('0', 'Administrator', '', NULL, 0, NULL, 'M', NULL, NULL, NULL),
	('1', 'Stephanus Nove Anando', '088215173200', 'novebeta@gmail.com', 0, 'Perum Tirta Kirana B6 Nologaten', 'M', NULL, NULL, NULL),
	('10', 'Nexson Beny Karoba', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('11', 'Nomince Karoba', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('12', 'Yalince Karoba', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('13', 'Farida Wonda', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('14', 'Yupi Wonda', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('15', 'Anison Soni Kokoya', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('16', 'Dimas Fajar', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('17', 'Jovan Yordani Geley', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('18', 'Nisha Gracia Mashadi', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('19', 'Magda Alince Kogoya', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('2', 'Amelia Beta', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('20', 'Sadat Ardiansyah', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('21', 'Alisha Larasati', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('22', 'Andi Okiano', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('23', 'Lusyana Cristyanti', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('24', 'Frengki Amos', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('25', 'Rinto', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('26', 'Dita Martiana', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('27', 'Anatasia', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('28', 'Cecep Budi Utomo', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('29', 'Margaretha Suryatmi', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('3', 'Andrew Cristyanto', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('30', 'Sugeng Triyono', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('31', 'Lilis Setiawati', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('4', 'Amarissa Renaya', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('5', 'Anance Kogoya', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('6', 'Werlince Womda', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('7', 'Devy Elyvani', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('8', 'Keni Junus Karoba', '-', '-', 0, '-', 'M', NULL, NULL, NULL),
	('9', 'Rikson Karoba', '-', '-', 0, '-', 'M', NULL, NULL, NULL);
/*!40000 ALTER TABLE `jemaat` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_bank_accounts: ~2 rows (approximately)
/*!40000 ALTER TABLE `mt_bank_accounts` DISABLE KEYS */;
REPLACE INTO `mt_bank_accounts` (`id`, `account_code`, `account_type`, `bank_account_name`, `bank_account_number`, `bank_name`, `bank_address`, `inactive`, `bank_phone`, `atas_nama`) VALUES
	(2, '1110', 0, 'Kas di Tangan', '-', '-', '-', b'00000000', '-', '-'),
	(3, '1120', 0, 'Kas di Bank', '-', '-', '-', b'00000000', '-', '-');
/*!40000 ALTER TABLE `mt_bank_accounts` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_bank_trans: ~1 rows (approximately)
/*!40000 ALTER TABLE `mt_bank_trans` DISABLE KEYS */;
REPLACE INTO `mt_bank_trans` (`id`, `type`, `trans_no`, `bank_act`, `ref`, `trans_date`, `amount`, `users_id`) VALUES
	(28, 0, 3, 2, 'MTKM00000004', '2013-07-01', 50000, 1);
/*!40000 ALTER TABLE `mt_bank_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_chart_class: ~4 rows (approximately)
/*!40000 ALTER TABLE `mt_chart_class` DISABLE KEYS */;
REPLACE INTO `mt_chart_class` (`cid`, `class_name`, `ctype`, `inactive`) VALUES
	('1', 'Harta', 1, b'10000000'),
	('2', 'Kewajiban', 2, b'10000000'),
	('3', 'Pendapatan', 4, b'10000000'),
	('4', 'Pengeluaran', 6, b'10000000');
/*!40000 ALTER TABLE `mt_chart_class` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_chart_master: ~35 rows (approximately)
/*!40000 ALTER TABLE `mt_chart_master` DISABLE KEYS */;
REPLACE INTO `mt_chart_master` (`account_code`, `account_code2`, `account_name`, `account_type`, `inactive`, `description`) VALUES
	('1000 ', '', 'Aset', '7', b'00000000', '-'),
	('1100', '', 'Aset Lancar', '7', b'00000000', '-'),
	('1110', '', 'Kas di Tangan', '1', b'00000000', '-'),
	('1120', '', 'Kas di bank', '1', b'00000000', '-'),
	('1130', '', 'Piutang', '7', b'00000000', '-'),
	('1140', '', 'Uang muka', '7', b'00000000', '-'),
	('1150', '', 'Bahan habis pakai', '7', b'00000000', '-'),
	('1300', '', 'Aset Tetap', '7', b'00000000', '-'),
	('1310', '', 'Kendaraan', '7', b'00000000', '-'),
	('1311', '', 'Mobil', '7', b'00000000', '-'),
	('1312', '', 'Akumulasi depresiasi mobil', '7', b'00000000', '-'),
	('1320', '', 'Perabot kantor', '7', b'00000000', '-'),
	('1322', '', 'Akumulasi depresiasi perabot', '5', b'00000000', '-'),
	('2000', '', 'Utang', '5', b'00000000', '-'),
	('2100', '', 'Utang Lancar', '5', b'00000000', '-'),
	('2300', '', 'Utang Jangka Panjang', '5', b'00000000', '-'),
	('3000', '', 'Modal', '5', b'00000000', '-'),
	('3100', '', 'Modal Disetor', '5', b'00000000', '-'),
	('3200', '', 'Laba Ditahan', '7', b'00000000', '-'),
	('3300', '', 'Laba Tahun Ini', '7', b'00000000', '-'),
	('4000', '', 'Pendapatan', '7', b'00000000', '-'),
	('4100', '', 'Pendapatan Sewa', '7', b'00000000', '-'),
	('4200', '', 'Potongan atau Diskon', '7', b'00000000', '-'),
	('4300', '', 'Pendapatan Denda', '7', b'00000000', '-'),
	('4400', '', 'Pendapatan Lain-lain', '7', b'00000000', '-'),
	('5000', '', 'Beban', '5', b'00000000', '-'),
	('5100', '', 'Beban gaji dan upah', '5', b'00000000', 'Gaji dan upah karyawan mahkotrans, termasuk tunjangan, bonus dan lain sebagainya.'),
	('5200', '', 'Beban ongkos Driver', '5', b'00000000', '-'),
	('5300', '', 'Bensin', '5', b'00000000', '-'),
	('5400', '', 'Beban Pemeliharaan Kendaraan', '5', b'00000000', 'Ongkos perawatan rutin dan tidak rutin kendaraan, tambal ban, pembayaran asuransi dan lain sebagainya'),
	('5500', '', 'Beban depresiasi kendaraan', '5', b'00000000', '-'),
	('5600', '', 'Beban Administrasi Kantor', '5', b'00000000', 'Pembelian bahan habis pakai (kertas, tinta, alat tulis), pulsa telepon, pulsa internet, beban listrik kantor, dan lain sebagainya'),
	('5700', '', 'Beban depresiasi perabot kantor', '5', b'00000000', '-'),
	('5800', '', 'Beban Pemasaran', '5', b'00000000', 'Seragam staf, ongkos cetak nota, brosur, leaflat, iklan kecik di koran, dan berbagai beban terkait dengan kegiatan pemasaran.'),
	('5900', '', 'Beban Lain-lain', '5', b'00000000', '-');
/*!40000 ALTER TABLE `mt_chart_master` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_chart_types: ~3 rows (approximately)
/*!40000 ALTER TABLE `mt_chart_types` DISABLE KEYS */;
REPLACE INTO `mt_chart_types` (`id`, `name`, `class_id`, `parent`, `inactive`) VALUES
	('1', 'Kas dan Bank', '1', '-1', b'10000000'),
	('5', 'Beban', '2', '-1', b'10000000'),
	('7', 'Pendapatan', '3', '-1', b'10000000');
/*!40000 ALTER TABLE `mt_chart_types` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_comments: ~8 rows (approximately)
/*!40000 ALTER TABLE `mt_comments` DISABLE KEYS */;
REPLACE INTO `mt_comments` (`id`, `type`, `type_no`, `date_`, `memo_`) VALUES
	(54, 0, 3, '2013-07-01', '-'),
	(55, 0, 3, '2013-07-01', 'Coba'),
	(56, 8, 1, '2013-07-02', '-'),
	(57, 8, 1, '2013-07-02', '-'),
	(58, 8, 2, '2013-07-02', '-'),
	(59, 8, 2, '2013-07-02', '-'),
	(60, 8, 3, '2013-07-03', '-'),
	(61, 8, 3, '2013-07-03', '-');
/*!40000 ALTER TABLE `mt_comments` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_driver: ~1 rows (approximately)
/*!40000 ALTER TABLE `mt_driver` DISABLE KEYS */;
REPLACE INTO `mt_driver` (`id_driver`, `nama`, `telp`, `inactive`) VALUES
	(1, 'Nobe', '13123123123', b'00000000');
/*!40000 ALTER TABLE `mt_driver` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_gl_trans: ~6 rows (approximately)
/*!40000 ALTER TABLE `mt_gl_trans` DISABLE KEYS */;
REPLACE INTO `mt_gl_trans` (`counter`, `type`, `type_no`, `tran_date`, `account`, `memo_`, `amount`, `users_id`, `id_mobil`) VALUES
	(54, 8, 1, '2013-07-02', '1000 ', '-', 1000, 1, 1),
	(55, 8, 1, '2013-07-02', '1100', '-', -1000, 1, 1),
	(56, 8, 2, '2013-07-02', '1000 ', '-', 1000, 1, 1),
	(57, 8, 2, '2013-07-02', '1100', '-', -1000, 1, 1),
	(58, 8, 3, '2013-07-03', '1130', '-', 50000, 1, 1),
	(59, 8, 3, '2013-07-03', '4000', '-', -50000, 1, NULL);
/*!40000 ALTER TABLE `mt_gl_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_kas_keluar: ~0 rows (approximately)
/*!40000 ALTER TABLE `mt_kas_keluar` DISABLE KEYS */;
/*!40000 ALTER TABLE `mt_kas_keluar` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_kas_masuk: ~1 rows (approximately)
/*!40000 ALTER TABLE `mt_kas_masuk` DISABLE KEYS */;
REPLACE INTO `mt_kas_masuk` (`kas_masuk_id`, `doc_ref`, `no_bukti`, `amount`, `entry_time`, `trans_date`, `trans_via`, `mt_bank_accounts_id`, `users_id`, `note`, `id_mobil`, `account_code`) VALUES
	(3, 'MTKM00000004', 'adsdasd', 50000, '2013-07-01 19:20:46', '2013-07-01', 'Tunai', 2, 1, 'Coba', NULL, '1140');
/*!40000 ALTER TABLE `mt_kas_masuk` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_kelompok_pelanggan: ~4 rows (approximately)
/*!40000 ALTER TABLE `mt_kelompok_pelanggan` DISABLE KEYS */;
REPLACE INTO `mt_kelompok_pelanggan` (`id_kelompok`, `nama`, `discont_persen`, `inactive`) VALUES
	(1, 'Umum', 0, b'00000000'),
	(2, 'Hamba Tuhan', 100, b'00000000'),
	(3, 'Antar Rental', 0, b'00000000'),
	(4, 'Official', 10, b'00000000');
/*!40000 ALTER TABLE `mt_kelompok_pelanggan` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_kembali_kendaraan: ~0 rows (approximately)
/*!40000 ALTER TABLE `mt_kembali_kendaraan` DISABLE KEYS */;
/*!40000 ALTER TABLE `mt_kembali_kendaraan` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_member: ~0 rows (approximately)
/*!40000 ALTER TABLE `mt_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `mt_member` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_mobil: ~1 rows (approximately)
/*!40000 ALTER TABLE `mt_mobil` DISABLE KEYS */;
REPLACE INTO `mt_mobil` (`id_mobil`, `nopol`, `jenis`, `tahun`, `tarif_12`, `tarif_24`, `tarif_high_12`, `tarif_high_24`, `tarif_bulanan`, `overtime`, `discount_other_rental`, `status_pemilik`, `inactive`, `other_tarif_12`, `other_tarif_24`, `other_tarif_high_12`, `other_tarif_high_24`, `other_tarif_bulanan`, `other_overtime`) VALUES
	(1, 'AB 1234 H', 'Avanza', 2009, 200000, 250000, 250000, 300000, 3000000, 10, 10, 'Rental Lain', b'00000000', 150000, 200000, 200000, 250000, 2500000, 10);
/*!40000 ALTER TABLE `mt_mobil` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_pelanggan: ~1 rows (approximately)
/*!40000 ALTER TABLE `mt_pelanggan` DISABLE KEYS */;
REPLACE INTO `mt_pelanggan` (`id_pelanggan`, `nama`, `no_tlp`, `alamat`, `inactive`) VALUES
	(1, 'Nove', '123456', 'Nologaten', b'00000000');
/*!40000 ALTER TABLE `mt_pelanggan` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_pinjam_kendaraan: ~0 rows (approximately)
/*!40000 ALTER TABLE `mt_pinjam_kendaraan` DISABLE KEYS */;
/*!40000 ALTER TABLE `mt_pinjam_kendaraan` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_refs: ~4 rows (approximately)
/*!40000 ALTER TABLE `mt_refs` DISABLE KEYS */;
REPLACE INTO `mt_refs` (`id`, `type_no`, `type`, `reference`) VALUES
	(26, 3, 0, 'MTKM00000004'),
	(27, 1, 8, 'MTJU00000005'),
	(28, 2, 8, 'MTJU00000006'),
	(29, 3, 8, 'MTJU00000007');
/*!40000 ALTER TABLE `mt_refs` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_sys_prefs: ~3 rows (approximately)
/*!40000 ALTER TABLE `mt_sys_prefs` DISABLE KEYS */;
REPLACE INTO `mt_sys_prefs` (`name`, `value`) VALUES
	('akun_kas_ditangan', '1'),
	('akun_penjualan', '430'),
	('kelompok_other_rental', '3');
/*!40000 ALTER TABLE `mt_sys_prefs` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_sys_types: ~5 rows (approximately)
/*!40000 ALTER TABLE `mt_sys_types` DISABLE KEYS */;
REPLACE INTO `mt_sys_types` (`type_id`, `type_no`, `next_reference`) VALUES
	(0, 1, 'MTKM00000005'),
	(1, 1, 'MTKR00000004'),
	(8, 1, 'MTJU00000008'),
	(9, 1, 'MTPK00000005'),
	(10, 1, 'MTKM00000002');
/*!40000 ALTER TABLE `mt_sys_types` ENABLE KEYS */;

-- Dumping data for table gkkd.mt_voided: ~0 rows (approximately)
/*!40000 ALTER TABLE `mt_voided` DISABLE KEYS */;
/*!40000 ALTER TABLE `mt_voided` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_aktivitas: ~0 rows (approximately)
/*!40000 ALTER TABLE `pah_aktivitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `pah_aktivitas` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_aktivitas_grup: ~8 rows (approximately)
/*!40000 ALTER TABLE `pah_aktivitas_grup` DISABLE KEYS */;
REPLACE INTO `pah_aktivitas_grup` (`id`, `name`, `notes`, `inactive`) VALUES
	(1, 'Les Umum', '-', 0),
	(2, 'Menari', '-', 0),
	(3, 'TK Teruna Bangsa', 'Andrew, Erni ', 0),
	(4, 'SD Teruna Bangsa', 'Ance, Keni, Devi, Dimas, Jovan, Nisa, ', 0),
	(5, 'SD Bopkri Demangan 3', 'Sony, Andrew, Magda, Yalince, Nomince, Farida, ', 0),
	(6, 'SMP Bopkri 3', 'Andi, Lusi', 0),
	(7, 'SMA Budya wacana', 'Frengky', 0),
	(8, 'SMK Negri 2', 'Rinto', 0);
/*!40000 ALTER TABLE `pah_aktivitas_grup` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_aktivitas_grup_trans: ~15 rows (approximately)
/*!40000 ALTER TABLE `pah_aktivitas_grup_trans` DISABLE KEYS */;
REPLACE INTO `pah_aktivitas_grup_trans` (`aktivitas_id`, `doc_ref`, `no_bukti`, `amount`, `entry_time`, `trans_date`, `trans_via`, `pah_suppliers_supplier_id`, `pah_bank_accounts_id`, `users_id`, `pah_aktivitas_grup_id`, `pah_sub_aktivitas_id`, `note`) VALUES
	(1, 'AKG00000001', NULL, 60000, '2013-01-28 15:36:09', '2013-01-18', 'Tunai', 4, 7, 7, 4, 3, 'Andrew Christyanto'),
	(2, 'AKG00000002', NULL, 60000, '2013-01-28 15:37:10', '2013-01-18', 'Tunai', 4, 7, 7, 3, 3, 'Alberthina Verlita Labba'),
	(3, 'AKG00000003', NULL, 60000, '2013-01-28 15:38:45', '2013-01-18', 'Tunai', 4, 7, 7, 3, 3, 'Andrew Christyanto'),
	(4, 'AKG00000004', NULL, 60000, '2013-01-28 15:39:37', '2013-01-18', 'Tunai', 4, 7, 7, 4, 3, 'Devi Elyvani'),
	(5, 'AKG00000005', NULL, 60000, '2013-01-28 15:40:21', '2013-01-18', 'Tunai', 4, 8, 7, 4, 3, 'Jovan Yordani Geley'),
	(6, 'AKG00000006', NULL, 60000, '2013-01-28 15:40:58', '2013-01-18', 'Tunai', 4, 7, 7, 3, 3, 'Erni Kurniawati'),
	(7, 'AKG00000007', NULL, 150000, '2013-01-28 15:41:59', '2013-01-23', 'Tunai', 4, 7, 7, 5, 3, 'SPP bulan Januari 2013'),
	(8, 'AKG00000008', NULL, 450000, '2013-01-28 15:43:07', '2013-01-23', 'Tunai', 4, 7, 7, 5, 2, 'LKS Semester 2'),
	(9, 'AKG00000009', NULL, 60000, '2013-01-28 15:43:58', '2013-01-18', 'Tunai', 4, 7, 7, 4, 3, 'Keni Junus Karoba'),
	(10, 'AKG00000010', NULL, 135000, '2013-01-28 15:45:08', '2013-01-15', 'Tunai', 4, 7, 7, 6, 3, 'Lusyana Christanti'),
	(11, 'AKG00000011', NULL, 50000, '2013-01-28 15:49:24', '2013-01-11', 'Tunai', 4, 7, 7, 3, 4, 'Seragam OR Alberthina '),
	(12, 'AKG00000012', NULL, 179000, '2013-01-28 15:50:30', '2013-01-18', 'Tunai', 4, 7, 7, 4, 5, 'NIsha Gracia'),
	(13, 'AKG00000013', NULL, 300000, '2013-01-28 15:51:15', '2013-01-18', 'Tunai', 4, 7, 7, 8, 3, 'Rinto'),
	(14, 'AKG00000014', NULL, 350000, '2013-01-28 15:52:03', '2013-01-09', 'Tunai', 4, 7, 7, 7, 3, 'Frengky Amos'),
	(15, 'AKG00000015', NULL, 800000, '2013-01-28 15:53:52', '2013-01-15', 'Tunai', 4, 7, 7, 6, 4, 'DPP Lusy dan Andi ');
/*!40000 ALTER TABLE `pah_aktivitas_grup_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_anggaran: ~0 rows (approximately)
/*!40000 ALTER TABLE `pah_anggaran` DISABLE KEYS */;
/*!40000 ALTER TABLE `pah_anggaran` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_anggaran_detil: ~0 rows (approximately)
/*!40000 ALTER TABLE `pah_anggaran_detil` DISABLE KEYS */;
/*!40000 ALTER TABLE `pah_anggaran_detil` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_bank_accounts: ~2 rows (approximately)
/*!40000 ALTER TABLE `pah_bank_accounts` DISABLE KEYS */;
REPLACE INTO `pah_bank_accounts` (`id`, `account_code`, `account_type`, `bank_account_name`, `bank_account_number`, `bank_name`, `bank_address`, `bank_curr_code`, `dflt_curr_act`, `ending_reconcile_balance`, `inactive`, `bank_phone`, `atas_nama`) VALUES
	(7, '110', 0, 'Kas di Tangan', '-', '-', '-', '', 0, 0, 0, '-', '-'),
	(8, '120', 0, 'Kas di Bank', '-', '-', '-', '', 0, 0, 0, '-', '-');
/*!40000 ALTER TABLE `pah_bank_accounts` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_bank_trans: ~144 rows (approximately)
/*!40000 ALTER TABLE `pah_bank_trans` DISABLE KEYS */;
REPLACE INTO `pah_bank_trans` (`id`, `type`, `trans_no`, `bank_act`, `ref`, `trans_date`, `amount`, `reconciled`, `users_id`) VALUES
	(1, 6, 0, 7, '-', '2012-12-31', 2500279, NULL, 5),
	(2, 1, 1, 7, 'KKR00000001', '2013-01-01', -4000, NULL, 7),
	(3, 1, 2, 7, 'KKR00000002', '2013-01-01', -40000, NULL, 7),
	(4, 1, 3, 7, 'KKR00000003', '2013-01-02', -32000, NULL, 7),
	(5, 1, 4, 7, 'KKR00000004', '2013-01-02', -2500, NULL, 7),
	(6, 1, 5, 7, 'KKR00000005', '2013-01-02', -23000, NULL, 7),
	(7, 1, 6, 7, 'KKR00000006', '2013-01-02', -25000, NULL, 7),
	(8, 1, 7, 7, 'KKR00000007', '2013-01-03', -70000, NULL, 7),
	(9, 1, 8, 7, 'KKR00000008', '2013-01-03', -2500, NULL, 7),
	(10, 1, 9, 7, 'KKR00000009', '2013-01-03', -145000, NULL, 7),
	(11, 1, 10, 7, 'KKR00000010', '2013-01-03', -400, NULL, 7),
	(12, 1, 11, 7, 'KKR00000011', '2013-01-03', -30000, NULL, 7),
	(13, 1, 12, 7, 'KKR00000012', '2013-01-04', -19000, NULL, 7),
	(14, 1, 13, 7, 'KKR00000013', '2013-01-04', -30000, NULL, 7),
	(15, 0, 1, 7, 'KMS00000001', '2013-01-08', 3000000, NULL, 7),
	(16, 1, 14, 7, 'KKR00000014', '2013-01-04', -3000, NULL, 7),
	(17, 1, 15, 7, 'KKR00000015', '2013-01-05', -40000, NULL, 7),
	(18, 1, 16, 7, 'KKR00000016', '2013-01-06', -8000, NULL, 7),
	(19, 1, 17, 7, 'KKR00000017', '2013-01-06', -1220, NULL, 7),
	(20, 1, 18, 7, 'KKR00000018', '2013-01-06', -200000, NULL, 7),
	(21, 1, 19, 7, 'KKR00000019', '2013-01-07', -19000, NULL, 7),
	(22, 1, 20, 7, 'KKR00000020', '2013-01-07', -150000, NULL, 7),
	(23, 1, 21, 7, 'KKR00000021', '2013-01-08', -7700, NULL, 7),
	(24, 1, 22, 7, 'KKR00000022', '2013-01-08', -7500, NULL, 7),
	(25, 1, 23, 7, 'KKR00000023', '2013-01-08', -19000, NULL, 7),
	(26, 1, 24, 7, 'KKR00000024', '2013-01-08', -28000, NULL, 7),
	(27, 1, 25, 7, 'KKR00000025', '2013-01-08', -50000, NULL, 7),
	(28, 1, 26, 7, 'KKR00000026', '2013-01-08', -16000, NULL, 7),
	(29, 1, 27, 7, 'KKR00000027', '2013-01-08', -15000, NULL, 7),
	(30, 1, 28, 7, 'KKR00000028', '2013-01-09', -66000, NULL, 7),
	(31, 1, 29, 7, 'KKR00000029', '2013-01-09', -50000, NULL, 7),
	(32, 1, 30, 7, 'KKR00000030', '2013-01-09', -48000, NULL, 7),
	(33, 1, 31, 7, 'KKR00000031', '2013-01-09', -3000, NULL, 7),
	(34, 1, 32, 7, 'KKR00000032', '2013-01-09', -10000, NULL, 7),
	(35, 1, 33, 7, 'KKR00000033', '2013-01-10', -150000, NULL, 7),
	(36, 1, 34, 7, 'KKR00000034', '2013-01-10', -18000, NULL, 7),
	(37, 1, 35, 7, 'KKR00000035', '2013-01-10', -15000, NULL, 7),
	(38, 1, 36, 7, 'KKR00000036', '2013-01-11', -20700, NULL, 7),
	(39, 1, 37, 7, 'KKR00000037', '2013-01-11', -27900, NULL, 7),
	(40, 1, 38, 7, 'KKR00000038', '2013-01-11', -2000, NULL, 7),
	(41, 1, 39, 7, 'KKR00000039', '2013-01-11', -50000, NULL, 7),
	(42, 1, 40, 7, 'KKR00000040', '2013-01-11', -6000, NULL, 7),
	(43, 1, 41, 7, 'KKR00000041', '2013-01-11', -7000, NULL, 7),
	(44, 1, 42, 7, 'KKR00000042', '2013-01-12', -22000, NULL, 7),
	(45, 1, 43, 7, 'KKR00000043', '2013-01-12', -50000, NULL, 7),
	(46, 1, 44, 7, 'KKR00000044', '2013-01-12', -20000, NULL, 7),
	(47, 1, 45, 7, 'KKR00000045', '2013-01-12', -2000, NULL, 7),
	(48, 1, 46, 7, 'KKR00000046', '2013-01-12', -69000, NULL, 7),
	(49, 1, 47, 7, 'KKR00000047', '2013-01-13', -20000, NULL, 7),
	(50, 1, 48, 7, 'KKR00000048', '2013-01-13', -19000, NULL, 7),
	(51, 5, 48, 7, 'KKR00000048', '2013-01-13', 19000, NULL, 7),
	(52, 1, 49, 7, 'KKR00000049', '2013-01-13', -25000, NULL, 7),
	(53, 1, 50, 7, 'KKR00000050', '2013-01-13', -2000, NULL, 7),
	(54, 1, 51, 7, 'KKR00000051', '2013-01-14', -150000, NULL, 7),
	(55, 5, 51, 7, 'KKR00000051', '2013-01-14', 150000, NULL, 7),
	(56, 1, 52, 7, 'KKR00000052', '2013-01-14', -150000, NULL, 7),
	(57, 1, 53, 7, 'KKR00000053', '2013-01-14', -19000, NULL, 7),
	(58, 1, 54, 7, 'KKR00000054', '2013-01-14', -10000, NULL, 7),
	(59, 1, 55, 7, 'KKR00000055', '2013-01-14', -30000, NULL, 7),
	(60, 1, 56, 7, 'KKR00000056', '2013-01-14', -15000, NULL, 7),
	(61, 1, 57, 7, 'KKR00000057', '2013-01-15', -9000, NULL, 7),
	(62, 1, 58, 7, 'KKR00000058', '2013-01-15', -204360, NULL, 7),
	(63, 1, 59, 7, 'KKR00000059', '2013-01-15', -214500, NULL, 7),
	(64, 1, 60, 7, 'KKR00000060', '2013-01-15', -313075, NULL, 7),
	(65, 1, 61, 7, 'KKR00000061', '2013-01-15', -13310, NULL, 7),
	(66, 1, 62, 7, 'KKR00000062', '2013-01-15', -25300, NULL, 7),
	(67, 1, 63, 7, 'KKR00000063', '2013-01-15', -2500, NULL, 7),
	(68, 1, 64, 7, 'KKR00000064', '2013-01-15', -6000, NULL, 7),
	(69, 1, 65, 7, 'KKR00000065', '2013-01-15', -23000, NULL, 7),
	(70, 1, 66, 7, 'KKR00000066', '2013-01-15', -1000, NULL, 7),
	(71, 1, 67, 7, 'KKR00000067', '2013-01-16', -150000, NULL, 7),
	(72, 1, 68, 7, 'KKR00000068', '2013-01-16', -145000, NULL, 7),
	(73, 1, 69, 7, 'KKR00000069', '2013-01-16', -28800, NULL, 7),
	(74, 1, 70, 7, 'KKR00000070', '2013-01-16', -4500, NULL, 7),
	(75, 1, 71, 7, 'KKR00000071', '2013-01-16', -7900, NULL, 7),
	(76, 1, 72, 7, 'KKR00000072', '2013-01-17', -25000, NULL, 7),
	(77, 1, 73, 7, 'KKR00000073', '2013-01-17', -15000, NULL, 7),
	(78, 1, 74, 7, 'KKR00000074', '2013-01-17', -9000, NULL, 7),
	(79, 0, 2, 7, 'KMS00000002', '2013-01-15', 3000000, NULL, 7),
	(80, 0, 3, 7, 'KMS00000003', '2013-01-15', 3000000, NULL, 7),
	(81, 1, 75, 7, 'KKR00000075', '2013-01-18', -10500, NULL, 7),
	(82, 1, 76, 7, 'KKR00000076', '2013-01-18', -4000, NULL, 7),
	(83, 1, 77, 7, 'KKR00000077', '2013-01-18', -32500, NULL, 7),
	(84, 1, 78, 7, 'KKR00000078', '2013-01-18', -20000, NULL, 7),
	(85, 1, 79, 7, 'KKR00000079', '2013-01-19', -30000, NULL, 7),
	(86, 1, 80, 7, 'KKR00000080', '2013-01-19', -36000, NULL, 7),
	(87, 1, 81, 7, 'KKR00000081', '2013-01-19', -23500, NULL, 7),
	(88, 1, 82, 7, 'KKR00000082', '2013-01-19', -2000, NULL, 7),
	(89, 1, 83, 7, 'KKR00000083', '2013-01-19', -10000, NULL, 7),
	(90, 1, 84, 7, 'KKR00000084', '2013-01-20', -15000, NULL, 7),
	(91, 1, 85, 7, 'KKR00000085', '2013-01-20', -10000, NULL, 7),
	(92, 1, 86, 7, 'KKR00000086', '2013-01-20', -7500, NULL, 7),
	(93, 1, 87, 7, 'KKR00000087', '2013-01-21', -150000, NULL, 7),
	(94, 1, 88, 7, 'KKR00000088', '2013-01-21', -11000, NULL, 7),
	(95, 1, 89, 7, 'KKR00000089', '2013-01-21', -4500, NULL, 7),
	(96, 1, 90, 7, 'KKR00000090', '2013-01-21', -15000, NULL, 7),
	(97, 1, 91, 7, 'KKR00000091', '2013-01-22', -3800, NULL, 7),
	(98, 1, 92, 7, 'KKR00000092', '2013-01-22', -4600, NULL, 7),
	(99, 1, 93, 7, 'KKR00000093', '2013-01-22', -17500, NULL, 7),
	(100, 1, 94, 7, 'KKR00000094', '2013-01-23', -30000, NULL, 7),
	(101, 1, 95, 7, 'KKR00000095', '2013-01-23', -20000, NULL, 7),
	(102, 1, 96, 7, 'KKR00000096', '2013-01-23', -9000, NULL, 7),
	(103, 1, 97, 7, 'KKR00000097', '2013-01-24', -1100, NULL, 7),
	(104, 1, 98, 7, 'KKR00000098', '2013-01-25', -100000, NULL, 7),
	(105, 1, 99, 7, 'KKR00000099', '2013-01-26', -27000, NULL, 7),
	(106, 1, 100, 7, 'KKR00000100', '2013-01-27', -3000, NULL, 7),
	(107, 1, 101, 7, 'KKR00000101', '2013-01-27', -3400, NULL, 7),
	(108, 1, 102, 7, 'KKR00000102', '2013-01-27', -10000, NULL, 7),
	(109, 1, 103, 7, 'KKR00000103', '2013-01-01', -254000, NULL, 7),
	(110, 1, 104, 7, 'KKR00000104', '2013-01-02', -46000, NULL, 7),
	(111, 1, 105, 7, 'KKR00000105', '2013-01-04', -173500, NULL, 7),
	(112, 1, 106, 7, 'KKR00000106', '2013-01-03', -25500, NULL, 7),
	(113, 1, 107, 7, 'KKR00000107', '2013-01-07', -54000, NULL, 7),
	(114, 1, 108, 7, 'KKR00000108', '2013-01-08', -47000, NULL, 7),
	(115, 1, 109, 7, 'KKR00000109', '2013-01-09', -161000, NULL, 7),
	(116, 1, 110, 7, 'KKR00000110', '2013-01-10', -75000, NULL, 7),
	(117, 1, 111, 7, 'KKR00000111', '2013-01-11', -105000, NULL, 7),
	(118, 1, 112, 7, 'KKR00000112', '2013-01-14', -146000, NULL, 7),
	(119, 1, 113, 7, 'KKR00000113', '2013-01-15', -124000, NULL, 7),
	(120, 1, 114, 7, 'KKR00000114', '2013-01-16', -116500, NULL, 7),
	(121, 1, 115, 7, 'KKR00000115', '2013-01-17', -159000, NULL, 7),
	(122, 1, 116, 7, 'KKR00000116', '2013-01-18', -41000, NULL, 7),
	(123, 1, 117, 7, 'KKR00000117', '2013-01-21', -132000, NULL, 7),
	(124, 1, 118, 7, 'KKR00000118', '2013-01-22', -27000, NULL, 7),
	(125, 1, 119, 7, 'KKR00000119', '2013-01-23', -49000, NULL, 7),
	(126, 1, 120, 7, 'KKR00000120', '2013-01-25', -161000, NULL, 7),
	(127, 1, 121, 7, 'KKR00000121', '2013-01-26', -56000, NULL, 7),
	(128, 1, 122, 7, 'KKR00000122', '2013-01-27', -52500, NULL, 7),
	(129, 7, 1, 7, 'AKG00000001', '2013-01-18', -60000, NULL, 7),
	(130, 7, 2, 7, 'AKG00000002', '2013-01-18', -60000, NULL, 7),
	(131, 5, 1, 7, 'AKG00000001', '2013-01-18', 60000, NULL, 7),
	(132, 7, 3, 7, 'AKG00000003', '2013-01-18', -60000, NULL, 7),
	(133, 7, 4, 7, 'AKG00000004', '2013-01-18', -60000, NULL, 7),
	(134, 7, 5, 8, 'AKG00000005', '2013-01-18', -60000, NULL, 7),
	(135, 7, 6, 7, 'AKG00000006', '2013-01-18', -60000, NULL, 7),
	(136, 7, 7, 7, 'AKG00000007', '2013-01-23', -150000, NULL, 7),
	(137, 7, 8, 7, 'AKG00000008', '2013-01-23', -450000, NULL, 7),
	(138, 7, 9, 7, 'AKG00000009', '2013-01-18', -60000, NULL, 7),
	(139, 7, 10, 7, 'AKG00000010', '2013-01-15', -135000, NULL, 7),
	(140, 7, 11, 7, 'AKG00000011', '2013-01-11', -50000, NULL, 7),
	(141, 7, 12, 7, 'AKG00000012', '2013-01-18', -179000, NULL, 7),
	(142, 7, 13, 7, 'AKG00000013', '2013-01-18', -300000, NULL, 7),
	(143, 7, 14, 7, 'AKG00000014', '2013-01-09', -350000, NULL, 7),
	(144, 7, 15, 7, 'AKG00000015', '2013-01-15', -800000, NULL, 7);
/*!40000 ALTER TABLE `pah_bank_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_chart_class: ~4 rows (approximately)
/*!40000 ALTER TABLE `pah_chart_class` DISABLE KEYS */;
REPLACE INTO `pah_chart_class` (`cid`, `class_name`, `ctype`, `inactive`) VALUES
	('1', 'Harta', 1, 0),
	('2', 'Kewajiban', 2, 0),
	('3', 'Pendapatan', 4, 0),
	('4', 'Pengeluaran', 6, 0);
/*!40000 ALTER TABLE `pah_chart_class` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_chart_master: ~13 rows (approximately)
/*!40000 ALTER TABLE `pah_chart_master` DISABLE KEYS */;
REPLACE INTO `pah_chart_master` (`account_code`, `account_code2`, `account_name`, `account_type`, `inactive`, `description`) VALUES
	('110', '', 'Kas di Tangan', '1', 0, '-'),
	('120', '', 'Kas di Bank', '1', 0, '-'),
	('410', '', 'Kas Gereja', '7', 0, 'Kas dari Gereja'),
	('420', '', 'Donasi', '7', 0, 'Sumbangan pihak eksternal'),
	('430', '', 'Pendapatan Lain-lain', '7', 0, '-'),
	('510', '', 'Food', '5', 0, 'Uang makan dan snack'),
	('520', '', 'Suplies (Non Food)', '5', 0, 'Sabun, shampo, pasta gigi, sikat gigi, pembalut, pembersih kaca dan lantai, bayclin, bedak, handbody, cotton bud, rexona, minyak rambut, dan lain sebagainya'),
	('530', '', 'Transportasi', '5', 0, 'Parkir mobil dan motor, bensin, taxi'),
	('540', '', 'Utilitas', '5', 0, 'Listrik, telpon, air, ronda, tukang cuci, iuran sampah'),
	('550', '', 'Rumah Tangga', '5', 0, 'Peralatan dan perawatan rumah tangga'),
	('570', '', 'Aktivitas Anak', '5', 0, 'Uang saku, rekreasi anak, olah raga, sewa vcd, kebutuhan sekolah, les, eskul, penggalian bakat, speedy, perpustakaan (buku, majalah, koran), spp, daftar ulang dan lain sebagainya.'),
	('580', '', 'Kesehatan', '5', 0, 'Berobat, obat dan Premi Asuransi'),
	('590', '', 'Lain-lain', '5', 0, 'PBB, atau apapun yang tidak dapat dikelompokkan dalam kelompok di atas.');
/*!40000 ALTER TABLE `pah_chart_master` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_chart_types: ~3 rows (approximately)
/*!40000 ALTER TABLE `pah_chart_types` DISABLE KEYS */;
REPLACE INTO `pah_chart_types` (`id`, `name`, `class_id`, `parent`, `inactive`) VALUES
	('1', 'Kas dan Bank', '1', '', 0),
	('5', 'Beban', '2', '', 0),
	('7', 'Pendapatan', '3', '', 0);
/*!40000 ALTER TABLE `pah_chart_types` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_comments: ~287 rows (approximately)
/*!40000 ALTER TABLE `pah_comments` DISABLE KEYS */;
REPLACE INTO `pah_comments` (`id`, `type`, `type_no`, `date_`, `memo_`) VALUES
	(1, 6, 0, '2012-12-31', '-'),
	(2, 1, 1, '2013-01-01', 'parkir'),
	(3, 1, 1, '2013-01-01', '-'),
	(4, 1, 2, '2013-01-01', 'stop kontak'),
	(5, 1, 2, '2013-01-01', '-'),
	(6, 1, 3, '2013-01-02', 'snack unt tamu'),
	(7, 1, 3, '2013-01-02', '-'),
	(8, 1, 4, '2013-01-02', 'parkir'),
	(9, 1, 4, '2013-01-02', '-'),
	(10, 1, 5, '2013-01-02', 'lauk unt tamu'),
	(11, 1, 5, '2013-01-02', '-'),
	(12, 1, 6, '2013-01-02', 'transport sekolah'),
	(13, 1, 6, '2013-01-02', '-'),
	(14, 1, 7, '2013-01-03', 'lauk unt tamu kel tadus'),
	(15, 1, 7, '2013-01-03', '-'),
	(16, 1, 8, '2013-01-03', 'parkir'),
	(17, 1, 8, '2013-01-03', '-'),
	(18, 1, 9, '2013-01-03', 'gas'),
	(19, 1, 9, '2013-01-03', '-'),
	(20, 1, 10, '2013-01-03', 'fc'),
	(21, 1, 10, '2013-01-03', '-'),
	(22, 1, 11, '2013-01-03', 'iuran ronda'),
	(23, 1, 11, '2013-01-03', '-'),
	(24, 1, 12, '2013-01-04', 'fc raport dll'),
	(25, 1, 12, '2013-01-04', '-'),
	(26, 1, 13, '2013-01-04', 'kerupuk putih'),
	(27, 1, 13, '2013-01-04', '-'),
	(28, 0, 1, '2013-01-08', '-'),
	(29, 0, 1, '2013-01-08', 'kas masuk'),
	(30, 1, 14, '2013-01-04', 'parkir'),
	(31, 1, 14, '2013-01-04', '-'),
	(32, 1, 15, '2013-01-05', 'snack'),
	(33, 1, 15, '2013-01-05', '-'),
	(34, 1, 16, '2013-01-06', 'snack'),
	(35, 1, 16, '2013-01-06', '-'),
	(36, 1, 17, '2013-01-06', 'CTM'),
	(37, 1, 17, '2013-01-06', '-'),
	(38, 1, 18, '2013-01-06', 'PK tukang cuci'),
	(39, 1, 18, '2013-01-06', '-'),
	(40, 1, 19, '2013-01-07', 'ganti ban dalam sepeda'),
	(41, 1, 19, '2013-01-07', '-'),
	(42, 1, 20, '2013-01-07', 'transport sekolah'),
	(43, 1, 20, '2013-01-07', '-'),
	(44, 1, 21, '2013-01-08', 'FC dan jilid - dita'),
	(45, 1, 21, '2013-01-08', '-'),
	(46, 1, 22, '2013-01-08', 'fc denah perjamuan'),
	(47, 1, 22, '2013-01-08', '-'),
	(48, 1, 23, '2013-01-08', 'ganti ban dalam polygon'),
	(49, 1, 23, '2013-01-08', '-'),
	(50, 1, 24, '2013-01-08', 'lauk '),
	(51, 1, 24, '2013-01-08', '-'),
	(52, 1, 25, '2013-01-08', 'transportasi ambil kulkas'),
	(53, 1, 25, '2013-01-08', '-'),
	(54, 1, 26, '2013-01-08', 'LKS frengky'),
	(55, 1, 26, '2013-01-08', '-'),
	(56, 1, 27, '2013-01-08', 'persembahan SD Kanisius (3 anak)'),
	(57, 1, 27, '2013-01-08', '-'),
	(58, 1, 28, '2013-01-09', 'alat listrik'),
	(59, 1, 28, '2013-01-09', '-'),
	(60, 1, 29, '2013-01-09', 'celana renag unt dimas'),
	(61, 1, 29, '2013-01-09', '-'),
	(62, 1, 30, '2013-01-09', 'sanck dan minum renang '),
	(63, 1, 30, '2013-01-09', '-'),
	(64, 1, 31, '2013-01-09', 'parkir'),
	(65, 1, 31, '2013-01-09', '-'),
	(66, 1, 32, '2013-01-09', 'gorengan'),
	(67, 1, 32, '2013-01-09', '-'),
	(68, 1, 33, '2013-01-10', 'trasnsport sekolah'),
	(69, 1, 33, '2013-01-10', '-'),
	(70, 1, 34, '2013-01-10', 'air minum'),
	(71, 1, 34, '2013-01-10', '-'),
	(72, 1, 35, '2013-01-10', 'snack '),
	(73, 1, 35, '2013-01-10', '-'),
	(74, 1, 36, '2013-01-11', 'plastik sampah'),
	(75, 1, 36, '2013-01-11', '-'),
	(76, 1, 37, '2013-01-11', 'snack'),
	(77, 1, 37, '2013-01-11', '-'),
	(78, 1, 38, '2013-01-11', 'parkir'),
	(79, 1, 38, '2013-01-11', '-'),
	(80, 1, 39, '2013-01-11', 'biaya urus ktp dita'),
	(81, 1, 39, '2013-01-11', '-'),
	(82, 1, 40, '2013-01-11', 'potong rambut'),
	(83, 1, 40, '2013-01-11', '-'),
	(84, 1, 41, '2013-01-11', 'jilid tugas'),
	(85, 1, 41, '2013-01-11', '-'),
	(86, 1, 42, '2013-01-12', 'snack'),
	(87, 1, 42, '2013-01-12', '-'),
	(88, 1, 43, '2013-01-12', 'iuran RT dan ronda'),
	(89, 1, 43, '2013-01-12', '-'),
	(90, 1, 44, '2013-01-12', 'iuran natal frengky'),
	(91, 1, 44, '2013-01-12', '-'),
	(92, 1, 45, '2013-01-12', 'parkir'),
	(93, 1, 45, '2013-01-12', '-'),
	(94, 1, 46, '2013-01-12', 'askes'),
	(95, 1, 46, '2013-01-12', '-'),
	(96, 1, 47, '2013-01-13', 'kerupuk putih'),
	(97, 1, 47, '2013-01-13', '-'),
	(98, 1, 48, '2013-01-13', 'lauk'),
	(99, 1, 48, '2013-01-13', '-'),
	(100, 5, 48, '2013-01-13', 'VOID Kas Keluar KKR00000048'),
	(101, 5, 48, '2013-01-13', 'VOID Kas Keluar KKR00000048'),
	(102, 1, 49, '2013-01-13', 'snack'),
	(103, 1, 49, '2013-01-13', '-'),
	(104, 1, 50, '2013-01-13', 'parkir'),
	(105, 1, 50, '2013-01-13', '-'),
	(106, 1, 51, '2013-01-14', 'transport sekolah'),
	(107, 1, 51, '2013-01-14', '-'),
	(108, 5, 51, '2013-01-14', 'VOID Kas Keluar KKR00000051'),
	(109, 5, 51, '2013-01-14', 'VOID Kas Keluar KKR00000051'),
	(110, 1, 52, '2013-01-14', 'uang transport n saku'),
	(111, 1, 52, '2013-01-14', '-'),
	(112, 1, 53, '2013-01-14', 'lauk'),
	(113, 1, 53, '2013-01-14', '-'),
	(114, 1, 54, '2013-01-14', 'perlengkapan sekolah'),
	(115, 1, 54, '2013-01-14', '-'),
	(116, 1, 55, '2013-01-14', 'LKS lusi'),
	(117, 1, 55, '2013-01-14', '-'),
	(118, 1, 56, '2013-01-14', 'kain unt batik _ andi'),
	(119, 1, 56, '2013-01-14', '-'),
	(120, 1, 57, '2013-01-15', 'lauk'),
	(121, 1, 57, '2013-01-15', '-'),
	(122, 1, 58, '2013-01-15', 'rek. telepon'),
	(123, 1, 58, '2013-01-15', '-'),
	(124, 1, 59, '2013-01-15', 'speedy'),
	(125, 1, 59, '2013-01-15', '-'),
	(126, 1, 60, '2013-01-15', 'rek. listrik'),
	(127, 1, 60, '2013-01-15', '-'),
	(128, 1, 61, '2013-01-15', 'multivitamin'),
	(129, 1, 61, '2013-01-15', '-'),
	(130, 1, 62, '2013-01-15', 'kantong karet'),
	(131, 1, 62, '2013-01-15', '-'),
	(132, 1, 63, '2013-01-15', 'fc dan jilid'),
	(133, 1, 63, '2013-01-15', '-'),
	(134, 1, 64, '2013-01-15', 'ATK'),
	(135, 1, 64, '2013-01-15', '-'),
	(136, 1, 65, '2013-01-15', 'selang pianika'),
	(137, 1, 65, '2013-01-15', '-'),
	(138, 1, 66, '2013-01-15', 'parkir'),
	(139, 1, 66, '2013-01-15', '-'),
	(140, 1, 67, '2013-01-16', 'uang saku n transport'),
	(141, 1, 67, '2013-01-16', '-'),
	(142, 1, 68, '2013-01-16', 'gas'),
	(143, 1, 68, '2013-01-16', '-'),
	(144, 1, 69, '2013-01-16', 'ATK'),
	(145, 1, 69, '2013-01-16', '-'),
	(146, 1, 70, '2013-01-16', 'parkir'),
	(147, 1, 70, '2013-01-16', '-'),
	(148, 1, 71, '2013-01-16', 'kedelai'),
	(149, 1, 71, '2013-01-16', '-'),
	(150, 1, 72, '2013-01-17', 'LKS frengky'),
	(151, 1, 72, '2013-01-17', '-'),
	(152, 1, 73, '2013-01-17', 'iuran kelas - lusi'),
	(153, 1, 73, '2013-01-17', '-'),
	(154, 1, 74, '2013-01-17', 'pisang'),
	(155, 1, 74, '2013-01-17', '-'),
	(156, 0, 2, '2013-01-15', '-'),
	(157, 0, 2, '2013-01-15', 'penerimaan kas'),
	(158, 0, 3, '2013-01-15', '-'),
	(159, 0, 3, '2013-01-15', 'penerimaan kas'),
	(160, 1, 75, '2013-01-18', 'bekal sekolah'),
	(161, 1, 75, '2013-01-18', '-'),
	(162, 1, 76, '2013-01-18', 'parkir'),
	(163, 1, 76, '2013-01-18', '-'),
	(164, 1, 77, '2013-01-18', 'lauk'),
	(165, 1, 77, '2013-01-18', '-'),
	(166, 1, 78, '2013-01-18', 'snack'),
	(167, 1, 78, '2013-01-18', '-'),
	(168, 1, 79, '2013-01-19', 'studi keluar SMP Bopkri 3 (lusi & andi)'),
	(169, 1, 79, '2013-01-19', '-'),
	(170, 1, 80, '2013-01-19', 'gorengan'),
	(171, 1, 80, '2013-01-19', '-'),
	(172, 1, 81, '2013-01-19', 'lauk dan snack unt bekal'),
	(173, 1, 81, '2013-01-19', '-'),
	(174, 1, 82, '2013-01-19', 'parkir'),
	(175, 1, 82, '2013-01-19', '-'),
	(176, 1, 83, '2013-01-19', 'las dandang'),
	(177, 1, 83, '2013-01-19', '-'),
	(178, 1, 84, '2013-01-20', 'sayuran *labu siam, kacang, cabai)'),
	(179, 1, 84, '2013-01-20', '-'),
	(180, 1, 85, '2013-01-20', 'ekskul frengki'),
	(181, 1, 85, '2013-01-20', '-'),
	(182, 1, 86, '2013-01-20', 'so klin pembersih lantai'),
	(183, 1, 86, '2013-01-20', '-'),
	(184, 1, 87, '2013-01-21', 'transport sekolah'),
	(185, 1, 87, '2013-01-21', '-'),
	(186, 1, 88, '2013-01-21', 'sayuran '),
	(187, 1, 88, '2013-01-21', '-'),
	(188, 1, 89, '2013-01-21', 'parkir'),
	(189, 1, 89, '2013-01-21', '-'),
	(190, 1, 90, '2013-01-21', 'bekal sekolah'),
	(191, 1, 90, '2013-01-21', '-'),
	(192, 1, 91, '2013-01-22', 'ATK, kertas manila'),
	(193, 1, 91, '2013-01-22', '-'),
	(194, 1, 92, '2013-01-22', 'plastik klip'),
	(195, 1, 92, '2013-01-22', '-'),
	(196, 1, 93, '2013-01-22', 'bekal sekolah'),
	(197, 1, 93, '2013-01-22', '-'),
	(198, 1, 94, '2013-01-23', 'LKS andi'),
	(199, 1, 94, '2013-01-23', '-'),
	(200, 1, 95, '2013-01-23', 'karet mesin cuci'),
	(201, 1, 95, '2013-01-23', '-'),
	(202, 1, 96, '2013-01-23', 'bekal sekolah '),
	(203, 1, 96, '2013-01-23', '-'),
	(204, 1, 97, '2013-01-24', 'ATK kertas manila'),
	(205, 1, 97, '2013-01-24', '-'),
	(206, 1, 98, '2013-01-25', 'transport sekolah'),
	(207, 1, 98, '2013-01-25', '-'),
	(208, 1, 99, '2013-01-26', 'snack'),
	(209, 1, 99, '2013-01-26', '-'),
	(210, 1, 100, '2013-01-27', 'kapas'),
	(211, 1, 100, '2013-01-27', '-'),
	(212, 1, 101, '2013-01-27', 'pewarna unt hasta karya'),
	(213, 1, 101, '2013-01-27', '-'),
	(214, 1, 102, '2013-01-27', 'tambahan tk sampah'),
	(215, 1, 102, '2013-01-27', '-'),
	(216, 1, 103, '2013-01-01', 'belanja masak'),
	(217, 1, 103, '2013-01-01', '-'),
	(218, 1, 104, '2013-01-02', 'tempe, bawang'),
	(219, 1, 104, '2013-01-02', '-'),
	(220, 1, 105, '2013-01-04', 'belanja masak'),
	(221, 1, 105, '2013-01-04', '-'),
	(222, 1, 106, '2013-01-03', 'belanja masak'),
	(223, 1, 106, '2013-01-03', '-'),
	(224, 1, 107, '2013-01-07', 'belanja masak'),
	(225, 1, 107, '2013-01-07', '-'),
	(226, 1, 108, '2013-01-08', 'belanja masak'),
	(227, 1, 108, '2013-01-08', '-'),
	(228, 1, 109, '2013-01-09', 'belanja masak'),
	(229, 1, 109, '2013-01-09', '-'),
	(230, 1, 110, '2013-01-10', 'belanja masak'),
	(231, 1, 110, '2013-01-10', '-'),
	(232, 1, 111, '2013-01-11', 'belanja masak'),
	(233, 1, 111, '2013-01-11', '-'),
	(234, 1, 112, '2013-01-14', 'belanja masak'),
	(235, 1, 112, '2013-01-14', '-'),
	(236, 1, 113, '2013-01-15', 'belanja masak'),
	(237, 1, 113, '2013-01-15', '-'),
	(238, 1, 114, '2013-01-16', 'belanja masak'),
	(239, 1, 114, '2013-01-16', '-'),
	(240, 1, 115, '2013-01-17', 'belanja masak'),
	(241, 1, 115, '2013-01-17', '-'),
	(242, 1, 116, '2013-01-18', 'belanja masak'),
	(243, 1, 116, '2013-01-18', '-'),
	(244, 1, 117, '2013-01-21', 'belanja masak'),
	(245, 1, 117, '2013-01-21', '-'),
	(246, 1, 118, '2013-01-22', 'belanja masak'),
	(247, 1, 118, '2013-01-22', '-'),
	(248, 1, 119, '2013-01-23', 'belanja masak'),
	(249, 1, 119, '2013-01-23', '-'),
	(250, 1, 120, '2013-01-25', 'belanja masak'),
	(251, 1, 120, '2013-01-25', '-'),
	(252, 1, 121, '2013-01-26', 'belanja masak'),
	(253, 1, 121, '2013-01-26', '-'),
	(254, 1, 122, '2013-01-27', 'belanja masak'),
	(255, 1, 122, '2013-01-27', '-'),
	(256, 7, 1, '2013-01-18', 'Andrew Christyanto'),
	(257, 7, 1, '2013-01-18', '-'),
	(258, 7, 2, '2013-01-18', 'Alberthina Verlita Labba'),
	(259, 7, 2, '2013-01-18', '-'),
	(260, 5, 1, '2013-01-18', 'VOID Aktivitas Grup AKG00000001'),
	(261, 5, 1, '2013-01-18', 'VOID Aktivitas Grup AKG00000001'),
	(262, 7, 3, '2013-01-18', 'Andrew Christyanto'),
	(263, 7, 3, '2013-01-18', '-'),
	(264, 7, 4, '2013-01-18', 'Devi Elyvani'),
	(265, 7, 4, '2013-01-18', '-'),
	(266, 7, 5, '2013-01-18', 'Jovan Yordani Geley'),
	(267, 7, 5, '2013-01-18', '-'),
	(268, 7, 6, '2013-01-18', 'Erni Kurniawati'),
	(269, 7, 6, '2013-01-18', '-'),
	(270, 7, 7, '2013-01-23', 'SPP bulan Januari 2013'),
	(271, 7, 7, '2013-01-23', '-'),
	(272, 7, 8, '2013-01-23', 'LKS Semester 2'),
	(273, 7, 8, '2013-01-23', '-'),
	(274, 7, 9, '2013-01-18', 'Keni Junus Karoba'),
	(275, 7, 9, '2013-01-18', '-'),
	(276, 7, 10, '2013-01-15', 'Lusyana Christanti'),
	(277, 7, 10, '2013-01-15', '-'),
	(278, 7, 11, '2013-01-11', 'Seragam OR Alberthina '),
	(279, 7, 11, '2013-01-11', '-'),
	(280, 7, 12, '2013-01-18', 'NIsha Gracia'),
	(281, 7, 12, '2013-01-18', '-'),
	(282, 7, 13, '2013-01-18', 'Rinto'),
	(283, 7, 13, '2013-01-18', '-'),
	(284, 7, 14, '2013-01-09', 'Frengky Amos'),
	(285, 7, 14, '2013-01-09', '-'),
	(286, 7, 15, '2013-01-15', 'DPP Lusy dan Andi '),
	(287, 7, 15, '2013-01-15', '-');
/*!40000 ALTER TABLE `pah_comments` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_donatur: ~3 rows (approximately)
/*!40000 ALTER TABLE `pah_donatur` DISABLE KEYS */;
REPLACE INTO `pah_donatur` (`id`, `name`, `phone`, `alamat`, `inactive`, `pah_chart_master_account_code`) VALUES
	(1, 'Kas Gereja', '-', '-', 0, '410'),
	(2, 'Donatur', '-', '-', 0, '420'),
	(3, 'Lain-lain', '-', '-', 0, '430');
/*!40000 ALTER TABLE `pah_donatur` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_gl_trans: ~299 rows (approximately)
/*!40000 ALTER TABLE `pah_gl_trans` DISABLE KEYS */;
REPLACE INTO `pah_gl_trans` (`counter`, `type`, `type_no`, `tran_date`, `account`, `memo_`, `amount`, `users_id`) VALUES
	(1, 6, 0, '2012-12-31', '110', '-', 2500279, 5),
	(2, 1, 1, '2013-01-01', '530', 'parkir', 4000, 7),
	(3, 1, 1, '2013-01-01', '110', '-', -4000, 7),
	(4, 1, 2, '2013-01-01', '550', 'stop kontak', 40000, 7),
	(5, 1, 2, '2013-01-01', '110', '-', -40000, 7),
	(6, 1, 3, '2013-01-02', '510', 'snack unt tamu', 32000, 7),
	(7, 1, 3, '2013-01-02', '110', '-', -32000, 7),
	(8, 1, 4, '2013-01-02', '530', 'parkir', 2500, 7),
	(9, 1, 4, '2013-01-02', '110', '-', -2500, 7),
	(10, 1, 5, '2013-01-02', '510', 'lauk unt tamu', 23000, 7),
	(11, 1, 5, '2013-01-02', '110', '-', -23000, 7),
	(12, 1, 6, '2013-01-02', '530', 'transport sekolah', 25000, 7),
	(13, 1, 6, '2013-01-02', '110', '-', -25000, 7),
	(14, 1, 7, '2013-01-03', '510', 'lauk unt tamu kel tadus', 70000, 7),
	(15, 1, 7, '2013-01-03', '110', '-', -70000, 7),
	(16, 1, 8, '2013-01-03', '530', 'parkir', 2500, 7),
	(17, 1, 8, '2013-01-03', '110', '-', -2500, 7),
	(18, 1, 9, '2013-01-03', '510', 'gas', 145000, 7),
	(19, 1, 9, '2013-01-03', '110', '-', -145000, 7),
	(20, 1, 10, '2013-01-03', '570', 'fc', 400, 7),
	(21, 1, 10, '2013-01-03', '110', '-', -400, 7),
	(22, 1, 11, '2013-01-03', '540', 'iuran ronda', 30000, 7),
	(23, 1, 11, '2013-01-03', '110', '-', -30000, 7),
	(24, 1, 12, '2013-01-04', '570', 'fc raport dll', 19000, 7),
	(25, 1, 12, '2013-01-04', '110', '-', -19000, 7),
	(26, 1, 13, '2013-01-04', '510', 'kerupuk putih', 30000, 7),
	(27, 1, 13, '2013-01-04', '110', '-', -30000, 7),
	(28, 0, 1, '2013-01-08', '110', '-', 3000000, 7),
	(29, 0, 1, '2013-01-08', '410', 'kas masuk', -3000000, 7),
	(30, 1, 14, '2013-01-04', '530', 'parkir', 3000, 7),
	(31, 1, 14, '2013-01-04', '110', '-', -3000, 7),
	(32, 1, 15, '2013-01-05', '510', 'snack', 40000, 7),
	(33, 1, 15, '2013-01-05', '110', '-', -40000, 7),
	(34, 1, 16, '2013-01-06', '510', 'snack', 8000, 7),
	(35, 1, 16, '2013-01-06', '110', '-', -8000, 7),
	(36, 1, 17, '2013-01-06', '580', 'CTM', 1220, 7),
	(37, 1, 17, '2013-01-06', '110', '-', -1220, 7),
	(38, 1, 18, '2013-01-06', '540', 'PK tukang cuci', 200000, 7),
	(39, 1, 18, '2013-01-06', '110', '-', -200000, 7),
	(40, 1, 19, '2013-01-07', '590', 'ganti ban dalam sepeda', 19000, 7),
	(41, 1, 19, '2013-01-07', '110', '-', -19000, 7),
	(42, 1, 20, '2013-01-07', '530', 'transport sekolah', 150000, 7),
	(43, 1, 20, '2013-01-07', '110', '-', -150000, 7),
	(44, 1, 21, '2013-01-08', '570', 'FC dan jilid - dita', 7700, 7),
	(45, 1, 21, '2013-01-08', '110', '-', -7700, 7),
	(46, 1, 22, '2013-01-08', '570', 'fc denah perjamuan', 7500, 7),
	(47, 1, 22, '2013-01-08', '110', '-', -7500, 7),
	(48, 1, 23, '2013-01-08', '590', 'ganti ban dalam polygon', 19000, 7),
	(49, 1, 23, '2013-01-08', '110', '-', -19000, 7),
	(50, 1, 24, '2013-01-08', '510', 'lauk ', 28000, 7),
	(51, 1, 24, '2013-01-08', '110', '-', -28000, 7),
	(52, 1, 25, '2013-01-08', '530', 'transportasi ambil kulkas', 50000, 7),
	(53, 1, 25, '2013-01-08', '110', '-', -50000, 7),
	(54, 1, 26, '2013-01-08', '570', 'LKS frengky', 16000, 7),
	(55, 1, 26, '2013-01-08', '110', '-', -16000, 7),
	(56, 1, 27, '2013-01-08', '570', 'persembahan SD Kanisius (3 anak)', 15000, 7),
	(57, 1, 27, '2013-01-08', '110', '-', -15000, 7),
	(58, 1, 28, '2013-01-09', '550', 'alat listrik', 66000, 7),
	(59, 1, 28, '2013-01-09', '110', '-', -66000, 7),
	(60, 1, 29, '2013-01-09', '570', 'celana renag unt dimas', 50000, 7),
	(61, 1, 29, '2013-01-09', '110', '-', -50000, 7),
	(62, 1, 30, '2013-01-09', '570', 'sanck dan minum renang ', 48000, 7),
	(63, 1, 30, '2013-01-09', '110', '-', -48000, 7),
	(64, 1, 31, '2013-01-09', '530', 'parkir', 3000, 7),
	(65, 1, 31, '2013-01-09', '110', '-', -3000, 7),
	(66, 1, 32, '2013-01-09', '510', 'gorengan', 10000, 7),
	(67, 1, 32, '2013-01-09', '110', '-', -10000, 7),
	(68, 1, 33, '2013-01-10', '570', 'trasnsport sekolah', 150000, 7),
	(69, 1, 33, '2013-01-10', '110', '-', -150000, 7),
	(70, 1, 34, '2013-01-10', '510', 'air minum', 18000, 7),
	(71, 1, 34, '2013-01-10', '110', '-', -18000, 7),
	(72, 1, 35, '2013-01-10', '510', 'snack ', 15000, 7),
	(73, 1, 35, '2013-01-10', '110', '-', -15000, 7),
	(74, 1, 36, '2013-01-11', '550', 'plastik sampah', 20700, 7),
	(75, 1, 36, '2013-01-11', '110', '-', -20700, 7),
	(76, 1, 37, '2013-01-11', '510', 'snack', 27900, 7),
	(77, 1, 37, '2013-01-11', '110', '-', -27900, 7),
	(78, 1, 38, '2013-01-11', '530', 'parkir', 2000, 7),
	(79, 1, 38, '2013-01-11', '110', '-', -2000, 7),
	(80, 1, 39, '2013-01-11', '590', 'biaya urus ktp dita', 50000, 7),
	(81, 1, 39, '2013-01-11', '110', '-', -50000, 7),
	(82, 1, 40, '2013-01-11', '580', 'potong rambut', 6000, 7),
	(83, 1, 40, '2013-01-11', '110', '-', -6000, 7),
	(84, 1, 41, '2013-01-11', '570', 'jilid tugas', 7000, 7),
	(85, 1, 41, '2013-01-11', '110', '-', -7000, 7),
	(86, 1, 42, '2013-01-12', '510', 'snack', 22000, 7),
	(87, 1, 42, '2013-01-12', '110', '-', -22000, 7),
	(88, 1, 43, '2013-01-12', '540', 'iuran RT dan ronda', 50000, 7),
	(89, 1, 43, '2013-01-12', '110', '-', -50000, 7),
	(90, 1, 44, '2013-01-12', '570', 'iuran natal frengky', 20000, 7),
	(91, 1, 44, '2013-01-12', '110', '-', -20000, 7),
	(92, 1, 45, '2013-01-12', '530', 'parkir', 2000, 7),
	(93, 1, 45, '2013-01-12', '110', '-', -2000, 7),
	(94, 1, 46, '2013-01-12', '580', 'askes', 69000, 7),
	(95, 1, 46, '2013-01-12', '110', '-', -69000, 7),
	(96, 1, 47, '2013-01-13', '510', 'kerupuk putih', 20000, 7),
	(97, 1, 47, '2013-01-13', '110', '-', -20000, 7),
	(98, 1, 48, '2013-01-13', '510', 'lauk', 19000, 7),
	(99, 1, 48, '2013-01-13', '110', '-', -19000, 7),
	(100, 5, 48, '2013-01-13', '110', 'VOID Kas Keluar KKR00000048', 19000, 7),
	(101, 5, 48, '2013-01-13', '510', 'VOID Kas Keluar KKR00000048', -19000, 7),
	(102, 1, 49, '2013-01-13', '510', 'snack', 25000, 7),
	(103, 1, 49, '2013-01-13', '110', '-', -25000, 7),
	(104, 1, 50, '2013-01-13', '530', 'parkir', 2000, 7),
	(105, 1, 50, '2013-01-13', '110', '-', -2000, 7),
	(106, 1, 51, '2013-01-14', '570', 'transport sekolah', 150000, 7),
	(107, 1, 51, '2013-01-14', '110', '-', -150000, 7),
	(108, 5, 51, '2013-01-14', '110', 'VOID Kas Keluar KKR00000051', 150000, 7),
	(109, 5, 51, '2013-01-14', '570', 'VOID Kas Keluar KKR00000051', -150000, 7),
	(110, 1, 52, '2013-01-14', '570', 'uang transport n saku', 150000, 7),
	(111, 1, 52, '2013-01-14', '110', '-', -150000, 7),
	(112, 1, 53, '2013-01-14', '510', 'lauk', 19000, 7),
	(113, 1, 53, '2013-01-14', '110', '-', -19000, 7),
	(114, 1, 54, '2013-01-14', '570', 'perlengkapan sekolah', 10000, 7),
	(115, 1, 54, '2013-01-14', '110', '-', -10000, 7),
	(116, 1, 55, '2013-01-14', '570', 'LKS lusi', 30000, 7),
	(117, 1, 55, '2013-01-14', '110', '-', -30000, 7),
	(118, 1, 56, '2013-01-14', '570', 'kain unt batik _ andi', 15000, 7),
	(119, 1, 56, '2013-01-14', '110', '-', -15000, 7),
	(120, 1, 57, '2013-01-15', '510', 'lauk', 9000, 7),
	(121, 1, 57, '2013-01-15', '110', '-', -9000, 7),
	(122, 1, 58, '2013-01-15', '540', 'rek. telepon', 204360, 7),
	(123, 1, 58, '2013-01-15', '110', '-', -204360, 7),
	(124, 1, 59, '2013-01-15', '540', 'speedy', 214500, 7),
	(125, 1, 59, '2013-01-15', '110', '-', -214500, 7),
	(126, 1, 60, '2013-01-15', '540', 'rek. listrik', 313075, 7),
	(127, 1, 60, '2013-01-15', '110', '-', -313075, 7),
	(128, 1, 61, '2013-01-15', '580', 'multivitamin', 13310, 7),
	(129, 1, 61, '2013-01-15', '110', '-', -13310, 7),
	(130, 1, 62, '2013-01-15', '580', 'kantong karet', 25300, 7),
	(131, 1, 62, '2013-01-15', '110', '-', -25300, 7),
	(132, 1, 63, '2013-01-15', '570', 'fc dan jilid', 2500, 7),
	(133, 1, 63, '2013-01-15', '110', '-', -2500, 7),
	(134, 1, 64, '2013-01-15', '570', 'ATK', 6000, 7),
	(135, 1, 64, '2013-01-15', '110', '-', -6000, 7),
	(136, 1, 65, '2013-01-15', '570', 'selang pianika', 23000, 7),
	(137, 1, 65, '2013-01-15', '110', '-', -23000, 7),
	(138, 1, 66, '2013-01-15', '530', 'parkir', 1000, 7),
	(139, 1, 66, '2013-01-15', '110', '-', -1000, 7),
	(140, 1, 67, '2013-01-16', '570', 'uang saku n transport', 150000, 7),
	(141, 1, 67, '2013-01-16', '110', '-', -150000, 7),
	(142, 1, 68, '2013-01-16', '510', 'gas', 145000, 7),
	(143, 1, 68, '2013-01-16', '110', '-', -145000, 7),
	(144, 1, 69, '2013-01-16', '570', 'ATK', 28800, 7),
	(145, 1, 69, '2013-01-16', '110', '-', -28800, 7),
	(146, 1, 70, '2013-01-16', '530', 'parkir', 4500, 7),
	(147, 1, 70, '2013-01-16', '110', '-', -4500, 7),
	(148, 1, 71, '2013-01-16', '510', 'kedelai', 7900, 7),
	(149, 1, 71, '2013-01-16', '110', '-', -7900, 7),
	(150, 1, 72, '2013-01-17', '570', 'LKS frengky', 25000, 7),
	(151, 1, 72, '2013-01-17', '110', '-', -25000, 7),
	(152, 1, 73, '2013-01-17', '570', 'iuran kelas - lusi', 15000, 7),
	(153, 1, 73, '2013-01-17', '110', '-', -15000, 7),
	(154, 1, 74, '2013-01-17', '510', 'pisang', 9000, 7),
	(155, 1, 74, '2013-01-17', '110', '-', -9000, 7),
	(156, 0, 2, '2013-01-15', '110', '-', 3000000, 7),
	(157, 0, 2, '2013-01-15', '410', 'penerimaan kas', -3000000, 7),
	(158, 0, 3, '2013-01-15', '110', '-', 3000000, 7),
	(159, 0, 3, '2013-01-15', '410', 'penerimaan kas', -3000000, 7),
	(160, 1, 75, '2013-01-18', '510', 'bekal sekolah', 10500, 7),
	(161, 1, 75, '2013-01-18', '110', '-', -10500, 7),
	(162, 1, 76, '2013-01-18', '530', 'parkir', 4000, 7),
	(163, 1, 76, '2013-01-18', '110', '-', -4000, 7),
	(164, 1, 77, '2013-01-18', '510', 'lauk', 32500, 7),
	(165, 1, 77, '2013-01-18', '110', '-', -32500, 7),
	(166, 1, 78, '2013-01-18', '510', 'snack', 20000, 7),
	(167, 1, 78, '2013-01-18', '110', '-', -20000, 7),
	(168, 1, 79, '2013-01-19', '570', 'studi keluar SMP Bopkri 3 (lusi & andi)', 30000, 7),
	(169, 1, 79, '2013-01-19', '110', '-', -30000, 7),
	(170, 1, 80, '2013-01-19', '510', 'gorengan', 36000, 7),
	(171, 1, 80, '2013-01-19', '110', '-', -36000, 7),
	(172, 1, 81, '2013-01-19', '510', 'lauk dan snack unt bekal', 23500, 7),
	(173, 1, 81, '2013-01-19', '110', '-', -23500, 7),
	(174, 1, 82, '2013-01-19', '530', 'parkir', 2000, 7),
	(175, 1, 82, '2013-01-19', '110', '-', -2000, 7),
	(176, 1, 83, '2013-01-19', '550', 'las dandang', 10000, 7),
	(177, 1, 83, '2013-01-19', '110', '-', -10000, 7),
	(178, 1, 84, '2013-01-20', '510', 'sayuran *labu siam, kacang, cabai)', 15000, 7),
	(179, 1, 84, '2013-01-20', '110', '-', -15000, 7),
	(180, 1, 85, '2013-01-20', '570', 'ekskul frengki', 10000, 7),
	(181, 1, 85, '2013-01-20', '110', '-', -10000, 7),
	(182, 1, 86, '2013-01-20', '520', 'so klin pembersih lantai', 7500, 7),
	(183, 1, 86, '2013-01-20', '110', '-', -7500, 7),
	(184, 1, 87, '2013-01-21', '570', 'transport sekolah', 150000, 7),
	(185, 1, 87, '2013-01-21', '110', '-', -150000, 7),
	(186, 1, 88, '2013-01-21', '510', 'sayuran ', 11000, 7),
	(187, 1, 88, '2013-01-21', '110', '-', -11000, 7),
	(188, 1, 89, '2013-01-21', '530', 'parkir', 4500, 7),
	(189, 1, 89, '2013-01-21', '110', '-', -4500, 7),
	(190, 1, 90, '2013-01-21', '510', 'bekal sekolah', 15000, 7),
	(191, 1, 90, '2013-01-21', '110', '-', -15000, 7),
	(192, 1, 91, '2013-01-22', '570', 'ATK, kertas manila', 3800, 7),
	(193, 1, 91, '2013-01-22', '110', '-', -3800, 7),
	(194, 1, 92, '2013-01-22', '550', 'plastik klip', 4600, 7),
	(195, 1, 92, '2013-01-22', '110', '-', -4600, 7),
	(196, 1, 93, '2013-01-22', '510', 'bekal sekolah', 17500, 7),
	(197, 1, 93, '2013-01-22', '110', '-', -17500, 7),
	(198, 1, 94, '2013-01-23', '570', 'LKS andi', 30000, 7),
	(199, 1, 94, '2013-01-23', '110', '-', -30000, 7),
	(200, 1, 95, '2013-01-23', '550', 'karet mesin cuci', 20000, 7),
	(201, 1, 95, '2013-01-23', '110', '-', -20000, 7),
	(202, 1, 96, '2013-01-23', '510', 'bekal sekolah ', 9000, 7),
	(203, 1, 96, '2013-01-23', '110', '-', -9000, 7),
	(204, 1, 97, '2013-01-24', '570', 'ATK kertas manila', 1100, 7),
	(205, 1, 97, '2013-01-24', '110', '-', -1100, 7),
	(206, 1, 98, '2013-01-25', '570', 'transport sekolah', 100000, 7),
	(207, 1, 98, '2013-01-25', '110', '-', -100000, 7),
	(208, 1, 99, '2013-01-26', '510', 'snack', 27000, 7),
	(209, 1, 99, '2013-01-26', '110', '-', -27000, 7),
	(210, 1, 100, '2013-01-27', '580', 'kapas', 3000, 7),
	(211, 1, 100, '2013-01-27', '110', '-', -3000, 7),
	(212, 1, 101, '2013-01-27', '570', 'pewarna unt hasta karya', 3400, 7),
	(213, 1, 101, '2013-01-27', '110', '-', -3400, 7),
	(214, 1, 102, '2013-01-27', '540', 'tambahan tk sampah', 10000, 7),
	(215, 1, 102, '2013-01-27', '110', '-', -10000, 7),
	(216, 1, 103, '2013-01-01', '510', 'belanja masak', 254000, 7),
	(217, 1, 103, '2013-01-01', '110', '-', -254000, 7),
	(218, 1, 104, '2013-01-02', '510', 'tempe, bawang', 46000, 7),
	(219, 1, 104, '2013-01-02', '110', '-', -46000, 7),
	(220, 1, 105, '2013-01-04', '510', 'belanja masak', 173500, 7),
	(221, 1, 105, '2013-01-04', '110', '-', -173500, 7),
	(222, 1, 106, '2013-01-03', '510', 'belanja masak', 25500, 7),
	(223, 1, 106, '2013-01-03', '110', '-', -25500, 7),
	(224, 1, 107, '2013-01-07', '510', 'belanja masak', 54000, 7),
	(225, 1, 107, '2013-01-07', '110', '-', -54000, 7),
	(226, 1, 108, '2013-01-08', '510', 'belanja masak', 47000, 7),
	(227, 1, 108, '2013-01-08', '110', '-', -47000, 7),
	(228, 1, 109, '2013-01-09', '510', 'belanja masak', 161000, 7),
	(229, 1, 109, '2013-01-09', '110', '-', -161000, 7),
	(230, 1, 110, '2013-01-10', '510', 'belanja masak', 75000, 7),
	(231, 1, 110, '2013-01-10', '110', '-', -75000, 7),
	(232, 1, 111, '2013-01-11', '510', 'belanja masak', 105000, 7),
	(233, 1, 111, '2013-01-11', '110', '-', -105000, 7),
	(234, 1, 112, '2013-01-14', '510', 'belanja masak', 146000, 7),
	(235, 1, 112, '2013-01-14', '110', '-', -146000, 7),
	(236, 1, 113, '2013-01-15', '510', 'belanja masak', 124000, 7),
	(237, 1, 113, '2013-01-15', '110', '-', -124000, 7),
	(238, 1, 114, '2013-01-16', '510', 'belanja masak', 116500, 7),
	(239, 1, 114, '2013-01-16', '110', '-', -116500, 7),
	(240, 1, 115, '2013-01-17', '510', 'belanja masak', 159000, 7),
	(241, 1, 115, '2013-01-17', '110', '-', -159000, 7),
	(242, 1, 116, '2013-01-18', '510', 'belanja masak', 41000, 7),
	(243, 1, 116, '2013-01-18', '110', '-', -41000, 7),
	(244, 1, 117, '2013-01-21', '510', 'belanja masak', 132000, 7),
	(245, 1, 117, '2013-01-21', '110', '-', -132000, 7),
	(246, 1, 118, '2013-01-22', '510', 'belanja masak', 27000, 7),
	(247, 1, 118, '2013-01-22', '110', '-', -27000, 7),
	(248, 1, 119, '2013-01-23', '510', 'belanja masak', 49000, 7),
	(249, 1, 119, '2013-01-23', '110', '-', -49000, 7),
	(250, 1, 120, '2013-01-25', '510', 'belanja masak', 161000, 7),
	(251, 1, 120, '2013-01-25', '110', '-', -161000, 7),
	(252, 1, 121, '2013-01-26', '510', 'belanja masak', 56000, 7),
	(253, 1, 121, '2013-01-26', '110', '-', -56000, 7),
	(254, 1, 122, '2013-01-27', '510', 'belanja masak', 52500, 7),
	(255, 1, 122, '2013-01-27', '110', '-', -52500, 7),
	(256, 7, 1, '2013-01-18', '570', 'Andrew Christyanto', 60000, 7),
	(257, 7, 1, '2013-01-18', '110', '-', -60000, 7),
	(258, 7, 2, '2013-01-18', '570', 'Alberthina Verlita Labba', 60000, 7),
	(259, 7, 2, '2013-01-18', '110', '-', -60000, 7),
	(260, 5, 1, '2013-01-18', '110', 'VOID Aktivitas Grup AKG00000001', 60000, 7),
	(261, 5, 1, '2013-01-18', '570', 'VOID Aktivitas Grup AKG00000001', -60000, 7),
	(262, 7, 3, '2013-01-18', '570', 'Andrew Christyanto', 60000, 7),
	(263, 7, 3, '2013-01-18', '110', '-', -60000, 7),
	(264, 7, 4, '2013-01-18', '570', 'Devi Elyvani', 60000, 7),
	(265, 7, 4, '2013-01-18', '110', '-', -60000, 7),
	(266, 7, 5, '2013-01-18', '570', 'Jovan Yordani Geley', 60000, 7),
	(267, 7, 5, '2013-01-18', '120', '-', -60000, 7),
	(268, 7, 6, '2013-01-18', '570', 'Erni Kurniawati', 60000, 7),
	(269, 7, 6, '2013-01-18', '110', '-', -60000, 7),
	(270, 7, 7, '2013-01-23', '570', 'SPP bulan Januari 2013', 150000, 7),
	(271, 7, 7, '2013-01-23', '110', '-', -150000, 7),
	(272, 7, 8, '2013-01-23', '570', 'LKS Semester 2', 450000, 7),
	(273, 7, 8, '2013-01-23', '110', '-', -450000, 7),
	(274, 7, 9, '2013-01-18', '570', 'Keni Junus Karoba', 60000, 7),
	(275, 7, 9, '2013-01-18', '110', '-', -60000, 7),
	(276, 7, 10, '2013-01-15', '570', 'Lusyana Christanti', 135000, 7),
	(277, 7, 10, '2013-01-15', '110', '-', -135000, 7),
	(278, 7, 11, '2013-01-11', '570', 'Seragam OR Alberthina ', 50000, 7),
	(279, 7, 11, '2013-01-11', '110', '-', -50000, 7),
	(280, 7, 12, '2013-01-18', '570', 'NIsha Gracia', 179000, 7),
	(281, 7, 12, '2013-01-18', '110', '-', -179000, 7),
	(282, 7, 13, '2013-01-18', '570', 'Rinto', 300000, 7),
	(283, 7, 13, '2013-01-18', '110', '-', -300000, 7),
	(284, 7, 14, '2013-01-09', '570', 'Frengky Amos', 350000, 7),
	(285, 7, 14, '2013-01-09', '110', '-', -350000, 7),
	(286, 7, 15, '2013-01-15', '570', 'DPP Lusy dan Andi ', 800000, 7),
	(287, 7, 15, '2013-01-15', '110', '-', -800000, 7);
/*!40000 ALTER TABLE `pah_gl_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_kas_keluar: ~122 rows (approximately)
/*!40000 ALTER TABLE `pah_kas_keluar` DISABLE KEYS */;
REPLACE INTO `pah_kas_keluar` (`kas_keluar_id`, `doc_ref`, `no_bukti`, `amount`, `entry_time`, `trans_date`, `trans_via`, `pah_suppliers_supplier_id`, `pah_chart_master_account_code`, `pah_bank_accounts_id`, `users_id`, `note`) VALUES
	(1, 'KKR00000001', NULL, 4000, '2013-01-07 19:14:01', '2013-01-01', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(2, 'KKR00000002', NULL, 40000, '2013-01-07 19:14:54', '2013-01-01', 'Tunai', 4, '550', 7, 7, 'stop kontak'),
	(3, 'KKR00000003', NULL, 32000, '2013-01-07 19:15:34', '2013-01-02', 'Tunai', 2, '510', 7, 7, 'snack unt tamu'),
	(4, 'KKR00000004', NULL, 2500, '2013-01-07 19:16:06', '2013-01-02', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(5, 'KKR00000005', NULL, 23000, '2013-01-07 19:16:58', '2013-01-02', 'Tunai', 4, '510', 7, 7, 'lauk unt tamu'),
	(6, 'KKR00000006', NULL, 25000, '2013-01-07 19:18:12', '2013-01-02', 'Tunai', 4, '530', 7, 7, 'transport sekolah'),
	(7, 'KKR00000007', NULL, 70000, '2013-01-07 19:19:04', '2013-01-03', 'Tunai', 4, '510', 7, 7, 'lauk unt tamu kel tadus'),
	(8, 'KKR00000008', NULL, 2500, '2013-01-07 19:19:51', '2013-01-03', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(9, 'KKR00000009', NULL, 145000, '2013-01-07 19:20:28', '2013-01-03', 'Tunai', 4, '510', 7, 7, 'gas'),
	(10, 'KKR00000010', NULL, 400, '2013-01-07 19:21:16', '2013-01-03', 'Tunai', 4, '570', 7, 7, 'fc'),
	(11, 'KKR00000011', NULL, 30000, '2013-01-07 19:21:59', '2013-01-03', 'Tunai', 4, '540', 7, 7, 'iuran ronda'),
	(12, 'KKR00000012', NULL, 19000, '2013-01-07 19:22:46', '2013-01-04', 'Tunai', 4, '570', 7, 7, 'fc raport dll'),
	(13, 'KKR00000013', NULL, 30000, '2013-01-07 19:23:20', '2013-01-04', 'Tunai', 4, '510', 7, 7, 'kerupuk putih'),
	(14, 'KKR00000014', NULL, 3000, '2013-01-12 13:38:14', '2013-01-04', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(15, 'KKR00000015', NULL, 40000, '2013-01-12 13:39:28', '2013-01-05', 'Tunai', 2, '510', 7, 7, 'snack'),
	(16, 'KKR00000016', NULL, 8000, '2013-01-12 13:40:09', '2013-01-06', 'Tunai', 2, '510', 7, 7, 'snack'),
	(17, 'KKR00000017', NULL, 1220, '2013-01-12 13:40:55', '2013-01-06', 'Tunai', 4, '580', 7, 7, 'CTM'),
	(18, 'KKR00000018', NULL, 200000, '2013-01-12 13:41:58', '2013-01-06', 'Tunai', 4, '540', 7, 7, 'PK tukang cuci'),
	(19, 'KKR00000019', NULL, 19000, '2013-01-12 13:42:58', '2013-01-07', 'Tunai', 4, '590', 7, 7, 'ganti ban dalam sepeda'),
	(20, 'KKR00000020', NULL, 150000, '2013-01-12 13:44:23', '2013-01-07', 'Tunai', 4, '530', 7, 7, 'transport sekolah'),
	(21, 'KKR00000021', NULL, 7700, '2013-01-12 13:45:33', '2013-01-08', 'Tunai', 4, '570', 7, 7, 'FC dan jilid - dita'),
	(22, 'KKR00000022', NULL, 7500, '2013-01-12 13:46:33', '2013-01-08', 'Tunai', 4, '570', 7, 7, 'fc denah perjamuan'),
	(23, 'KKR00000023', NULL, 19000, '2013-01-12 13:47:29', '2013-01-08', 'Tunai', 4, '590', 7, 7, 'ganti ban dalam polygon'),
	(24, 'KKR00000024', NULL, 28000, '2013-01-12 13:48:23', '2013-01-08', 'Tunai', 4, '510', 7, 7, 'lauk '),
	(25, 'KKR00000025', NULL, 50000, '2013-01-12 13:49:07', '2013-01-08', 'Tunai', 4, '530', 7, 7, 'transportasi ambil kulkas'),
	(26, 'KKR00000026', NULL, 16000, '2013-01-12 13:50:10', '2013-01-08', 'Tunai', 4, '570', 7, 7, 'LKS frengky'),
	(27, 'KKR00000027', NULL, 15000, '2013-01-12 13:51:00', '2013-01-08', 'Tunai', 4, '570', 7, 7, 'persembahan SD Kanisius (3 anak)'),
	(28, 'KKR00000028', NULL, 66000, '2013-01-12 13:52:29', '2013-01-09', 'Tunai', 4, '550', 7, 7, 'alat listrik'),
	(29, 'KKR00000029', NULL, 50000, '2013-01-12 13:53:15', '2013-01-09', 'Tunai', 4, '570', 7, 7, 'celana renag unt dimas'),
	(30, 'KKR00000030', NULL, 48000, '2013-01-12 13:54:01', '2013-01-09', 'Tunai', 4, '570', 7, 7, 'sanck dan minum renang '),
	(31, 'KKR00000031', NULL, 3000, '2013-01-12 13:54:41', '2013-01-09', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(32, 'KKR00000032', NULL, 10000, '2013-01-12 13:55:17', '2013-01-09', 'Tunai', 4, '510', 7, 7, 'gorengan'),
	(33, 'KKR00000033', NULL, 150000, '2013-01-12 13:56:12', '2013-01-10', 'Tunai', 4, '570', 7, 7, 'trasnsport sekolah'),
	(34, 'KKR00000034', NULL, 18000, '2013-01-18 16:39:32', '2013-01-10', 'Tunai', 4, '510', 7, 7, 'air minum'),
	(35, 'KKR00000035', NULL, 15000, '2013-01-18 16:40:38', '2013-01-10', 'Tunai', 4, '510', 7, 7, 'snack '),
	(36, 'KKR00000036', NULL, 20700, '2013-01-18 16:41:37', '2013-01-11', 'Tunai', 4, '550', 7, 7, 'plastik sampah'),
	(37, 'KKR00000037', NULL, 27900, '2013-01-18 16:42:15', '2013-01-11', 'Tunai', 4, '510', 7, 7, 'snack'),
	(38, 'KKR00000038', NULL, 2000, '2013-01-18 16:42:56', '2013-01-11', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(39, 'KKR00000039', NULL, 50000, '2013-01-18 16:44:34', '2013-01-11', 'Tunai', 4, '590', 7, 7, 'biaya urus ktp dita'),
	(40, 'KKR00000040', NULL, 6000, '2013-01-18 16:46:06', '2013-01-11', 'Tunai', 4, '580', 7, 7, 'potong rambut'),
	(41, 'KKR00000041', NULL, 7000, '2013-01-18 16:47:09', '2013-01-11', 'Tunai', 4, '570', 7, 7, 'jilid tugas'),
	(42, 'KKR00000042', NULL, 22000, '2013-01-18 16:48:05', '2013-01-12', 'Tunai', 4, '510', 7, 7, 'snack'),
	(43, 'KKR00000043', NULL, 50000, '2013-01-18 16:49:50', '2013-01-12', 'Tunai', 4, '540', 7, 7, 'iuran RT dan ronda'),
	(44, 'KKR00000044', NULL, 20000, '2013-01-18 16:50:53', '2013-01-12', 'Tunai', 4, '570', 7, 7, 'iuran natal frengky'),
	(45, 'KKR00000045', NULL, 2000, '2013-01-18 16:51:32', '2013-01-12', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(46, 'KKR00000046', NULL, 69000, '2013-01-18 16:52:37', '2013-01-12', 'Tunai', 4, '580', 7, 7, 'askes'),
	(47, 'KKR00000047', NULL, 20000, '2013-01-18 16:54:37', '2013-01-13', 'Tunai', 4, '510', 7, 7, 'kerupuk putih'),
	(48, 'KKR00000048', NULL, 19000, '2013-01-18 16:55:24', '2013-01-13', 'Tunai', 4, '510', 7, 7, 'lauk'),
	(49, 'KKR00000049', NULL, 25000, '2013-01-18 16:56:57', '2013-01-13', 'Tunai', 4, '510', 7, 7, 'snack'),
	(50, 'KKR00000050', NULL, 2000, '2013-01-18 16:57:37', '2013-01-13', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(51, 'KKR00000051', NULL, 150000, '2013-01-18 16:58:40', '2013-01-14', 'Tunai', 4, '570', 7, 7, 'transport sekolah'),
	(52, 'KKR00000052', NULL, 150000, '2013-01-18 17:00:26', '2013-01-14', 'Tunai', 4, '570', 7, 7, 'uang transport n saku'),
	(53, 'KKR00000053', NULL, 19000, '2013-01-18 17:01:52', '2013-01-14', 'Tunai', 4, '510', 7, 7, 'lauk'),
	(54, 'KKR00000054', NULL, 10000, '2013-01-18 17:02:48', '2013-01-14', 'Tunai', 4, '570', 7, 7, 'perlengkapan sekolah'),
	(55, 'KKR00000055', NULL, 30000, '2013-01-18 17:03:46', '2013-01-14', 'Tunai', 4, '570', 7, 7, 'LKS lusi'),
	(56, 'KKR00000056', NULL, 15000, '2013-01-18 17:04:49', '2013-01-14', 'Tunai', 4, '570', 7, 7, 'kain unt batik _ andi'),
	(57, 'KKR00000057', NULL, 9000, '2013-01-18 17:05:51', '2013-01-15', 'Tunai', 4, '510', 7, 7, 'lauk'),
	(58, 'KKR00000058', NULL, 204360, '2013-01-18 17:06:55', '2013-01-15', 'Tunai', 4, '540', 7, 7, 'rek. telepon'),
	(59, 'KKR00000059', NULL, 214500, '2013-01-18 17:08:00', '2013-01-15', 'Tunai', 4, '540', 7, 7, 'speedy'),
	(60, 'KKR00000060', NULL, 313075, '2013-01-18 17:08:50', '2013-01-15', 'Tunai', 4, '540', 7, 7, 'rek. listrik'),
	(61, 'KKR00000061', NULL, 13310, '2013-01-18 17:09:54', '2013-01-15', 'Tunai', 4, '580', 7, 7, 'multivitamin'),
	(62, 'KKR00000062', NULL, 25300, '2013-01-18 17:10:54', '2013-01-15', 'Tunai', 4, '580', 7, 7, 'kantong karet'),
	(63, 'KKR00000063', NULL, 2500, '2013-01-18 17:11:48', '2013-01-15', 'Tunai', 4, '570', 7, 7, 'fc dan jilid'),
	(64, 'KKR00000064', NULL, 6000, '2013-01-18 17:14:02', '2013-01-15', 'Tunai', 4, '570', 7, 7, 'ATK'),
	(65, 'KKR00000065', NULL, 23000, '2013-01-18 17:14:49', '2013-01-15', 'Tunai', 4, '570', 7, 7, 'selang pianika'),
	(66, 'KKR00000066', NULL, 1000, '2013-01-18 17:16:23', '2013-01-15', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(67, 'KKR00000067', NULL, 150000, '2013-01-18 17:17:33', '2013-01-16', 'Tunai', 4, '570', 7, 7, 'uang saku n transport'),
	(68, 'KKR00000068', NULL, 145000, '2013-01-18 17:19:25', '2013-01-16', 'Tunai', 4, '510', 7, 7, 'gas'),
	(69, 'KKR00000069', NULL, 28800, '2013-01-18 17:20:20', '2013-01-16', 'Tunai', 4, '570', 7, 7, 'ATK'),
	(70, 'KKR00000070', NULL, 4500, '2013-01-18 17:21:05', '2013-01-16', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(71, 'KKR00000071', NULL, 7900, '2013-01-18 17:22:08', '2013-01-16', 'Tunai', 3, '510', 7, 7, 'kedelai'),
	(72, 'KKR00000072', NULL, 25000, '2013-01-18 17:23:10', '2013-01-17', 'Tunai', 4, '570', 7, 7, 'LKS frengky'),
	(73, 'KKR00000073', NULL, 15000, '2013-01-18 17:23:51', '2013-01-17', 'Tunai', 4, '570', 7, 7, 'iuran kelas - lusi'),
	(74, 'KKR00000074', NULL, 9000, '2013-01-18 17:24:27', '2013-01-17', 'Tunai', 2, '510', 7, 7, 'pisang'),
	(75, 'KKR00000075', NULL, 10500, '2013-01-28 14:50:26', '2013-01-18', 'Tunai', 4, '510', 7, 7, 'bekal sekolah'),
	(76, 'KKR00000076', NULL, 4000, '2013-01-28 14:51:10', '2013-01-18', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(77, 'KKR00000077', NULL, 32500, '2013-01-28 14:52:15', '2013-01-18', 'Tunai', 2, '510', 7, 7, 'lauk'),
	(78, 'KKR00000078', NULL, 20000, '2013-01-28 14:52:51', '2013-01-18', 'Tunai', 4, '510', 7, 7, 'snack'),
	(79, 'KKR00000079', NULL, 30000, '2013-01-28 14:54:08', '2013-01-19', 'Tunai', 4, '570', 7, 7, 'studi keluar SMP Bopkri 3 (lusi & andi)'),
	(80, 'KKR00000080', NULL, 36000, '2013-01-28 14:54:47', '2013-01-19', 'Tunai', 4, '510', 7, 7, 'gorengan'),
	(81, 'KKR00000081', NULL, 23500, '2013-01-28 14:56:00', '2013-01-19', 'Tunai', 4, '510', 7, 7, 'lauk dan snack unt bekal'),
	(82, 'KKR00000082', NULL, 2000, '2013-01-28 14:56:35', '2013-01-19', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(83, 'KKR00000083', NULL, 10000, '2013-01-28 14:57:19', '2013-01-19', 'Tunai', 4, '550', 7, 7, 'las dandang'),
	(84, 'KKR00000084', NULL, 15000, '2013-01-28 14:58:16', '2013-01-20', 'Tunai', 2, '510', 7, 7, 'sayuran *labu siam, kacang, cabai)'),
	(85, 'KKR00000085', NULL, 10000, '2013-01-28 14:58:55', '2013-01-20', 'Tunai', 4, '570', 7, 7, 'ekskul frengki'),
	(86, 'KKR00000086', NULL, 7500, '2013-01-28 15:00:03', '2013-01-20', 'Tunai', 4, '520', 7, 7, 'so klin pembersih lantai'),
	(87, 'KKR00000087', NULL, 150000, '2013-01-28 15:01:06', '2013-01-21', 'Tunai', 4, '570', 7, 7, 'transport sekolah'),
	(88, 'KKR00000088', NULL, 11000, '2013-01-28 15:01:52', '2013-01-21', 'Tunai', 2, '510', 7, 7, 'sayuran '),
	(89, 'KKR00000089', NULL, 4500, '2013-01-28 15:02:28', '2013-01-21', 'Tunai', 4, '530', 7, 7, 'parkir'),
	(90, 'KKR00000090', NULL, 15000, '2013-01-28 15:03:14', '2013-01-21', 'Tunai', 4, '510', 7, 7, 'bekal sekolah'),
	(91, 'KKR00000091', NULL, 3800, '2013-01-28 15:04:00', '2013-01-22', 'Tunai', 4, '570', 7, 7, 'ATK, kertas manila'),
	(92, 'KKR00000092', NULL, 4600, '2013-01-28 15:05:01', '2013-01-22', 'Tunai', 4, '550', 7, 7, 'plastik klip'),
	(93, 'KKR00000093', NULL, 17500, '2013-01-28 15:05:31', '2013-01-22', 'Tunai', 4, '510', 7, 7, 'bekal sekolah'),
	(94, 'KKR00000094', NULL, 30000, '2013-01-28 15:06:19', '2013-01-23', 'Tunai', 4, '570', 7, 7, 'LKS andi'),
	(95, 'KKR00000095', NULL, 20000, '2013-01-28 15:07:02', '2013-01-23', 'Tunai', 4, '550', 7, 7, 'karet mesin cuci'),
	(96, 'KKR00000096', NULL, 9000, '2013-01-28 15:07:38', '2013-01-23', 'Tunai', 4, '510', 7, 7, 'bekal sekolah '),
	(97, 'KKR00000097', NULL, 1100, '2013-01-28 15:08:31', '2013-01-24', 'Tunai', 4, '570', 7, 7, 'ATK kertas manila'),
	(98, 'KKR00000098', NULL, 100000, '2013-01-28 15:09:34', '2013-01-25', 'Tunai', 4, '570', 7, 7, 'transport sekolah'),
	(99, 'KKR00000099', NULL, 27000, '2013-01-28 15:10:12', '2013-01-26', 'Tunai', 4, '510', 7, 7, 'snack'),
	(100, 'KKR00000100', NULL, 3000, '2013-01-28 15:10:51', '2013-01-27', 'Tunai', 4, '580', 7, 7, 'kapas'),
	(101, 'KKR00000101', NULL, 3400, '2013-01-28 15:11:35', '2013-01-27', 'Tunai', 4, '570', 7, 7, 'pewarna unt hasta karya'),
	(102, 'KKR00000102', NULL, 10000, '2013-01-28 15:12:22', '2013-01-27', 'Tunai', 4, '540', 7, 7, 'tambahan tk sampah'),
	(103, 'KKR00000103', NULL, 254000, '2013-01-28 15:14:08', '2013-01-01', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(104, 'KKR00000104', NULL, 46000, '2013-01-28 15:15:43', '2013-01-02', 'Tunai', 2, '510', 7, 7, 'tempe, bawang'),
	(105, 'KKR00000105', NULL, 173500, '2013-01-28 15:16:43', '2013-01-04', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(106, 'KKR00000106', NULL, 25500, '2013-01-28 15:17:31', '2013-01-03', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(107, 'KKR00000107', NULL, 54000, '2013-01-28 15:18:19', '2013-01-07', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(108, 'KKR00000108', NULL, 47000, '2013-01-28 15:18:58', '2013-01-08', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(109, 'KKR00000109', NULL, 161000, '2013-01-28 15:19:44', '2013-01-09', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(110, 'KKR00000110', NULL, 75000, '2013-01-28 15:20:23', '2013-01-10', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(111, 'KKR00000111', NULL, 105000, '2013-01-28 15:21:17', '2013-01-11', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(112, 'KKR00000112', NULL, 146000, '2013-01-28 15:22:11', '2013-01-14', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(113, 'KKR00000113', NULL, 124000, '2013-01-28 15:24:12', '2013-01-15', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(114, 'KKR00000114', NULL, 116500, '2013-01-28 15:26:05', '2013-01-16', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(115, 'KKR00000115', NULL, 159000, '2013-01-28 15:27:06', '2013-01-17', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(116, 'KKR00000116', NULL, 41000, '2013-01-28 15:27:59', '2013-01-18', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(117, 'KKR00000117', NULL, 132000, '2013-01-28 15:29:14', '2013-01-21', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(118, 'KKR00000118', NULL, 27000, '2013-01-28 15:29:54', '2013-01-22', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(119, 'KKR00000119', NULL, 49000, '2013-01-28 15:30:39', '2013-01-23', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(120, 'KKR00000120', NULL, 161000, '2013-01-28 15:32:00', '2013-01-25', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(121, 'KKR00000121', NULL, 56000, '2013-01-28 15:32:45', '2013-01-26', 'Tunai', 2, '510', 7, 7, 'belanja masak'),
	(122, 'KKR00000122', NULL, 52500, '2013-01-28 15:33:32', '2013-01-27', 'Tunai', 2, '510', 7, 7, 'belanja masak');
/*!40000 ALTER TABLE `pah_kas_keluar` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_kas_masuk: ~3 rows (approximately)
/*!40000 ALTER TABLE `pah_kas_masuk` DISABLE KEYS */;
REPLACE INTO `pah_kas_masuk` (`kas_masuk_id`, `doc_ref`, `no_bukti`, `amount`, `entry_time`, `trans_date`, `trans_via`, `pah_donatur_id`, `pah_bank_accounts_id`, `users_id`, `note`) VALUES
	(1, 'KMS00000001', NULL, 3000000, '2013-01-12 13:36:12', '2013-01-08', 'Tunai', 1, 7, 7, 'kas masuk'),
	(2, 'KMS00000002', NULL, 3000000, '2013-01-28 14:48:17', '2013-01-15', 'Tunai', 1, 7, 7, 'penerimaan kas'),
	(3, 'KMS00000003', NULL, 3000000, '2013-01-28 14:49:14', '2013-01-15', 'Tunai', 1, 7, 7, 'penerimaan kas');
/*!40000 ALTER TABLE `pah_kas_masuk` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_lampiran: ~1 rows (approximately)
/*!40000 ALTER TABLE `pah_lampiran` DISABLE KEYS */;
REPLACE INTO `pah_lampiran` (`id_lampiran`, `nama`, `trans_date`, `keterangan`, `satuan`, `qty`, `entry_time`) VALUES
	(1, 'Kekel Food', '2013-01-06', 'nuget. sosis, bakso, dan  lain ebagainya.', 'pak', 8, '2013-01-07 19:12:44');
/*!40000 ALTER TABLE `pah_lampiran` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_member: ~28 rows (approximately)
/*!40000 ALTER TABLE `pah_member` DISABLE KEYS */;
REPLACE INTO `pah_member` (`id`, `jemaat_nij`, `inactive`) VALUES
	(1, '3', 0),
	(2, '4', 0),
	(3, '5', 0),
	(4, '10', 0),
	(5, '11', 0),
	(6, '12', 0),
	(7, '13', 0),
	(9, '14', 0),
	(10, '15', 0),
	(11, '16', 0),
	(12, '17', 0),
	(13, '18', 0),
	(14, '19', 0),
	(15, '20', 0),
	(16, '21', 0),
	(17, '22', 0),
	(18, '23', 0),
	(19, '24', 0),
	(20, '25', 0),
	(21, '26', 0),
	(22, '27', 0),
	(23, '6', 0),
	(24, '7', 0),
	(25, '8', 0),
	(26, '9', 0),
	(27, '28', 0),
	(28, '29', 0),
	(29, '30', 0);
/*!40000 ALTER TABLE `pah_member` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_refs: ~140 rows (approximately)
/*!40000 ALTER TABLE `pah_refs` DISABLE KEYS */;
REPLACE INTO `pah_refs` (`id`, `type_no`, `type`, `reference`) VALUES
	(1, 1, 1, 'KKR00000001'),
	(2, 2, 1, 'KKR00000002'),
	(3, 3, 1, 'KKR00000003'),
	(4, 4, 1, 'KKR00000004'),
	(5, 5, 1, 'KKR00000005'),
	(6, 6, 1, 'KKR00000006'),
	(7, 7, 1, 'KKR00000007'),
	(8, 8, 1, 'KKR00000008'),
	(9, 9, 1, 'KKR00000009'),
	(10, 10, 1, 'KKR00000010'),
	(11, 11, 1, 'KKR00000011'),
	(12, 12, 1, 'KKR00000012'),
	(13, 13, 1, 'KKR00000013'),
	(14, 1, 0, 'KMS00000001'),
	(15, 14, 1, 'KKR00000014'),
	(16, 15, 1, 'KKR00000015'),
	(17, 16, 1, 'KKR00000016'),
	(18, 17, 1, 'KKR00000017'),
	(19, 18, 1, 'KKR00000018'),
	(20, 19, 1, 'KKR00000019'),
	(21, 20, 1, 'KKR00000020'),
	(22, 21, 1, 'KKR00000021'),
	(23, 22, 1, 'KKR00000022'),
	(24, 23, 1, 'KKR00000023'),
	(25, 24, 1, 'KKR00000024'),
	(26, 25, 1, 'KKR00000025'),
	(27, 26, 1, 'KKR00000026'),
	(28, 27, 1, 'KKR00000027'),
	(29, 28, 1, 'KKR00000028'),
	(30, 29, 1, 'KKR00000029'),
	(31, 30, 1, 'KKR00000030'),
	(32, 31, 1, 'KKR00000031'),
	(33, 32, 1, 'KKR00000032'),
	(34, 33, 1, 'KKR00000033'),
	(35, 34, 1, 'KKR00000034'),
	(36, 35, 1, 'KKR00000035'),
	(37, 36, 1, 'KKR00000036'),
	(38, 37, 1, 'KKR00000037'),
	(39, 38, 1, 'KKR00000038'),
	(40, 39, 1, 'KKR00000039'),
	(41, 40, 1, 'KKR00000040'),
	(42, 41, 1, 'KKR00000041'),
	(43, 42, 1, 'KKR00000042'),
	(44, 43, 1, 'KKR00000043'),
	(45, 44, 1, 'KKR00000044'),
	(46, 45, 1, 'KKR00000045'),
	(47, 46, 1, 'KKR00000046'),
	(48, 47, 1, 'KKR00000047'),
	(49, 48, 1, 'KKR00000048'),
	(50, 49, 1, 'KKR00000049'),
	(51, 50, 1, 'KKR00000050'),
	(52, 51, 1, 'KKR00000051'),
	(53, 52, 1, 'KKR00000052'),
	(54, 53, 1, 'KKR00000053'),
	(55, 54, 1, 'KKR00000054'),
	(56, 55, 1, 'KKR00000055'),
	(57, 56, 1, 'KKR00000056'),
	(58, 57, 1, 'KKR00000057'),
	(59, 58, 1, 'KKR00000058'),
	(60, 59, 1, 'KKR00000059'),
	(61, 60, 1, 'KKR00000060'),
	(62, 61, 1, 'KKR00000061'),
	(63, 62, 1, 'KKR00000062'),
	(64, 63, 1, 'KKR00000063'),
	(65, 64, 1, 'KKR00000064'),
	(66, 65, 1, 'KKR00000065'),
	(67, 66, 1, 'KKR00000066'),
	(68, 67, 1, 'KKR00000067'),
	(69, 68, 1, 'KKR00000068'),
	(70, 69, 1, 'KKR00000069'),
	(71, 70, 1, 'KKR00000070'),
	(72, 71, 1, 'KKR00000071'),
	(73, 72, 1, 'KKR00000072'),
	(74, 73, 1, 'KKR00000073'),
	(75, 74, 1, 'KKR00000074'),
	(76, 2, 0, 'KMS00000002'),
	(77, 3, 0, 'KMS00000003'),
	(78, 75, 1, 'KKR00000075'),
	(79, 76, 1, 'KKR00000076'),
	(80, 77, 1, 'KKR00000077'),
	(81, 78, 1, 'KKR00000078'),
	(82, 79, 1, 'KKR00000079'),
	(83, 80, 1, 'KKR00000080'),
	(84, 81, 1, 'KKR00000081'),
	(85, 82, 1, 'KKR00000082'),
	(86, 83, 1, 'KKR00000083'),
	(87, 84, 1, 'KKR00000084'),
	(88, 85, 1, 'KKR00000085'),
	(89, 86, 1, 'KKR00000086'),
	(90, 87, 1, 'KKR00000087'),
	(91, 88, 1, 'KKR00000088'),
	(92, 89, 1, 'KKR00000089'),
	(93, 90, 1, 'KKR00000090'),
	(94, 91, 1, 'KKR00000091'),
	(95, 92, 1, 'KKR00000092'),
	(96, 93, 1, 'KKR00000093'),
	(97, 94, 1, 'KKR00000094'),
	(98, 95, 1, 'KKR00000095'),
	(99, 96, 1, 'KKR00000096'),
	(100, 97, 1, 'KKR00000097'),
	(101, 98, 1, 'KKR00000098'),
	(102, 99, 1, 'KKR00000099'),
	(103, 100, 1, 'KKR00000100'),
	(104, 101, 1, 'KKR00000101'),
	(105, 102, 1, 'KKR00000102'),
	(106, 103, 1, 'KKR00000103'),
	(107, 104, 1, 'KKR00000104'),
	(108, 105, 1, 'KKR00000105'),
	(109, 106, 1, 'KKR00000106'),
	(110, 107, 1, 'KKR00000107'),
	(111, 108, 1, 'KKR00000108'),
	(112, 109, 1, 'KKR00000109'),
	(113, 110, 1, 'KKR00000110'),
	(114, 111, 1, 'KKR00000111'),
	(115, 112, 1, 'KKR00000112'),
	(116, 113, 1, 'KKR00000113'),
	(117, 114, 1, 'KKR00000114'),
	(118, 115, 1, 'KKR00000115'),
	(119, 116, 1, 'KKR00000116'),
	(120, 117, 1, 'KKR00000117'),
	(121, 118, 1, 'KKR00000118'),
	(122, 119, 1, 'KKR00000119'),
	(123, 120, 1, 'KKR00000120'),
	(124, 121, 1, 'KKR00000121'),
	(125, 122, 1, 'KKR00000122'),
	(126, 1, 7, 'AKG00000001'),
	(127, 2, 7, 'AKG00000002'),
	(128, 3, 7, 'AKG00000003'),
	(129, 4, 7, 'AKG00000004'),
	(130, 5, 7, 'AKG00000005'),
	(131, 6, 7, 'AKG00000006'),
	(132, 7, 7, 'AKG00000007'),
	(133, 8, 7, 'AKG00000008'),
	(134, 9, 7, 'AKG00000009'),
	(135, 10, 7, 'AKG00000010'),
	(136, 11, 7, 'AKG00000011'),
	(137, 12, 7, 'AKG00000012'),
	(138, 13, 7, 'AKG00000013'),
	(139, 14, 7, 'AKG00000014'),
	(140, 15, 7, 'AKG00000015');
/*!40000 ALTER TABLE `pah_refs` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_sub_aktivitas: ~5 rows (approximately)
/*!40000 ALTER TABLE `pah_sub_aktivitas` DISABLE KEYS */;
REPLACE INTO `pah_sub_aktivitas` (`id`, `nama`, `desc`, `account_code`, `inactive`) VALUES
	(1, 'Rekreasi', '-', '570', 0),
	(2, 'Perpustakaan', '-', '570', 0),
	(3, 'SPP', '-', '570', 0),
	(4, 'sumbangan', 'sumbangan, rekreasi, seragam ', '570', 0),
	(5, 'Lembar Kerja Siswa', NULL, '570', 0);
/*!40000 ALTER TABLE `pah_sub_aktivitas` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_suppliers: ~4 rows (approximately)
/*!40000 ALTER TABLE `pah_suppliers` DISABLE KEYS */;
REPLACE INTO `pah_suppliers` (`supplier_id`, `supp_name`, `supp_ref`, `address`, `mail_address`, `gst_no`, `contact`, `supp_account_no`, `website`, `bank_account`, `curr_code`, `payment_terms`, `credit_limit`, `purchase_account`, `payable_account`, `payment_discount_account`, `notes`, `inactive`) VALUES
	(1, 'Careffour', '-', '-', '-', '', '', '', '', '', NULL, NULL, 0, '', '', '', '-', 0),
	(2, 'Pasar', '-', '-', '-', '', '', '', '', '', NULL, NULL, 0, '', '', '', '-', 0),
	(3, 'Supermarket', '-', '-', '-', '', '', '', '', '', NULL, NULL, 0, '', '', '', '-', 0),
	(4, 'Lain-lain', '-', '-', '-', '', '', '', '', '', NULL, NULL, 0, '', '', '', '-', 0);
/*!40000 ALTER TABLE `pah_suppliers` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_sys_prefs: ~2 rows (approximately)
/*!40000 ALTER TABLE `pah_sys_prefs` DISABLE KEYS */;
REPLACE INTO `pah_sys_prefs` (`name`, `value`) VALUES
	('akun_penjualan', '7'),
	('kelompok_other_rental', '5');
/*!40000 ALTER TABLE `pah_sys_prefs` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_sys_types: ~6 rows (approximately)
/*!40000 ALTER TABLE `pah_sys_types` DISABLE KEYS */;
REPLACE INTO `pah_sys_types` (`type_id`, `type_no`, `next_reference`) VALUES
	(0, 1, 'KMS00000004'),
	(1, 1, 'KKR00000123'),
	(2, 1, 'AGR00000001'),
	(3, 1, 'AKA00000001'),
	(4, 1, 'BTR00000001'),
	(7, 1, 'AKG00000016');
/*!40000 ALTER TABLE `pah_sys_types` ENABLE KEYS */;

-- Dumping data for table gkkd.pah_voided: ~3 rows (approximately)
/*!40000 ALTER TABLE `pah_voided` DISABLE KEYS */;
REPLACE INTO `pah_voided` (`id_voided`, `type`, `id`, `date_`, `memo_`) VALUES
	(1, 1, 48, '2013-01-13', 'salah jumlah'),
	(2, 1, 51, '2013-01-14', 'salah kode rek.'),
	(3, 7, 1, '2013-01-18', 'salah kategori');
/*!40000 ALTER TABLE `pah_voided` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_aktivitas: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_aktivitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_aktivitas` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_aktivitas_grup: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_aktivitas_grup` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_aktivitas_grup` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_aktivitas_grup_trans: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_aktivitas_grup_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_aktivitas_grup_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_anggaran: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_anggaran` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_anggaran` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_anggaran_detil: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_anggaran_detil` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_anggaran_detil` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_bank_accounts: ~2 rows (approximately)
/*!40000 ALTER TABLE `pe_bank_accounts` DISABLE KEYS */;
REPLACE INTO `pe_bank_accounts` (`id`, `account_code`, `account_type`, `bank_account_name`, `bank_account_number`, `bank_name`, `bank_address`, `bank_curr_code`, `dflt_curr_act`, `ending_reconcile_balance`, `inactive`, `bank_phone`, `atas_nama`) VALUES
	(1, '110', 0, 'Kas di Tangan', '-', '-', '-', '', b'00000000', 0, b'00000000', '-', '-'),
	(2, '120', 0, 'Kas di Bank', '-', '-', '-', '', b'00000000', 0, b'00000000', '-', '-');
/*!40000 ALTER TABLE `pe_bank_accounts` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_bank_trans: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_bank_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_bank_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_chart_class: ~4 rows (approximately)
/*!40000 ALTER TABLE `pe_chart_class` DISABLE KEYS */;
REPLACE INTO `pe_chart_class` (`cid`, `class_name`, `ctype`, `inactive`) VALUES
	('1', 'Harta', b'10000000', b'00000000'),
	('2', 'Kewajiban', b'10000000', b'00000000'),
	('3', 'Pendapatan', b'10000000', b'00000000'),
	('4', 'Pengeluaran', b'10000000', b'00000000');
/*!40000 ALTER TABLE `pe_chart_class` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_chart_master: ~15 rows (approximately)
/*!40000 ALTER TABLE `pe_chart_master` DISABLE KEYS */;
REPLACE INTO `pe_chart_master` (`account_code`, `account_code2`, `account_name`, `account_type`, `inactive`, `description`) VALUES
	('110', '', 'Kas di Tangan', '1', b'00000000', '-'),
	('120', '', 'Kas di Bank', '1', b'00000000', '-'),
	('410', '', 'Kas Gereja', '7', b'00000000', 'Kas dari Gereja'),
	('420', '', 'Donasi', '7', b'00000000', 'Sumbangan pihak eksternal'),
	('430', '', 'Pendapatan Lain-lain', '7', b'00000000', '-'),
	('510', '', 'Food', '5', b'00000000', 'Uang makan dan snack'),
	('520', '', 'Suplies (Non Food)', '5', b'00000000', 'Sabun, shampo, pasta gigi, sikat gigi, pembalut, pembersih kaca dan lantai, bayclin, bedak, handbody, cotton bud, rexona, minyak rambut, dan lain sebagainya'),
	('530', '', 'Transportasi', '5', b'00000000', 'Parkir mobil dan motor, bensin, taxi'),
	('540', '', 'Utilitas', '5', b'00000000', 'Listrik, telpon, air, ronda, tukang cuci, iuran sampah'),
	('550', '', 'Rumah Tangga', '5', b'00000000', 'Peralatan dan perawatan rumah tangga'),
	('570', '', 'Aktivitas Anak', '5', b'00000000', 'Uang saku, rekreasi anak, olah raga, sewa vcd, kebutuhan sekolah, les, eskul, penggalian bakat, speedy, perpustakaan (buku, majalah, koran), spp, daftar ulang dan lain sebagainya.'),
	('580', '', 'Kesehatan', '5', b'00000000', 'Berobat, obat dan Premi Asuransi'),
	('590', '', 'Lain-lain', '5', b'00000000', 'PBB, atau apapun yang tidak dapat dikelompokkan dalam kelompok di atas.'),
	('600', '', 'test', '5', b'00000000', '123'),
	('601', '', 'tst1', '5', b'00000000', '-');
/*!40000 ALTER TABLE `pe_chart_master` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_chart_types: ~3 rows (approximately)
/*!40000 ALTER TABLE `pe_chart_types` DISABLE KEYS */;
REPLACE INTO `pe_chart_types` (`id`, `name`, `class_id`, `parent`, `inactive`) VALUES
	('1', 'Kas dan Bank', '1', '', b'00000000'),
	('5', 'Beban', '2', '', b'00000000'),
	('7', 'Pendapatan', '3', '', b'00000000');
/*!40000 ALTER TABLE `pe_chart_types` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_comments: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_comments` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_donatur: ~3 rows (approximately)
/*!40000 ALTER TABLE `pe_donatur` DISABLE KEYS */;
REPLACE INTO `pe_donatur` (`id`, `name`, `phone`, `alamat`, `inactive`, `account_code`) VALUES
	(1, 'Kas Gereja', '-', '-', b'00000000', '410'),
	(2, 'Donatur', '-', '-', b'00000000', '420'),
	(3, 'Lain-lain', '-', '-', b'00000000', '430');
/*!40000 ALTER TABLE `pe_donatur` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_gl_trans: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_gl_trans` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_gl_trans` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_kas_keluar: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_kas_keluar` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_kas_keluar` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_kas_masuk: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_kas_masuk` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_kas_masuk` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_lampiran: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_lampiran` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_lampiran` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_member: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_member` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_refs: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_refs` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_refs` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_sub_aktivitas: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_sub_aktivitas` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_sub_aktivitas` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_suppliers: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_suppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_suppliers` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_sys_prefs: ~3 rows (approximately)
/*!40000 ALTER TABLE `pe_sys_prefs` DISABLE KEYS */;
REPLACE INTO `pe_sys_prefs` (`name`, `value`) VALUES
	('default_onhand_act', '7'),
	('type_cost_act', '5'),
	('type_pendapatan_act', '7');
/*!40000 ALTER TABLE `pe_sys_prefs` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_sys_types: ~6 rows (approximately)
/*!40000 ALTER TABLE `pe_sys_types` DISABLE KEYS */;
REPLACE INTO `pe_sys_types` (`type_id`, `type_no`, `next_reference`) VALUES
	(0, 1, 'KMS00000001'),
	(1, 1, 'KKR00000001'),
	(2, 1, 'AGR00000001'),
	(3, 1, 'AKA00000001'),
	(4, 1, 'BTR00000001'),
	(7, 1, 'AKG00000001');
/*!40000 ALTER TABLE `pe_sys_types` ENABLE KEYS */;

-- Dumping data for table gkkd.pe_voided: ~0 rows (approximately)
/*!40000 ALTER TABLE `pe_voided` DISABLE KEYS */;
/*!40000 ALTER TABLE `pe_voided` ENABLE KEYS */;

-- Dumping data for table gkkd.security_roles: ~4 rows (approximately)
/*!40000 ALTER TABLE `security_roles` DISABLE KEYS */;
REPLACE INTO `security_roles` (`id`, `role`, `description`, `sections`, `areas`, `inactive`) VALUES
	(2, 'System Administrator', 'System Administrator', '0000,1000,2000,3000', '257;258;259;260;513;514;515;516;517;518;519;520;521;522;523;524;525;526;769;770;771;772;773;774;2817;2818;2819;2820;2821;2822;2823;3073;3074;3082;3075;3076;3077;3078;3079;3080;3081;3329;3330;3331;3332;3333;3334;3335;5377;5633;5634;5635;5636;5637;5641;5638;5639;5640;5889;5890;5891;7937;7938;7939;7940;8193;8194;8195;8196;8197;8449;8450;8451;10497;10753;10754;10755;10756;10757;11009;11010;11011;11012;13057;13313;13314;13315;15617;15618;15619;15620;15621;15622;15623;15624;15628;15625;15626;15627;15873;15874;15875;15876;15877;15878;15879;15880;15883;15881;15882;16129;16130;16131;16132', 0),
	(11, 'Pengurus Pondok Harapan', 'Pengurus Pondok Asuh Harapan', '1000', NULL, 0),
	(12, 'Pengurus Pondok Efata', 'Pengurus Pondok Efata', '2000', NULL, 0),
	(13, 'Pengurus MahkoTrans', 'Pengurus MahkoTrans', '3000', NULL, 0);
/*!40000 ALTER TABLE `security_roles` ENABLE KEYS */;

-- Dumping data for table gkkd.users: ~6 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
REPLACE INTO `users` (`id`, `user_id`, `password`, `last_visit_date`, `inactive`, `nij`, `security_roles_id`) VALUES
	(1, 'admin', '$2a$12$RWK.UtRECG0g7vO5ZEXfx.1YJFek1Gs0d/ug4aUOVGElYE7X3Mala', '2013-07-03 06:10:36', 0, '0', 2),
	(3, 'nove', '$2a$12$RWK.UtRECG0g7vO5ZEXfx.1YJFek1Gs0d/ug4aUOVGElYE7X3Mala', '2012-12-13 19:17:59', 0, '1', 11),
	(4, 'beta', '$2a$12$RWK.UtRECG0g7vO5ZEXfx.1YJFek1Gs0d/ug4aUOVGElYE7X3Mala', '2012-11-12 20:49:15', 0, '2', 12),
	(5, 'lilis', '$2a$12$v/IUc1Wmc6AmayWvQvbWxexuOCftCortROnDjh8u0EPeRkXKZH3We', '2013-01-07 19:07:01', 0, '31', 2),
	(6, 'cecep', '$2a$12$JZeYp2ksQmvVQPXtFiLnrOswIbj49A.g35xSp962s7haPAksQmc8u', '2012-11-16 15:05:51', 0, '28', 11),
	(7, 'surmi', '$2a$12$1EAi03Z9Kp0ZFIK3fFFr1.7t4k.ozTFn7gxzwSKs2AYh8S9gmEiTe', '2013-01-28 14:47:16', 0, '29', 11);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
