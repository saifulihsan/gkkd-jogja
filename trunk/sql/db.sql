-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.16 - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             7.0.0.4370
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for gkkd
CREATE DATABASE IF NOT EXISTS `gkkd` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `gkkd`;


-- Dumping structure for table gkkd.jemaat
CREATE TABLE IF NOT EXISTS `jemaat` (
  `nij` varchar(20) NOT NULL,
  `real_name` varchar(100) NOT NULL DEFAULT '',
  `phone` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(100) DEFAULT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `alamat` text,
  `gender` char(1) DEFAULT 'M',
  `birthdate` date DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `hometown` text,
  PRIMARY KEY (`nij`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_bank_accounts
CREATE TABLE IF NOT EXISTS `mt_bank_accounts` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `account_code` varchar(15) NOT NULL DEFAULT '',
  `account_type` smallint(6) NOT NULL DEFAULT '0',
  `bank_account_name` varchar(60) NOT NULL DEFAULT '',
  `bank_account_number` varchar(100) NOT NULL DEFAULT '',
  `bank_name` varchar(60) NOT NULL DEFAULT '',
  `bank_address` tinytext,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  `bank_phone` varchar(50) DEFAULT NULL,
  `atas_nama` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_account_name_0` (`bank_account_name`) USING BTREE,
  KEY `bank_account_number_0` (`bank_account_number`) USING BTREE,
  KEY `account_code_0` (`account_code`) USING BTREE,
  CONSTRAINT `fk_mt_bank_accounts` FOREIGN KEY (`account_code`) REFERENCES `mt_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_bank_trans
CREATE TABLE IF NOT EXISTS `mt_bank_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) DEFAULT NULL,
  `trans_no` int(11) DEFAULT NULL,
  `bank_act` smallint(6) NOT NULL DEFAULT '1',
  `ref` varchar(40) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_act_0` (`bank_act`,`ref`) USING BTREE,
  KEY `tymt_0` (`type`,`trans_no`) USING BTREE,
  KEY `bank_act_4` (`bank_act`) USING BTREE,
  KEY `bank_act_5` (`bank_act`,`trans_date`) USING BTREE,
  KEY `idx_mt_bank_trans` (`bank_act`) USING BTREE,
  KEY `idx_mt_bank_trans_0` (`users_id`) USING BTREE,
  CONSTRAINT `fk_mt_bank_trans` FOREIGN KEY (`bank_act`) REFERENCES `mt_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mt_bank_trans_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_chart_class
CREATE TABLE IF NOT EXISTS `mt_chart_class` (
  `cid` varchar(3) NOT NULL,
  `class_name` varchar(60) NOT NULL DEFAULT '',
  `ctype` tinyint(4) NOT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_chart_master
CREATE TABLE IF NOT EXISTS `mt_chart_master` (
  `account_code` varchar(15) NOT NULL DEFAULT '',
  `account_code2` varchar(15) NOT NULL DEFAULT '',
  `account_name` varchar(60) NOT NULL DEFAULT '',
  `account_type` varchar(10) NOT NULL DEFAULT '0',
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  `description` text,
  PRIMARY KEY (`account_code`),
  KEY `idx_mt_chart_master` (`account_type`) USING BTREE,
  CONSTRAINT `fk_mt_chart_master` FOREIGN KEY (`account_type`) REFERENCES `mt_chart_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_chart_types
CREATE TABLE IF NOT EXISTS `mt_chart_types` (
  `id` varchar(10) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `class_id` varchar(3) NOT NULL DEFAULT '',
  `parent` varchar(10) NOT NULL DEFAULT '-1',
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `idx_mt_chart_types` (`class_id`) USING BTREE,
  CONSTRAINT `fk_mt_chart_types` FOREIGN KEY (`class_id`) REFERENCES `mt_chart_class` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_comments
CREATE TABLE IF NOT EXISTS `mt_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '0',
  `date_` date DEFAULT '0000-00-00',
  `memo_` tinytext,
  PRIMARY KEY (`id`),
  KEY `tymt_and_id_0` (`type`,`id`) USING BTREE,
  KEY `tymt_no_1` (`type_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_driver
CREATE TABLE IF NOT EXISTS `mt_driver` (
  `id_driver` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `telp` varchar(30) DEFAULT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id_driver`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_gl_trans
CREATE TABLE IF NOT EXISTS `mt_gl_trans` (
  `counter` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL,
  `tran_date` date DEFAULT NULL,
  `account` varchar(15) NOT NULL DEFAULT '',
  `memo_` tinytext NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `users_id` smallint(6) NOT NULL,
  `id_mobil` int(11) DEFAULT NULL,
  PRIMARY KEY (`counter`),
  KEY `idx_mt_gl_trans` (`account`) USING BTREE,
  KEY `idx_type` (`type`) USING BTREE,
  KEY `idx_tymt_no` (`type_no`) USING BTREE,
  KEY `idx_tran_date` (`tran_date`) USING BTREE,
  KEY `idx_mt_gl_trans_0` (`id_mobil`),
  CONSTRAINT `fk_mt_gl_trans` FOREIGN KEY (`account`) REFERENCES `mt_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mt_gl_trans_1` FOREIGN KEY (`id_mobil`) REFERENCES `mt_mobil` (`id_mobil`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_kas_keluar
CREATE TABLE IF NOT EXISTS `mt_kas_keluar` (
  `kas_keluar_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `mt_account_code` varchar(15) NOT NULL,
  `mt_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  `id_mobil` int(11) DEFAULT NULL,
  PRIMARY KEY (`kas_keluar_id`),
  KEY `fk_pah_kas_keluar_pah_chart_master1_idx_0` (`mt_account_code`),
  KEY `fk_pah_kas_keluar_pah_bank_accounts1_idx_0` (`mt_bank_accounts_id`),
  KEY `fk_pah_kas_keluar_users1_idx_0` (`users_id`),
  KEY `idx_mt_kas_keluar` (`id_mobil`),
  CONSTRAINT `fk_mt_kas_keluar_0` FOREIGN KEY (`mt_account_code`) REFERENCES `mt_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mt_kas_keluar_1` FOREIGN KEY (`mt_bank_accounts_id`) REFERENCES `mt_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mt_kas_keluar_2` FOREIGN KEY (`id_mobil`) REFERENCES `mt_mobil` (`id_mobil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_kas_keluar_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_kas_masuk
CREATE TABLE IF NOT EXISTS `mt_kas_masuk` (
  `kas_masuk_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `mt_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  `id_mobil` int(11) DEFAULT NULL,
  `account_code` varchar(15) NOT NULL DEFAULT '',
  PRIMARY KEY (`kas_masuk_id`),
  KEY `fk_pah_kas_masuk_pah_bank_accounts1_idx_0` (`mt_bank_accounts_id`),
  KEY `fk_pah_kas_masuk_users1_idx_0` (`users_id`),
  KEY `idx_mt_kas_masuk` (`id_mobil`),
  KEY `idx_mt_kas_masuk_0` (`account_code`),
  CONSTRAINT `fk_mt_kas_masuk` FOREIGN KEY (`account_code`) REFERENCES `mt_chart_master` (`account_code`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_kas_masuk_0` FOREIGN KEY (`mt_bank_accounts_id`) REFERENCES `mt_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mt_kas_masuk_1` FOREIGN KEY (`id_mobil`) REFERENCES `mt_mobil` (`id_mobil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_kas_masuk_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_kelompok_pelanggan
CREATE TABLE IF NOT EXISTS `mt_kelompok_pelanggan` (
  `id_kelompok` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `discont_persen` double DEFAULT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id_kelompok`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_kembali_kendaraan
CREATE TABLE IF NOT EXISTS `mt_kembali_kendaraan` (
  `id_kembali` int(11) NOT NULL AUTO_INCREMENT,
  `id_pinjam` int(11) NOT NULL,
  `trans_date` date DEFAULT NULL,
  `tgl_kembali` datetime DEFAULT NULL,
  `extend_bln` int(11) DEFAULT NULL,
  `extend_hari` int(11) DEFAULT NULL,
  `extend_jam` int(11) DEFAULT NULL,
  `overtime_jam` double DEFAULT NULL,
  `pelunasan` double DEFAULT NULL,
  `ongkos_sewa` double DEFAULT NULL,
  `ongkos_driver` double DEFAULT NULL,
  `ongkos_bbm` double DEFAULT NULL,
  `total_ongkos` double DEFAULT NULL,
  `dp` double DEFAULT NULL,
  `disc` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `users_id` smallint(6) DEFAULT NULL,
  `trans_via` varchar(30) DEFAULT NULL,
  `no_bukti_bayar` varchar(50) DEFAULT NULL,
  `notes` varchar(600) DEFAULT NULL,
  `is_void` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 = tidak\n1 = ya',
  `ongkos_extend` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `doc_ref_kembali` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_kembali`),
  KEY `idx_mt_kembali_kendaraan` (`id_pinjam`),
  KEY `idx_mt_kembali_kendaraan_0` (`users_id`),
  CONSTRAINT `fk_mt_kembali_kendaraan` FOREIGN KEY (`id_pinjam`) REFERENCES `mt_pinjam_kendaraan` (`id_pinjam`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_mt_kembali_kendaraan_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_member
CREATE TABLE IF NOT EXISTS `mt_member` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `jemaat_nij` varchar(20) NOT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `fk_pah_member_jemaat1_idx_0` (`jemaat_nij`) USING BTREE,
  CONSTRAINT `fk_mt_member` FOREIGN KEY (`jemaat_nij`) REFERENCES `jemaat` (`nij`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_mobil
CREATE TABLE IF NOT EXISTS `mt_mobil` (
  `id_mobil` int(11) NOT NULL AUTO_INCREMENT,
  `nopol` varchar(10) NOT NULL,
  `jenis` varchar(50) DEFAULT NULL,
  `tahun` int(11) DEFAULT NULL,
  `tarif_12` double DEFAULT NULL,
  `tarif_24` double DEFAULT NULL,
  `tarif_high_12` double DEFAULT NULL,
  `tarif_high_24` double DEFAULT NULL,
  `tarif_bulanan` double DEFAULT NULL,
  `overtime` double DEFAULT NULL,
  `discount_other_rental` double DEFAULT NULL,
  `status_pemilik` varchar(30) DEFAULT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  `other_tarif_12` double DEFAULT NULL,
  `other_tarif_24` double DEFAULT NULL,
  `other_tarif_high_12` double DEFAULT NULL,
  `other_tarif_high_24` double DEFAULT NULL,
  `other_tarif_bulanan` double DEFAULT NULL,
  `other_overtime` double DEFAULT NULL,
  PRIMARY KEY (`id_mobil`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_pelanggan
CREATE TABLE IF NOT EXISTS `mt_pelanggan` (
  `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) NOT NULL,
  `no_tlp` varchar(30) DEFAULT NULL,
  `alamat` varchar(225) DEFAULT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id_pelanggan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_pinjam_kendaraan
CREATE TABLE IF NOT EXISTS `mt_pinjam_kendaraan` (
  `id_pinjam` int(11) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) NOT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `tanda_pengenal` varchar(30) DEFAULT NULL,
  `no_identitas` varchar(30) DEFAULT NULL,
  `jaminan` varchar(30) DEFAULT NULL,
  `jaminan_desc` varchar(225) DEFAULT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `id_kelompok` int(11) NOT NULL,
  `tgl_pinjam` datetime DEFAULT NULL,
  `season` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 = low\n1 = high',
  `sewa_bln` int(11) DEFAULT NULL,
  `sewa_hari` int(11) DEFAULT NULL,
  `sewa_jam` int(11) DEFAULT NULL,
  `trans_via` varchar(30) DEFAULT NULL,
  `no_bukti_bayar` varchar(50) DEFAULT NULL,
  `id_driver` int(11) DEFAULT NULL,
  `id_mobil` int(11) NOT NULL,
  `ongkos_sewa` double DEFAULT NULL,
  `ongkos_driver` double DEFAULT NULL,
  `ongkos_bbm` double DEFAULT NULL,
  `total_ongkos` double DEFAULT NULL,
  `dp` double DEFAULT NULL,
  `sisa_tagihan` double DEFAULT NULL,
  `disc` double DEFAULT NULL,
  `total` double DEFAULT NULL,
  `tgl_rencana_kembali` datetime DEFAULT NULL,
  `users_id` smallint(6) DEFAULT NULL,
  `is_back` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 = belum\n1 = sudah',
  PRIMARY KEY (`id_pinjam`),
  KEY `idx_mt_pinjam_kendaraan` (`id_pelanggan`),
  KEY `idx_mt_pinjam_kendaraan_0` (`id_kelompok`),
  KEY `idx_mt_pinjam_kendaraan_1` (`id_driver`),
  KEY `idx_mt_pinjam_kendaraan_2` (`id_mobil`),
  KEY `idx_mt_pinjam_kendaraan_3` (`users_id`),
  CONSTRAINT `fk_mt_pinjam_kendaraan` FOREIGN KEY (`id_pelanggan`) REFERENCES `mt_pelanggan` (`id_pelanggan`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_pinjam_kendaraan_0` FOREIGN KEY (`id_kelompok`) REFERENCES `mt_kelompok_pelanggan` (`id_kelompok`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_pinjam_kendaraan_1` FOREIGN KEY (`id_driver`) REFERENCES `mt_driver` (`id_driver`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_pinjam_kendaraan_2` FOREIGN KEY (`id_mobil`) REFERENCES `mt_mobil` (`id_mobil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_mt_pinjam_kendaraan_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_refs
CREATE TABLE IF NOT EXISTS `mt_refs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_no` int(11) NOT NULL DEFAULT '0',
  `type` smallint(6) NOT NULL DEFAULT '0',
  `reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `tymt_and_reference_0` (`type`,`reference`) USING BTREE,
  KEY `tymt_no_0` (`type_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_sys_prefs
CREATE TABLE IF NOT EXISTS `mt_sys_prefs` (
  `name` varchar(35) NOT NULL DEFAULT '',
  `value` tinytext,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_sys_types
CREATE TABLE IF NOT EXISTS `mt_sys_types` (
  `type_id` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '1',
  `next_reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.mt_voided
CREATE TABLE IF NOT EXISTS `mt_voided` (
  `id_voided` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0',
  `date_` date NOT NULL DEFAULT '0000-00-00',
  `memo_` tinytext NOT NULL,
  PRIMARY KEY (`id_voided`),
  UNIQUE KEY `id_0` (`type`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_aktivitas
CREATE TABLE IF NOT EXISTS `pah_aktivitas` (
  `aktivitas_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pah_suppliers_supplier_id` int(11) NOT NULL,
  `pah_bank_accounts_id` smallint(6) NOT NULL,
  `pah_member_id` smallint(6) NOT NULL,
  `pah_sub_aktivitas_id` int(11) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  PRIMARY KEY (`aktivitas_id`),
  KEY `fk_pah_aktivitas_pah_sub_aktivitas1_idx` (`pah_sub_aktivitas_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_member1_idx` (`pah_member_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_suppliers1_idx` (`pah_suppliers_supplier_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_bank_accounts1_idx` (`pah_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_aktivitas_users1_idx` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pah_aktivitas_pah_bank_accounts1` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_member1` FOREIGN KEY (`pah_member_id`) REFERENCES `pah_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_sub_aktivitas1` FOREIGN KEY (`pah_sub_aktivitas_id`) REFERENCES `pah_sub_aktivitas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_suppliers1` FOREIGN KEY (`pah_suppliers_supplier_id`) REFERENCES `pah_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_aktivitas_grup
CREATE TABLE IF NOT EXISTS `pah_aktivitas_grup` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `notes` text,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_aktivitas_grup_trans
CREATE TABLE IF NOT EXISTS `pah_aktivitas_grup_trans` (
  `aktivitas_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pah_suppliers_supplier_id` int(11) NOT NULL,
  `pah_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `pah_aktivitas_grup_id` smallint(6) NOT NULL,
  `pah_sub_aktivitas_id` int(11) NOT NULL,
  `note` text,
  PRIMARY KEY (`aktivitas_id`),
  KEY `fk_pah_aktivitas_pah_suppliers1_idx` (`pah_suppliers_supplier_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_bank_accounts1_idx` (`pah_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_aktivitas_users1_idx` (`users_id`) USING BTREE,
  KEY `fk_pah_aktivitas_grup_trans_pah_aktivitas_grup1_idx` (`pah_aktivitas_grup_id`) USING BTREE,
  KEY `fk_pah_aktivitas_grup_trans_pah_sub_aktivitas1_idx` (`pah_sub_aktivitas_id`) USING BTREE,
  CONSTRAINT `fk_pah_aktivitas_grup_trans_pah_aktivitas_grup1` FOREIGN KEY (`pah_aktivitas_grup_id`) REFERENCES `pah_aktivitas_grup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_grup_trans_pah_sub_aktivitas1` FOREIGN KEY (`pah_sub_aktivitas_id`) REFERENCES `pah_sub_aktivitas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_bank_accounts10` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_suppliers10` FOREIGN KEY (`pah_suppliers_supplier_id`) REFERENCES `pah_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_users10` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_anggaran
CREATE TABLE IF NOT EXISTS `pah_anggaran` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `periode_bulan` smallint(2) DEFAULT NULL,
  `periode_tahun` smallint(4) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `lock` tinyint(1) DEFAULT '0',
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_anggaran_users1_idx` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pah_anggaran_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_anggaran_detil
CREATE TABLE IF NOT EXISTS `pah_anggaran_detil` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `pah_anggaran_id` smallint(6) NOT NULL,
  `amount` double DEFAULT NULL,
  `pah_chart_master_account_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_anggaran_detil_pah_anggaran1_idx` (`pah_anggaran_id`) USING BTREE,
  KEY `fk_pah_anggaran_detil_pah_chart_master1_idx` (`pah_chart_master_account_code`) USING BTREE,
  CONSTRAINT `fk_pah_anggaran_detil_pah_anggaran1` FOREIGN KEY (`pah_anggaran_id`) REFERENCES `pah_anggaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_anggaran_detil_pah_chart_master1` FOREIGN KEY (`pah_chart_master_account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_bank_accounts
CREATE TABLE IF NOT EXISTS `pah_bank_accounts` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `account_code` varchar(15) NOT NULL DEFAULT '',
  `account_type` smallint(6) NOT NULL DEFAULT '0',
  `bank_account_name` varchar(60) NOT NULL DEFAULT '',
  `bank_account_number` varchar(100) NOT NULL DEFAULT '',
  `bank_name` varchar(60) NOT NULL DEFAULT '',
  `bank_address` tinytext,
  `bank_curr_code` char(3) NOT NULL DEFAULT '',
  `dflt_curr_act` tinyint(1) NOT NULL DEFAULT '0',
  `ending_reconcile_balance` double NOT NULL DEFAULT '0',
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `bank_phone` varchar(50) DEFAULT NULL,
  `atas_nama` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_account_name` (`bank_account_name`) USING BTREE,
  KEY `bank_account_number` (`bank_account_number`) USING BTREE,
  KEY `account_code` (`account_code`) USING BTREE,
  CONSTRAINT `bank_accounts_ibfk_1` FOREIGN KEY (`account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_bank_trans
CREATE TABLE IF NOT EXISTS `pah_bank_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) DEFAULT NULL,
  `trans_no` int(11) DEFAULT NULL,
  `bank_act` smallint(6) NOT NULL DEFAULT '1',
  `ref` varchar(40) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `reconciled` date DEFAULT NULL,
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_act` (`bank_act`,`ref`) USING BTREE,
  KEY `type` (`type`,`trans_no`) USING BTREE,
  KEY `bank_act_2` (`bank_act`,`reconciled`) USING BTREE,
  KEY `bank_act_3` (`bank_act`,`trans_date`) USING BTREE,
  CONSTRAINT `bank_trans_ibfk_1` FOREIGN KEY (`bank_act`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_chart_class
CREATE TABLE IF NOT EXISTS `pah_chart_class` (
  `cid` varchar(3) NOT NULL,
  `class_name` varchar(60) NOT NULL DEFAULT '',
  `ctype` tinyint(1) NOT NULL DEFAULT '0',
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_chart_master
CREATE TABLE IF NOT EXISTS `pah_chart_master` (
  `account_code` varchar(15) NOT NULL DEFAULT '',
  `account_code2` varchar(15) NOT NULL DEFAULT '',
  `account_name` varchar(60) NOT NULL DEFAULT '',
  `account_type` varchar(10) NOT NULL DEFAULT '0',
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `description` text,
  PRIMARY KEY (`account_code`),
  KEY `account_name` (`account_name`) USING BTREE,
  KEY `accounts_by_type` (`account_type`,`account_code`) USING BTREE,
  CONSTRAINT `chart_master_ibfk_1` FOREIGN KEY (`account_type`) REFERENCES `pah_chart_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_chart_types
CREATE TABLE IF NOT EXISTS `pah_chart_types` (
  `id` varchar(10) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `class_id` varchar(3) NOT NULL DEFAULT '',
  `parent` varchar(10) NOT NULL DEFAULT '-1',
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `name` (`name`) USING BTREE,
  KEY `class_id` (`class_id`) USING BTREE,
  CONSTRAINT `chart_types_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `pah_chart_class` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_comments
CREATE TABLE IF NOT EXISTS `pah_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '0',
  `date_` date DEFAULT '0000-00-00',
  `memo_` tinytext,
  PRIMARY KEY (`id`),
  KEY `type_and_id` (`type`,`id`) USING BTREE,
  KEY `type_no` (`type_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_donatur
CREATE TABLE IF NOT EXISTS `pah_donatur` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `alamat` tinytext,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `pah_chart_master_account_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_donatur_pah_chart_master1_idx` (`pah_chart_master_account_code`) USING BTREE,
  CONSTRAINT `fk_pah_donatur_pah_chart_master1` FOREIGN KEY (`pah_chart_master_account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_gl_trans
CREATE TABLE IF NOT EXISTS `pah_gl_trans` (
  `counter` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL COMMENT 'aslinya bigint16',
  `tran_date` date DEFAULT NULL,
  `account` varchar(15) NOT NULL DEFAULT '',
  `memo_` tinytext NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`counter`),
  KEY `Type_and_Number` (`type`,`type_no`) USING BTREE,
  KEY `tran_date` (`tran_date`) USING BTREE,
  KEY `account_and_tran_date` (`account`,`tran_date`) USING BTREE,
  KEY `gl_trans_ibfk_4` (`type_no`) USING BTREE,
  CONSTRAINT `gl_trans_ibfk_1` FOREIGN KEY (`account`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_kas_keluar
CREATE TABLE IF NOT EXISTS `pah_kas_keluar` (
  `kas_keluar_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pah_suppliers_supplier_id` int(11) NOT NULL,
  `pah_chart_master_account_code` varchar(15) NOT NULL,
  `pah_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  PRIMARY KEY (`kas_keluar_id`),
  KEY `fk_pah_kas_keluar_pah_suppliers1_idx` (`pah_suppliers_supplier_id`) USING BTREE,
  KEY `fk_pah_kas_keluar_pah_chart_master1_idx` (`pah_chart_master_account_code`) USING BTREE,
  KEY `fk_pah_kas_keluar_pah_bank_accounts1_idx` (`pah_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_kas_keluar_users1_idx` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pah_kas_keluar_pah_bank_accounts1` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_keluar_pah_chart_master1` FOREIGN KEY (`pah_chart_master_account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_keluar_pah_suppliers1` FOREIGN KEY (`pah_suppliers_supplier_id`) REFERENCES `pah_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_keluar_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_kas_masuk
CREATE TABLE IF NOT EXISTS `pah_kas_masuk` (
  `kas_masuk_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pah_donatur_id` smallint(6) NOT NULL,
  `pah_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  PRIMARY KEY (`kas_masuk_id`),
  KEY `fk_pah_kas_masuk_pah_donatur1_idx` (`pah_donatur_id`) USING BTREE,
  KEY `fk_pah_kas_masuk_pah_bank_accounts1_idx` (`pah_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_kas_masuk_users1_idx` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pah_kas_masuk_pah_bank_accounts1` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_masuk_pah_donatur1` FOREIGN KEY (`pah_donatur_id`) REFERENCES `pah_donatur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_masuk_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_lampiran
CREATE TABLE IF NOT EXISTS `pah_lampiran` (
  `id_lampiran` smallint(6) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `keterangan` text,
  `satuan` varchar(45) DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id_lampiran`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_member
CREATE TABLE IF NOT EXISTS `pah_member` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `jemaat_nij` varchar(20) NOT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_pah_member_jemaat1_idx` (`jemaat_nij`) USING BTREE,
  CONSTRAINT `fk_pah_member_jemaat1` FOREIGN KEY (`jemaat_nij`) REFERENCES `jemaat` (`nij`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_refs
CREATE TABLE IF NOT EXISTS `pah_refs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_no` int(11) NOT NULL DEFAULT '0',
  `type` smallint(6) NOT NULL DEFAULT '0',
  `reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `Type_and_Reference` (`type`,`reference`) USING BTREE,
  KEY `type_no` (`type_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_sub_aktivitas
CREATE TABLE IF NOT EXISTS `pah_sub_aktivitas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `desc` text,
  `account_code` varchar(15) NOT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_pah_sub_aktivitas_pah_chart_master1_idx` (`account_code`) USING BTREE,
  CONSTRAINT `fk_pah_sub_aktivitas_pah_chart_master1` FOREIGN KEY (`account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_suppliers
CREATE TABLE IF NOT EXISTS `pah_suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supp_name` varchar(60) NOT NULL DEFAULT '',
  `supp_ref` varchar(30) NOT NULL DEFAULT '',
  `address` tinytext NOT NULL,
  `mail_address` tinytext NOT NULL,
  `gst_no` varchar(25) NOT NULL DEFAULT '',
  `contact` varchar(60) NOT NULL DEFAULT '',
  `supp_account_no` varchar(40) NOT NULL DEFAULT '',
  `website` varchar(100) NOT NULL DEFAULT '',
  `bank_account` varchar(60) NOT NULL DEFAULT '',
  `curr_code` char(3) DEFAULT NULL,
  `payment_terms` int(11) DEFAULT NULL,
  `credit_limit` double NOT NULL DEFAULT '0',
  `purchase_account` varchar(15) NOT NULL DEFAULT '',
  `payable_account` varchar(15) NOT NULL DEFAULT '',
  `payment_discount_account` varchar(15) NOT NULL DEFAULT '',
  `notes` tinytext NOT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`supplier_id`),
  KEY `supp_ref` (`supp_ref`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_sys_prefs
CREATE TABLE IF NOT EXISTS `pah_sys_prefs` (
  `name` varchar(35) NOT NULL DEFAULT '',
  `value` tinytext,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_sys_types
CREATE TABLE IF NOT EXISTS `pah_sys_types` (
  `type_id` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '1',
  `next_reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pah_voided
CREATE TABLE IF NOT EXISTS `pah_voided` (
  `id_voided` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0',
  `date_` date NOT NULL DEFAULT '0000-00-00',
  `memo_` tinytext NOT NULL,
  PRIMARY KEY (`id_voided`),
  UNIQUE KEY `id` (`type`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_aktivitas
CREATE TABLE IF NOT EXISTS `pe_aktivitas` (
  `aktivitas_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pe_supplier_id` int(11) NOT NULL,
  `pe_bank_accounts_id` smallint(6) NOT NULL,
  `pe_member_id` smallint(6) NOT NULL,
  `pe_sub_aktivitas_id` int(11) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  PRIMARY KEY (`aktivitas_id`),
  KEY `fk_pah_aktivitas_pah_sub_aktivitas1_idx_0` (`pe_sub_aktivitas_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_member1_idx_0` (`pe_member_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_suppliers1_idx_1` (`pe_supplier_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_bank_accounts1_idx_1` (`pe_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_aktivitas_users1_idx_1` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pe_aktivitas` FOREIGN KEY (`pe_supplier_id`) REFERENCES `pe_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_0` FOREIGN KEY (`pe_bank_accounts_id`) REFERENCES `pe_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_1` FOREIGN KEY (`pe_member_id`) REFERENCES `pe_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_2` FOREIGN KEY (`pe_sub_aktivitas_id`) REFERENCES `pe_sub_aktivitas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_aktivitas_grup
CREATE TABLE IF NOT EXISTS `pe_aktivitas_grup` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `notes` text,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_aktivitas_grup_trans
CREATE TABLE IF NOT EXISTS `pe_aktivitas_grup_trans` (
  `aktivitas_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pe_supplier_id` int(11) NOT NULL,
  `pe_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `pe_aktivitas_grup_id` smallint(6) NOT NULL,
  `pe_sub_aktivitas_id` int(11) NOT NULL,
  `note` text,
  PRIMARY KEY (`aktivitas_id`),
  KEY `fk_pah_aktivitas_pah_suppliers1_idx_0` (`pe_supplier_id`) USING BTREE,
  KEY `fk_pah_aktivitas_pah_bank_accounts1_idx_0` (`pe_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_aktivitas_users1_idx_0` (`users_id`) USING BTREE,
  KEY `fk_pah_aktivitas_grup_trans_pah_aktivitas_grup1_idx_0` (`pe_aktivitas_grup_id`) USING BTREE,
  KEY `fk_pah_aktivitas_grup_trans_pah_sub_aktivitas1_idx_0` (`pe_sub_aktivitas_id`) USING BTREE,
  CONSTRAINT `fk_pe_aktivitas_grup_trans` FOREIGN KEY (`pe_supplier_id`) REFERENCES `pe_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_grup_trans_0` FOREIGN KEY (`pe_bank_accounts_id`) REFERENCES `pe_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_grup_trans_1` FOREIGN KEY (`pe_aktivitas_grup_id`) REFERENCES `pe_aktivitas_grup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_grup_trans_2` FOREIGN KEY (`pe_sub_aktivitas_id`) REFERENCES `pe_sub_aktivitas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_aktivitas_grup_trans_3` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_anggaran
CREATE TABLE IF NOT EXISTS `pe_anggaran` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `periode_bulan` smallint(6) DEFAULT NULL,
  `periode_tahun` smallint(6) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_anggaran_users1_idx_0` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pe_anggaran` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_anggaran_detil
CREATE TABLE IF NOT EXISTS `pe_anggaran_detil` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `anggaran_id` smallint(6) NOT NULL,
  `amount` double DEFAULT NULL,
  `account_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_anggaran_detil_pah_anggaran1_idx_0` (`anggaran_id`) USING BTREE,
  KEY `idx_pe_anggaran_detil` (`account_code`) USING BTREE,
  CONSTRAINT `fk_pe_anggaran_detil` FOREIGN KEY (`anggaran_id`) REFERENCES `pe_anggaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_anggaran_detil_0` FOREIGN KEY (`account_code`) REFERENCES `pe_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_bank_accounts
CREATE TABLE IF NOT EXISTS `pe_bank_accounts` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `account_code` varchar(15) NOT NULL DEFAULT '',
  `account_type` smallint(6) NOT NULL DEFAULT '0',
  `bank_account_name` varchar(60) NOT NULL DEFAULT '',
  `bank_account_number` varchar(100) NOT NULL DEFAULT '',
  `bank_name` varchar(60) NOT NULL DEFAULT '',
  `bank_address` tinytext,
  `bank_curr_code` char(3) NOT NULL DEFAULT '',
  `dflt_curr_act` bit(1) NOT NULL DEFAULT b'0',
  `ending_reconcile_balance` double NOT NULL DEFAULT '0',
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  `bank_phone` varchar(50) DEFAULT NULL,
  `atas_nama` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_account_name_0` (`bank_account_name`) USING BTREE,
  KEY `bank_account_number_0` (`bank_account_number`) USING BTREE,
  KEY `account_code_0` (`account_code`) USING BTREE,
  CONSTRAINT `fk_pe_bank_accounts` FOREIGN KEY (`account_code`) REFERENCES `pe_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_bank_trans
CREATE TABLE IF NOT EXISTS `pe_bank_trans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) DEFAULT NULL,
  `trans_no` int(11) DEFAULT NULL,
  `bank_act` smallint(6) NOT NULL DEFAULT '1',
  `ref` varchar(40) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `reconciled` date DEFAULT NULL,
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bank_act_0` (`bank_act`,`ref`) USING BTREE,
  KEY `type_0` (`type`,`trans_no`) USING BTREE,
  KEY `bank_act_4` (`bank_act`,`reconciled`) USING BTREE,
  KEY `bank_act_5` (`bank_act`,`trans_date`) USING BTREE,
  KEY `idx_pe_bank_trans` (`bank_act`) USING BTREE,
  KEY `idx_pe_bank_trans_0` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pe_bank_trans` FOREIGN KEY (`bank_act`) REFERENCES `pe_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_bank_trans_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_chart_class
CREATE TABLE IF NOT EXISTS `pe_chart_class` (
  `cid` varchar(3) NOT NULL,
  `class_name` varchar(60) NOT NULL DEFAULT '',
  `ctype` bit(1) NOT NULL DEFAULT b'0',
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_chart_master
CREATE TABLE IF NOT EXISTS `pe_chart_master` (
  `account_code` varchar(15) NOT NULL DEFAULT '',
  `account_code2` varchar(15) NOT NULL DEFAULT '',
  `account_name` varchar(60) NOT NULL DEFAULT '',
  `account_type` varchar(10) NOT NULL DEFAULT '0',
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  `description` text,
  PRIMARY KEY (`account_code`),
  KEY `idx_pe_chart_master` (`account_type`) USING BTREE,
  CONSTRAINT `fk_pe_chart_master` FOREIGN KEY (`account_type`) REFERENCES `pe_chart_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_chart_types
CREATE TABLE IF NOT EXISTS `pe_chart_types` (
  `id` varchar(10) NOT NULL,
  `name` varchar(60) NOT NULL DEFAULT '',
  `class_id` varchar(3) NOT NULL DEFAULT '',
  `parent` varchar(10) NOT NULL DEFAULT '-1',
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `idx_pe_chart_types` (`class_id`) USING BTREE,
  CONSTRAINT `fk_pe_chart_types` FOREIGN KEY (`class_id`) REFERENCES `pe_chart_class` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_comments
CREATE TABLE IF NOT EXISTS `pe_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '0',
  `date_` date DEFAULT '0000-00-00',
  `memo_` tinytext,
  PRIMARY KEY (`id`),
  KEY `type_and_id_0` (`type`,`id`) USING BTREE,
  KEY `type_no_1` (`type_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_donatur
CREATE TABLE IF NOT EXISTS `pe_donatur` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `alamat` tinytext,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  `account_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_donatur_pah_chart_master1_idx_0` (`account_code`) USING BTREE,
  CONSTRAINT `fk_pe_donatur` FOREIGN KEY (`account_code`) REFERENCES `pe_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_gl_trans
CREATE TABLE IF NOT EXISTS `pe_gl_trans` (
  `counter` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL COMMENT 'aslinya bigint16',
  `tran_date` date DEFAULT NULL,
  `account` varchar(15) NOT NULL DEFAULT '',
  `memo_` tinytext NOT NULL,
  `amount` double NOT NULL DEFAULT '0',
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`counter`),
  KEY `idx_pe_gl_trans` (`account`) USING BTREE,
  KEY `idx_type` (`type`) USING BTREE,
  KEY `idx_type_no` (`type_no`) USING BTREE,
  KEY `idx_tran_date` (`tran_date`) USING BTREE,
  CONSTRAINT `fk_pe_gl_trans` FOREIGN KEY (`account`) REFERENCES `pe_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_kas_keluar
CREATE TABLE IF NOT EXISTS `pe_kas_keluar` (
  `kas_keluar_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pe_supplier_id` int(11) NOT NULL,
  `pe_account_code` varchar(15) NOT NULL,
  `pe_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  PRIMARY KEY (`kas_keluar_id`),
  KEY `fk_pah_kas_keluar_pah_suppliers1_idx_0` (`pe_supplier_id`) USING BTREE,
  KEY `fk_pah_kas_keluar_pah_chart_master1_idx_0` (`pe_account_code`) USING BTREE,
  KEY `fk_pah_kas_keluar_pah_bank_accounts1_idx_0` (`pe_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_kas_keluar_users1_idx_0` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pe_kas_keluar` FOREIGN KEY (`pe_supplier_id`) REFERENCES `pe_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_kas_keluar_0` FOREIGN KEY (`pe_account_code`) REFERENCES `pe_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_kas_keluar_1` FOREIGN KEY (`pe_bank_accounts_id`) REFERENCES `pe_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_kas_keluar_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_kas_masuk
CREATE TABLE IF NOT EXISTS `pe_kas_masuk` (
  `kas_masuk_id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `no_bukti` varchar(45) DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `trans_via` varchar(45) DEFAULT NULL,
  `pe_donatur_id` smallint(6) NOT NULL,
  `pe_bank_accounts_id` smallint(6) NOT NULL,
  `users_id` smallint(6) NOT NULL,
  `note` text,
  PRIMARY KEY (`kas_masuk_id`),
  KEY `fk_pah_kas_masuk_pah_donatur1_idx_0` (`pe_donatur_id`) USING BTREE,
  KEY `fk_pah_kas_masuk_pah_bank_accounts1_idx_0` (`pe_bank_accounts_id`) USING BTREE,
  KEY `fk_pah_kas_masuk_users1_idx_0` (`users_id`) USING BTREE,
  CONSTRAINT `fk_pe_kas_masuk` FOREIGN KEY (`pe_donatur_id`) REFERENCES `pe_donatur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_kas_masuk_0` FOREIGN KEY (`pe_bank_accounts_id`) REFERENCES `pe_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pe_kas_masuk_users` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_lampiran
CREATE TABLE IF NOT EXISTS `pe_lampiran` (
  `id_lampiran` smallint(6) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `keterangan` text,
  `satuan` varchar(45) DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id_lampiran`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_member
CREATE TABLE IF NOT EXISTS `pe_member` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `jemaat_nij` varchar(20) NOT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `fk_pah_member_jemaat1_idx_0` (`jemaat_nij`) USING BTREE,
  CONSTRAINT `fk_pe_member` FOREIGN KEY (`jemaat_nij`) REFERENCES `jemaat` (`nij`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_refs
CREATE TABLE IF NOT EXISTS `pe_refs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_no` int(11) NOT NULL DEFAULT '0',
  `type` smallint(6) NOT NULL DEFAULT '0',
  `reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `type_and_reference_0` (`type`,`reference`) USING BTREE,
  KEY `type_no_0` (`type_no`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_sub_aktivitas
CREATE TABLE IF NOT EXISTS `pe_sub_aktivitas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `desc_` text,
  `account_code` varchar(15) DEFAULT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `fk_pah_sub_aktivitas_pah_chart_master1_idx_0` (`account_code`) USING BTREE,
  CONSTRAINT `fk_pe_sub_aktivitas` FOREIGN KEY (`account_code`) REFERENCES `pe_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_suppliers
CREATE TABLE IF NOT EXISTS `pe_suppliers` (
  `supplier_id` int(11) NOT NULL AUTO_INCREMENT,
  `supp_name` varchar(60) NOT NULL DEFAULT '',
  `supp_ref` varchar(30) NOT NULL DEFAULT '',
  `address` tinytext NOT NULL,
  `mail_address` tinytext NOT NULL,
  `gst_no` varchar(25) NOT NULL DEFAULT '',
  `contact` varchar(60) NOT NULL DEFAULT '',
  `supp_account_no` varchar(40) NOT NULL DEFAULT '',
  `website` varchar(100) NOT NULL DEFAULT '',
  `bank_account` varchar(60) NOT NULL DEFAULT '',
  `curr_code` char(3) DEFAULT NULL,
  `payment_terms` int(11) DEFAULT NULL,
  `credit_limit` double NOT NULL DEFAULT '0',
  `purchase_account` varchar(15) NOT NULL DEFAULT '',
  `payable_account` varchar(15) NOT NULL DEFAULT '',
  `payment_discount_account` varchar(15) NOT NULL DEFAULT '',
  `notes` tinytext NOT NULL,
  `inactive` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`supplier_id`),
  KEY `supp_ref_0` (`supp_ref`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_sys_prefs
CREATE TABLE IF NOT EXISTS `pe_sys_prefs` (
  `name` varchar(35) NOT NULL DEFAULT '',
  `value` tinytext,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_sys_types
CREATE TABLE IF NOT EXISTS `pe_sys_types` (
  `type_id` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '1',
  `next_reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.pe_voided
CREATE TABLE IF NOT EXISTS `pe_voided` (
  `id_voided` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0',
  `date_` date NOT NULL DEFAULT '0000-00-00',
  `memo_` tinytext NOT NULL,
  PRIMARY KEY (`id_voided`),
  UNIQUE KEY `id_0` (`type`,`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.security_roles
CREATE TABLE IF NOT EXISTS `security_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(30) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `sections` text,
  `areas` text,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.


-- Dumping structure for table gkkd.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `last_visit_date` datetime DEFAULT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `nij` varchar(20) NOT NULL,
  `security_roles_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`) USING BTREE,
  KEY `fk_users_jemaat1_idx` (`nij`) USING BTREE,
  KEY `fk_users_security_roles1_idx` (`security_roles_id`) USING BTREE,
  CONSTRAINT `fk_users_jemaat1` FOREIGN KEY (`nij`) REFERENCES `jemaat` (`nij`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_security_roles1` FOREIGN KEY (`security_roles_id`) REFERENCES `security_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
