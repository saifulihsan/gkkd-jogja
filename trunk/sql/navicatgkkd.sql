/*
Navicat MySQL Data Transfer

Source Server         : wanted.old
Source Server Version : 50516
Source Host           : localhost:3306
Source Database       : gkkd

Target Server Type    : MYSQL
Target Server Version : 50516
File Encoding         : 65001

Date: 2012-11-03 16:36:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `jemaat`
-- ----------------------------
DROP TABLE IF EXISTS `jemaat`;
CREATE TABLE `jemaat` (
  `nij` varchar(20) NOT NULL,
  `real_name` varchar(100) NOT NULL DEFAULT '',
  `phone` varchar(30) NOT NULL DEFAULT '',
  `email` varchar(100) DEFAULT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `alamat` text,
  PRIMARY KEY (`nij`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of jemaat
-- ----------------------------
INSERT INTO `jemaat` VALUES ('0', 'Administrator', '', null, '0', null);
INSERT INTO `jemaat` VALUES ('1', 'Stephanus Nove Anando', '088215173200', 'novebeta@gmail.com', '0', 'Perum Tirta Kirana B6 Nologaten');
INSERT INTO `jemaat` VALUES ('2', 'Amelia Beta', '-', '-', '0', '-');

-- ----------------------------
-- Table structure for `pah_aktivitas`
-- ----------------------------
DROP TABLE IF EXISTS `pah_aktivitas`;
CREATE TABLE `pah_aktivitas` (
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
  PRIMARY KEY (`aktivitas_id`),
  KEY `fk_pah_aktivitas_pah_sub_aktivitas1_idx` (`pah_sub_aktivitas_id`),
  KEY `fk_pah_aktivitas_pah_member1_idx` (`pah_member_id`),
  KEY `fk_pah_aktivitas_pah_suppliers1_idx` (`pah_suppliers_supplier_id`),
  KEY `fk_pah_aktivitas_pah_bank_accounts1_idx` (`pah_bank_accounts_id`),
  KEY `fk_pah_aktivitas_users1_idx` (`users_id`),
  CONSTRAINT `fk_pah_aktivitas_pah_bank_accounts1` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_member1` FOREIGN KEY (`pah_member_id`) REFERENCES `pah_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_sub_aktivitas1` FOREIGN KEY (`pah_sub_aktivitas_id`) REFERENCES `pah_sub_aktivitas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_suppliers1` FOREIGN KEY (`pah_suppliers_supplier_id`) REFERENCES `pah_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_aktivitas
-- ----------------------------
INSERT INTO `pah_aktivitas` VALUES ('1', 'AKA00000001', '1', '90000', '2012-11-03 15:23:18', '2012-11-09', 'Tunai', '1', '7', '2', '1', '1');
INSERT INTO `pah_aktivitas` VALUES ('2', 'AKA00000002', '2', '120000', '2012-11-03 15:23:53', '2012-11-10', 'Tunai', '2', '7', '1', '2', '1');
INSERT INTO `pah_aktivitas` VALUES ('3', 'AKA00000003', '3', '70000', '2012-11-03 15:28:27', '2012-11-09', 'Tunai', '1', '7', '2', '2', '1');

-- ----------------------------
-- Table structure for `pah_aktivitas_grup`
-- ----------------------------
DROP TABLE IF EXISTS `pah_aktivitas_grup`;
CREATE TABLE `pah_aktivitas_grup` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `notes` text,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_aktivitas_grup
-- ----------------------------
INSERT INTO `pah_aktivitas_grup` VALUES ('2', 'Kelompok Renang', '-', '0');
INSERT INTO `pah_aktivitas_grup` VALUES ('3', 'Kelompok Les', '-', '0');
INSERT INTO `pah_aktivitas_grup` VALUES ('4', 'Kelompok Menari', 'underconstruction', '0');

-- ----------------------------
-- Table structure for `pah_aktivitas_grup_trans`
-- ----------------------------
DROP TABLE IF EXISTS `pah_aktivitas_grup_trans`;
CREATE TABLE `pah_aktivitas_grup_trans` (
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
  PRIMARY KEY (`aktivitas_id`),
  KEY `fk_pah_aktivitas_pah_suppliers1_idx` (`pah_suppliers_supplier_id`),
  KEY `fk_pah_aktivitas_pah_bank_accounts1_idx` (`pah_bank_accounts_id`),
  KEY `fk_pah_aktivitas_users1_idx` (`users_id`),
  KEY `fk_pah_aktivitas_grup_trans_pah_aktivitas_grup1_idx` (`pah_aktivitas_grup_id`),
  KEY `fk_pah_aktivitas_grup_trans_pah_sub_aktivitas1_idx` (`pah_sub_aktivitas_id`),
  CONSTRAINT `fk_pah_aktivitas_grup_trans_pah_aktivitas_grup1` FOREIGN KEY (`pah_aktivitas_grup_id`) REFERENCES `pah_aktivitas_grup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_grup_trans_pah_sub_aktivitas1` FOREIGN KEY (`pah_sub_aktivitas_id`) REFERENCES `pah_sub_aktivitas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_bank_accounts10` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_pah_suppliers10` FOREIGN KEY (`pah_suppliers_supplier_id`) REFERENCES `pah_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_aktivitas_users10` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_aktivitas_grup_trans
-- ----------------------------
INSERT INTO `pah_aktivitas_grup_trans` VALUES ('1', 'AKG00000001', '1', '20000', '2012-11-03 15:24:42', '2012-11-10', 'Transfer', '1', '8', '1', '2', '1');
INSERT INTO `pah_aktivitas_grup_trans` VALUES ('2', 'AKG00000002', '2', '400000', '2012-11-03 15:25:13', '2012-11-10', 'Tunai', '2', '7', '1', '3', '2');
INSERT INTO `pah_aktivitas_grup_trans` VALUES ('3', 'AKG00000003', '3', '400000', '2012-11-03 15:29:27', '2012-11-15', 'Debet', '2', '8', '1', '4', '1');

-- ----------------------------
-- Table structure for `pah_anggaran`
-- ----------------------------
DROP TABLE IF EXISTS `pah_anggaran`;
CREATE TABLE `pah_anggaran` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `doc_ref` varchar(15) DEFAULT NULL,
  `periode_bulan` smallint(2) DEFAULT NULL,
  `periode_tahun` smallint(4) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `lock` tinyint(1) DEFAULT '0',
  `users_id` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_anggaran_users1_idx` (`users_id`),
  CONSTRAINT `fk_pah_anggaran_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_anggaran
-- ----------------------------
INSERT INTO `pah_anggaran` VALUES ('1', 'AGR00000001', '11', '2012', '2012-11-03', '0', '1');

-- ----------------------------
-- Table structure for `pah_anggaran_detil`
-- ----------------------------
DROP TABLE IF EXISTS `pah_anggaran_detil`;
CREATE TABLE `pah_anggaran_detil` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `pah_anggaran_id` smallint(6) NOT NULL,
  `amount` double DEFAULT NULL,
  `pah_chart_master_account_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_anggaran_detil_pah_anggaran1_idx` (`pah_anggaran_id`),
  KEY `fk_pah_anggaran_detil_pah_chart_master1_idx` (`pah_chart_master_account_code`),
  CONSTRAINT `fk_pah_anggaran_detil_pah_anggaran1` FOREIGN KEY (`pah_anggaran_id`) REFERENCES `pah_anggaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_anggaran_detil_pah_chart_master1` FOREIGN KEY (`pah_chart_master_account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_anggaran_detil
-- ----------------------------
INSERT INTO `pah_anggaran_detil` VALUES ('5', '1', '500000', '570');
INSERT INTO `pah_anggaran_detil` VALUES ('6', '1', '200000', '540');
INSERT INTO `pah_anggaran_detil` VALUES ('7', '1', '300000', '530');
INSERT INTO `pah_anggaran_detil` VALUES ('8', '1', '250000', '520');
INSERT INTO `pah_anggaran_detil` VALUES ('9', '1', '450000', '510');

-- ----------------------------
-- Table structure for `pah_bank_accounts`
-- ----------------------------
DROP TABLE IF EXISTS `pah_bank_accounts`;
CREATE TABLE `pah_bank_accounts` (
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_bank_accounts
-- ----------------------------
INSERT INTO `pah_bank_accounts` VALUES ('7', '110', '0', 'Kas di Tangan', '-', '-', '-', '', '0', '0', '0', '-', '-');
INSERT INTO `pah_bank_accounts` VALUES ('8', '120', '0', 'Kas di Bank', '-', '-', '-', '', '0', '0', '0', '-', '-');

-- ----------------------------
-- Table structure for `pah_bank_trans`
-- ----------------------------
DROP TABLE IF EXISTS `pah_bank_trans`;
CREATE TABLE `pah_bank_trans` (
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_bank_trans
-- ----------------------------
INSERT INTO `pah_bank_trans` VALUES ('1', '6', '0', '7', '-', '2012-11-01', '500000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('2', '0', '1', '7', 'KMS00000001', '2012-11-02', '2000000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('3', '0', '2', '8', 'KMS00000002', '2012-11-04', '500000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('4', '1', '1', '7', 'KKR00000001', '2012-11-05', '-600000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('5', '1', '2', '8', 'KKR00000002', '2012-11-07', '-300000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('6', '1', '3', '7', 'KKR00000003', '2012-11-07', '-400000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('7', '1', '4', '7', 'KKR00000004', '2012-11-07', '-100000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('8', '5', '4', '7', 'KKR00000004', '2012-11-07', '100000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('9', '3', '1', '7', 'AKA00000001', '2012-11-09', '-90000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('10', '3', '2', '7', 'AKA00000002', '2012-11-10', '-120000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('11', '7', '1', '8', 'AKG00000001', '2012-11-10', '-20000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('12', '7', '2', '7', 'AKG00000002', '2012-11-10', '-400000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('13', '4', '0', '8', 'BTR00000001', '2012-11-12', '100000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('14', '4', '0', '7', 'BTR00000001', '2012-11-12', '-100000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('15', '3', '3', '7', 'AKA00000003', '2012-11-09', '-70000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('16', '5', '3', '7', 'AKA00000003', '2012-11-09', '70000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('17', '7', '3', '8', 'AKG00000003', '2012-11-15', '-400000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('18', '5', '3', '8', 'AKG00000003', '2012-11-15', '400000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('19', '1', '5', '7', 'KKR00000005', '2012-11-15', '-50000', null, '1');
INSERT INTO `pah_bank_trans` VALUES ('20', '5', '5', '7', 'KKR00000005', '2012-11-15', '50000', null, '1');

-- ----------------------------
-- Table structure for `pah_chart_class`
-- ----------------------------
DROP TABLE IF EXISTS `pah_chart_class`;
CREATE TABLE `pah_chart_class` (
  `cid` varchar(3) NOT NULL,
  `class_name` varchar(60) NOT NULL DEFAULT '',
  `ctype` tinyint(1) NOT NULL DEFAULT '0',
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_chart_class
-- ----------------------------
INSERT INTO `pah_chart_class` VALUES ('1', 'Harta', '1', '0');
INSERT INTO `pah_chart_class` VALUES ('2', 'Kewajiban', '2', '0');
INSERT INTO `pah_chart_class` VALUES ('3', 'Pendapatan', '4', '0');
INSERT INTO `pah_chart_class` VALUES ('4', 'Pengeluaran', '6', '0');

-- ----------------------------
-- Table structure for `pah_chart_master`
-- ----------------------------
DROP TABLE IF EXISTS `pah_chart_master`;
CREATE TABLE `pah_chart_master` (
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

-- ----------------------------
-- Records of pah_chart_master
-- ----------------------------
INSERT INTO `pah_chart_master` VALUES ('110', '', 'Kas di Tangan', '1', '0', '123');
INSERT INTO `pah_chart_master` VALUES ('120', '', 'Kas di Bank', '1', '0', '-');
INSERT INTO `pah_chart_master` VALUES ('410', '', 'Anggaran HO', '7', '0', 'Kas dari kantor pusat');
INSERT INTO `pah_chart_master` VALUES ('420', '', 'Donasi', '7', '0', 'Sumbangan pihak eksternal');
INSERT INTO `pah_chart_master` VALUES ('430', '', 'Pendapatan Lain-lain', '7', '0', '-');
INSERT INTO `pah_chart_master` VALUES ('510', '', 'Food', '5', '0', 'Uang makan dan snack');
INSERT INTO `pah_chart_master` VALUES ('520', '', 'Suplies (Non Food)', '5', '0', 'Sabun, shampo, pasta gigi, sikat gigi, pembalut, pembersih kaca dan lantai, bayclin, bedak, handbody, cotton bud, rexona, minyak rambut, dan lain sebagainya');
INSERT INTO `pah_chart_master` VALUES ('530', '', 'Transportasi', '5', '0', 'Parkir mobil dan motor, bensin, taxi');
INSERT INTO `pah_chart_master` VALUES ('540', '', 'Utilitas', '5', '0', 'Listrik, telpon, air, ronda, tukang cuci, iuran sampah');
INSERT INTO `pah_chart_master` VALUES ('550', '', 'Rumah Tangga', '5', '0', 'Peralatan dan perawatan rumah tangga');
INSERT INTO `pah_chart_master` VALUES ('570', '', 'Aktivitas Anak', '5', '0', 'Uang saku, rekreasi anak, olah raga, sewa vcd, kebutuhan sekolah, les, eskul, penggalian bakat, speedy, perpustakaan (buku, majalah, koran), spp, daftar ulang dan lain sebagainya.');
INSERT INTO `pah_chart_master` VALUES ('580', '', 'Kesehatan', '5', '0', 'Berobat dan obat');
INSERT INTO `pah_chart_master` VALUES ('590', '', 'Lain-lain', '5', '0', 'PBB, atau apapun yang tidak dapat dikelompokkan dalam kelompok di atas.');
INSERT INTO `pah_chart_master` VALUES ('600', '', 'tes', '5', '1', '-');

-- ----------------------------
-- Table structure for `pah_chart_types`
-- ----------------------------
DROP TABLE IF EXISTS `pah_chart_types`;
CREATE TABLE `pah_chart_types` (
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

-- ----------------------------
-- Records of pah_chart_types
-- ----------------------------
INSERT INTO `pah_chart_types` VALUES ('1', 'Kas dan Bank', '1', '', '0');
INSERT INTO `pah_chart_types` VALUES ('5', 'Beban', '2', '', '0');
INSERT INTO `pah_chart_types` VALUES ('7', 'Pendapatan', '3', '', '0');

-- ----------------------------
-- Table structure for `pah_comments`
-- ----------------------------
DROP TABLE IF EXISTS `pah_comments`;
CREATE TABLE `pah_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '0',
  `date_` date DEFAULT '0000-00-00',
  `memo_` tinytext,
  PRIMARY KEY (`id`),
  KEY `type_and_id` (`type`,`id`) USING BTREE,
  KEY `type_no` (`type_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_comments
-- ----------------------------
INSERT INTO `pah_comments` VALUES ('1', '6', '0', '2012-11-01', '-');
INSERT INTO `pah_comments` VALUES ('2', '0', '1', '2012-11-02', '-');
INSERT INTO `pah_comments` VALUES ('3', '0', '1', '2012-11-02', '-');
INSERT INTO `pah_comments` VALUES ('4', '0', '2', '2012-11-04', '-');
INSERT INTO `pah_comments` VALUES ('5', '0', '2', '2012-11-04', '-');
INSERT INTO `pah_comments` VALUES ('6', '1', '1', '2012-11-05', '-');
INSERT INTO `pah_comments` VALUES ('7', '1', '1', '2012-11-05', '-');
INSERT INTO `pah_comments` VALUES ('8', '1', '2', '2012-11-07', '-');
INSERT INTO `pah_comments` VALUES ('9', '1', '2', '2012-11-07', '-');
INSERT INTO `pah_comments` VALUES ('10', '1', '3', '2012-11-07', '-');
INSERT INTO `pah_comments` VALUES ('11', '1', '3', '2012-11-07', '-');
INSERT INTO `pah_comments` VALUES ('12', '1', '4', '2012-11-07', '-');
INSERT INTO `pah_comments` VALUES ('13', '1', '4', '2012-11-07', '-');
INSERT INTO `pah_comments` VALUES ('14', '5', '4', '2012-11-07', 'VOID Kas Keluar KKR00000004');
INSERT INTO `pah_comments` VALUES ('15', '5', '4', '2012-11-07', 'VOID Kas Keluar KKR00000004');
INSERT INTO `pah_comments` VALUES ('16', '3', '1', '2012-11-09', '-');
INSERT INTO `pah_comments` VALUES ('17', '3', '1', '2012-11-09', '-');
INSERT INTO `pah_comments` VALUES ('18', '3', '2', '2012-11-10', '-');
INSERT INTO `pah_comments` VALUES ('19', '3', '2', '2012-11-10', '-');
INSERT INTO `pah_comments` VALUES ('20', '7', '1', '2012-11-10', '-');
INSERT INTO `pah_comments` VALUES ('21', '7', '1', '2012-11-10', '-');
INSERT INTO `pah_comments` VALUES ('22', '7', '2', '2012-11-10', '-');
INSERT INTO `pah_comments` VALUES ('23', '7', '2', '2012-11-10', '-');
INSERT INTO `pah_comments` VALUES ('24', '3', '3', '2012-11-09', '-');
INSERT INTO `pah_comments` VALUES ('25', '3', '3', '2012-11-09', '-');
INSERT INTO `pah_comments` VALUES ('26', '5', '3', '2012-11-09', 'VOID Aktivitas AKA00000003');
INSERT INTO `pah_comments` VALUES ('27', '5', '3', '2012-11-09', 'VOID Aktivitas AKA00000003');
INSERT INTO `pah_comments` VALUES ('28', '7', '3', '2012-11-15', '-');
INSERT INTO `pah_comments` VALUES ('29', '7', '3', '2012-11-15', '-');
INSERT INTO `pah_comments` VALUES ('30', '5', '3', '2012-11-15', 'VOID Aktivitas Grup AKG00000003');
INSERT INTO `pah_comments` VALUES ('31', '5', '3', '2012-11-15', 'VOID Aktivitas Grup AKG00000003');
INSERT INTO `pah_comments` VALUES ('32', '1', '5', '2012-11-15', '-');
INSERT INTO `pah_comments` VALUES ('33', '1', '5', '2012-11-15', '-');
INSERT INTO `pah_comments` VALUES ('34', '5', '5', '2012-11-15', 'VOID Kas Keluar KKR00000005');
INSERT INTO `pah_comments` VALUES ('35', '5', '5', '2012-11-15', 'VOID Kas Keluar KKR00000005');

-- ----------------------------
-- Table structure for `pah_donatur`
-- ----------------------------
DROP TABLE IF EXISTS `pah_donatur`;
CREATE TABLE `pah_donatur` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `alamat` tinytext,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `pah_chart_master_account_code` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pah_donatur_pah_chart_master1_idx` (`pah_chart_master_account_code`),
  CONSTRAINT `fk_pah_donatur_pah_chart_master1` FOREIGN KEY (`pah_chart_master_account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_donatur
-- ----------------------------
INSERT INTO `pah_donatur` VALUES ('1', 'Head Office (HO)', '-', '-', '0', '410');
INSERT INTO `pah_donatur` VALUES ('2', 'Donatur', '-', '-', '0', '420');
INSERT INTO `pah_donatur` VALUES ('3', 'Lain-lain', '-', '-', '0', '430');

-- ----------------------------
-- Table structure for `pah_gl_trans`
-- ----------------------------
DROP TABLE IF EXISTS `pah_gl_trans`;
CREATE TABLE `pah_gl_trans` (
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_gl_trans
-- ----------------------------
INSERT INTO `pah_gl_trans` VALUES ('1', '6', '0', '2012-11-01', '110', '-', '500000', '1');
INSERT INTO `pah_gl_trans` VALUES ('2', '0', '1', '2012-11-02', '110', '-', '2000000', '1');
INSERT INTO `pah_gl_trans` VALUES ('3', '0', '1', '2012-11-02', '410', '-', '-2000000', '1');
INSERT INTO `pah_gl_trans` VALUES ('4', '0', '2', '2012-11-04', '120', '-', '500000', '1');
INSERT INTO `pah_gl_trans` VALUES ('5', '0', '2', '2012-11-04', '420', '-', '-500000', '1');
INSERT INTO `pah_gl_trans` VALUES ('6', '1', '1', '2012-11-05', '510', '-', '600000', '1');
INSERT INTO `pah_gl_trans` VALUES ('7', '1', '1', '2012-11-05', '110', '-', '-600000', '1');
INSERT INTO `pah_gl_trans` VALUES ('8', '1', '2', '2012-11-07', '520', '-', '300000', '1');
INSERT INTO `pah_gl_trans` VALUES ('9', '1', '2', '2012-11-07', '120', '-', '-300000', '1');
INSERT INTO `pah_gl_trans` VALUES ('10', '1', '3', '2012-11-07', '580', '-', '400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('11', '1', '3', '2012-11-07', '110', '-', '-400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('12', '1', '4', '2012-11-07', '510', '-', '100000', '1');
INSERT INTO `pah_gl_trans` VALUES ('13', '1', '4', '2012-11-07', '110', '-', '-100000', '1');
INSERT INTO `pah_gl_trans` VALUES ('14', '5', '4', '2012-11-07', '110', 'VOID Kas Keluar KKR00000004', '100000', '1');
INSERT INTO `pah_gl_trans` VALUES ('15', '5', '4', '2012-11-07', '510', 'VOID Kas Keluar KKR00000004', '-100000', '1');
INSERT INTO `pah_gl_trans` VALUES ('16', '3', '1', '2012-11-09', '570', '-', '90000', '1');
INSERT INTO `pah_gl_trans` VALUES ('17', '3', '1', '2012-11-09', '110', '-', '-90000', '1');
INSERT INTO `pah_gl_trans` VALUES ('18', '3', '2', '2012-11-10', '580', '-', '120000', '1');
INSERT INTO `pah_gl_trans` VALUES ('19', '3', '2', '2012-11-10', '110', '-', '-120000', '1');
INSERT INTO `pah_gl_trans` VALUES ('20', '7', '1', '2012-11-10', '570', '-', '20000', '1');
INSERT INTO `pah_gl_trans` VALUES ('21', '7', '1', '2012-11-10', '120', '-', '-20000', '1');
INSERT INTO `pah_gl_trans` VALUES ('22', '7', '2', '2012-11-10', '580', '-', '400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('23', '7', '2', '2012-11-10', '110', '-', '-400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('24', '3', '3', '2012-11-09', '580', '-', '70000', '1');
INSERT INTO `pah_gl_trans` VALUES ('25', '3', '3', '2012-11-09', '110', '-', '-70000', '1');
INSERT INTO `pah_gl_trans` VALUES ('26', '5', '3', '2012-11-09', '110', 'VOID Aktivitas AKA00000003', '70000', '1');
INSERT INTO `pah_gl_trans` VALUES ('27', '5', '3', '2012-11-09', '580', 'VOID Aktivitas AKA00000003', '-70000', '1');
INSERT INTO `pah_gl_trans` VALUES ('28', '7', '3', '2012-11-15', '570', '-', '400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('29', '7', '3', '2012-11-15', '120', '-', '-400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('30', '5', '3', '2012-11-15', '120', 'VOID Aktivitas Grup AKG00000003', '400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('31', '5', '3', '2012-11-15', '570', 'VOID Aktivitas Grup AKG00000003', '-400000', '1');
INSERT INTO `pah_gl_trans` VALUES ('32', '1', '5', '2012-11-15', '530', '-', '50000', '1');
INSERT INTO `pah_gl_trans` VALUES ('33', '1', '5', '2012-11-15', '110', '-', '-50000', '1');
INSERT INTO `pah_gl_trans` VALUES ('34', '5', '5', '2012-11-15', '110', 'VOID Kas Keluar KKR00000005', '50000', '1');
INSERT INTO `pah_gl_trans` VALUES ('35', '5', '5', '2012-11-15', '530', 'VOID Kas Keluar KKR00000005', '-50000', '1');

-- ----------------------------
-- Table structure for `pah_kas_keluar`
-- ----------------------------
DROP TABLE IF EXISTS `pah_kas_keluar`;
CREATE TABLE `pah_kas_keluar` (
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
  PRIMARY KEY (`kas_keluar_id`),
  KEY `fk_pah_kas_keluar_pah_suppliers1_idx` (`pah_suppliers_supplier_id`),
  KEY `fk_pah_kas_keluar_pah_chart_master1_idx` (`pah_chart_master_account_code`),
  KEY `fk_pah_kas_keluar_pah_bank_accounts1_idx` (`pah_bank_accounts_id`),
  KEY `fk_pah_kas_keluar_users1_idx` (`users_id`),
  CONSTRAINT `fk_pah_kas_keluar_pah_bank_accounts1` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_keluar_pah_chart_master1` FOREIGN KEY (`pah_chart_master_account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_keluar_pah_suppliers1` FOREIGN KEY (`pah_suppliers_supplier_id`) REFERENCES `pah_suppliers` (`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_keluar_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_kas_keluar
-- ----------------------------
INSERT INTO `pah_kas_keluar` VALUES ('1', 'KKR00000001', '1', '600000', '2012-11-03 15:19:51', '2012-11-05', 'Tunai', '1', '510', '7', '1');
INSERT INTO `pah_kas_keluar` VALUES ('2', 'KKR00000002', '2', '300000', '2012-11-03 15:20:22', '2012-11-07', 'Tunai', '1', '520', '8', '1');
INSERT INTO `pah_kas_keluar` VALUES ('3', 'KKR00000003', '3', '400000', '2012-11-03 15:21:20', '2012-11-07', 'Tunai', '2', '580', '7', '1');
INSERT INTO `pah_kas_keluar` VALUES ('4', 'KKR00000004', '4', '100000', '2012-11-03 15:22:11', '2012-11-07', 'Tunai', '1', '510', '7', '1');
INSERT INTO `pah_kas_keluar` VALUES ('5', 'KKR00000005', '5', '50000', '2012-11-03 15:42:56', '2012-11-15', 'Tunai', '2', '530', '7', '1');

-- ----------------------------
-- Table structure for `pah_kas_masuk`
-- ----------------------------
DROP TABLE IF EXISTS `pah_kas_masuk`;
CREATE TABLE `pah_kas_masuk` (
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
  PRIMARY KEY (`kas_masuk_id`),
  KEY `fk_pah_kas_masuk_pah_donatur1_idx` (`pah_donatur_id`),
  KEY `fk_pah_kas_masuk_pah_bank_accounts1_idx` (`pah_bank_accounts_id`),
  KEY `fk_pah_kas_masuk_users1_idx` (`users_id`),
  CONSTRAINT `fk_pah_kas_masuk_pah_bank_accounts1` FOREIGN KEY (`pah_bank_accounts_id`) REFERENCES `pah_bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_masuk_pah_donatur1` FOREIGN KEY (`pah_donatur_id`) REFERENCES `pah_donatur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pah_kas_masuk_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_kas_masuk
-- ----------------------------
INSERT INTO `pah_kas_masuk` VALUES ('1', 'KMS00000001', '1', '2000000', '2012-11-03 15:15:00', '2012-11-02', 'Tunai', '1', '7', '1');
INSERT INTO `pah_kas_masuk` VALUES ('2', 'KMS00000002', '2', '500000', '2012-11-03 15:15:37', '2012-11-04', 'Tunai', '2', '8', '1');

-- ----------------------------
-- Table structure for `pah_lampiran`
-- ----------------------------
DROP TABLE IF EXISTS `pah_lampiran`;
CREATE TABLE `pah_lampiran` (
  `id_lampiran` smallint(6) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) DEFAULT NULL,
  `trans_date` date DEFAULT NULL,
  `keterangan` text,
  `satuan` varchar(45) DEFAULT NULL,
  `qty` double DEFAULT NULL,
  `entry_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id_lampiran`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_lampiran
-- ----------------------------
INSERT INTO `pah_lampiran` VALUES ('1', 'ayin', '2012-11-13', 'beras', 'kuintal', '1', '2012-11-03 15:26:41');
INSERT INTO `pah_lampiran` VALUES ('2', 'gimel', '2012-11-21', 'gula', 'kg', '10', '2012-11-03 15:27:07');

-- ----------------------------
-- Table structure for `pah_member`
-- ----------------------------
DROP TABLE IF EXISTS `pah_member`;
CREATE TABLE `pah_member` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `jemaat_nij` varchar(20) NOT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_pah_member_jemaat1_idx` (`jemaat_nij`),
  CONSTRAINT `fk_pah_member_jemaat1` FOREIGN KEY (`jemaat_nij`) REFERENCES `jemaat` (`nij`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_member
-- ----------------------------
INSERT INTO `pah_member` VALUES ('1', '1', '0');
INSERT INTO `pah_member` VALUES ('2', '2', '0');

-- ----------------------------
-- Table structure for `pah_refs`
-- ----------------------------
DROP TABLE IF EXISTS `pah_refs`;
CREATE TABLE `pah_refs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_no` int(11) NOT NULL DEFAULT '0',
  `type` smallint(6) NOT NULL DEFAULT '0',
  `reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `Type_and_Reference` (`type`,`reference`) USING BTREE,
  KEY `type_no` (`type_no`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_refs
-- ----------------------------
INSERT INTO `pah_refs` VALUES ('1', '1', '0', 'KMS00000001');
INSERT INTO `pah_refs` VALUES ('2', '2', '0', 'KMS00000002');
INSERT INTO `pah_refs` VALUES ('3', '1', '2', 'AGR00000001');
INSERT INTO `pah_refs` VALUES ('4', '1', '1', 'KKR00000001');
INSERT INTO `pah_refs` VALUES ('5', '2', '1', 'KKR00000002');
INSERT INTO `pah_refs` VALUES ('6', '3', '1', 'KKR00000003');
INSERT INTO `pah_refs` VALUES ('7', '4', '1', 'KKR00000004');
INSERT INTO `pah_refs` VALUES ('8', '1', '3', 'AKA00000001');
INSERT INTO `pah_refs` VALUES ('9', '2', '3', 'AKA00000002');
INSERT INTO `pah_refs` VALUES ('10', '1', '7', 'AKG00000001');
INSERT INTO `pah_refs` VALUES ('11', '2', '7', 'AKG00000002');
INSERT INTO `pah_refs` VALUES ('12', '0', '4', 'BTR00000001');
INSERT INTO `pah_refs` VALUES ('13', '3', '3', 'AKA00000003');
INSERT INTO `pah_refs` VALUES ('14', '3', '7', 'AKG00000003');
INSERT INTO `pah_refs` VALUES ('15', '5', '1', 'KKR00000005');

-- ----------------------------
-- Table structure for `pah_sub_aktivitas`
-- ----------------------------
DROP TABLE IF EXISTS `pah_sub_aktivitas`;
CREATE TABLE `pah_sub_aktivitas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `desc` text,
  `account_code` varchar(15) NOT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_pah_sub_aktivitas_pah_chart_master1_idx` (`account_code`),
  CONSTRAINT `fk_pah_sub_aktivitas_pah_chart_master1` FOREIGN KEY (`account_code`) REFERENCES `pah_chart_master` (`account_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_sub_aktivitas
-- ----------------------------
INSERT INTO `pah_sub_aktivitas` VALUES ('1', 'SPP', '-', '570', '0');
INSERT INTO `pah_sub_aktivitas` VALUES ('2', 'Pengobatan dan Imunisasi', '-', '580', '0');

-- ----------------------------
-- Table structure for `pah_suppliers`
-- ----------------------------
DROP TABLE IF EXISTS `pah_suppliers`;
CREATE TABLE `pah_suppliers` (
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_suppliers
-- ----------------------------
INSERT INTO `pah_suppliers` VALUES ('1', 'Carefour', 'Carefour', '-', '-', '', '', '', '', '', null, null, '0', '', '', '', '-', '0');
INSERT INTO `pah_suppliers` VALUES ('2', 'superindo', 'superindo', 'underconstruction', 'underconstruction ', '', '', '', '', '', null, null, '0', '', '', '', 'underconstruction', '0');

-- ----------------------------
-- Table structure for `pah_sys_prefs`
-- ----------------------------
DROP TABLE IF EXISTS `pah_sys_prefs`;
CREATE TABLE `pah_sys_prefs` (
  `name` varchar(35) NOT NULL DEFAULT '',
  `value` tinytext,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_sys_prefs
-- ----------------------------
INSERT INTO `pah_sys_prefs` VALUES ('default_onhand_act', '7');
INSERT INTO `pah_sys_prefs` VALUES ('type_cost_act', '5');
INSERT INTO `pah_sys_prefs` VALUES ('type_pendapatan_act', '7');

-- ----------------------------
-- Table structure for `pah_sys_types`
-- ----------------------------
DROP TABLE IF EXISTS `pah_sys_types`;
CREATE TABLE `pah_sys_types` (
  `type_id` smallint(6) NOT NULL DEFAULT '0',
  `type_no` int(11) NOT NULL DEFAULT '1',
  `next_reference` varchar(100) NOT NULL DEFAULT '',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_sys_types
-- ----------------------------
INSERT INTO `pah_sys_types` VALUES ('0', '1', 'KMS00000003');
INSERT INTO `pah_sys_types` VALUES ('1', '1', 'KKR00000006');
INSERT INTO `pah_sys_types` VALUES ('2', '1', 'AGR00000002');
INSERT INTO `pah_sys_types` VALUES ('3', '1', 'AKA00000004');
INSERT INTO `pah_sys_types` VALUES ('4', '1', 'BTR00000002');
INSERT INTO `pah_sys_types` VALUES ('7', '1', 'AKG00000004');

-- ----------------------------
-- Table structure for `pah_voided`
-- ----------------------------
DROP TABLE IF EXISTS `pah_voided`;
CREATE TABLE `pah_voided` (
  `id_voided` smallint(6) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `id` int(11) NOT NULL DEFAULT '0',
  `date_` date NOT NULL DEFAULT '0000-00-00',
  `memo_` tinytext NOT NULL,
  PRIMARY KEY (`id_voided`),
  UNIQUE KEY `id` (`type`,`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of pah_voided
-- ----------------------------
INSERT INTO `pah_voided` VALUES ('1', '1', '4', '2012-11-07', 'salah input');
INSERT INTO `pah_voided` VALUES ('2', '3', '3', '2012-11-09', 'salah input');
INSERT INTO `pah_voided` VALUES ('3', '7', '3', '2012-11-15', 'salah');
INSERT INTO `pah_voided` VALUES ('4', '1', '5', '2012-11-15', 'salah');

-- ----------------------------
-- Table structure for `security_roles`
-- ----------------------------
DROP TABLE IF EXISTS `security_roles`;
CREATE TABLE `security_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(30) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `sections` text,
  `areas` text,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role` (`role`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of security_roles
-- ----------------------------
INSERT INTO `security_roles` VALUES ('1', 'Inquiries', 'Inquiries', '768;2816;3072;3328;5632;5888;8192;8448;10752;11008;13312;15872;16128', '257;258;259;260;513;514;515;516;517;518;519;520;521;522;523;524;525;773;774;2822;3073;3075;3076;3077;3329;3330;3331;3332;3333;3334;3335;5377;5633;5640;5889;5890;5891;7937;7938;7939;7940;8193;8194;8450;8451;10497;10753;11009;11010;11012;13313;13315;15617;15618;15619;15620;15621;15622;15623;15624;15625;15626;15873;15882;16129;16130;16131;16132', '0');
INSERT INTO `security_roles` VALUES ('2', 'System Administrator', 'System Administrator', '256;512;768;2816;3072;3328;5376;5632;5888;7936;8192;8448;10496;10752;11008;13056;13312;15616;15872;16128', '257;258;259;260;513;514;515;516;517;518;519;520;521;522;523;524;525;526;769;770;771;772;773;774;2817;2818;2819;2820;2821;2822;2823;3073;3074;3082;3075;3076;3077;3078;3079;3080;3081;3329;3330;3331;3332;3333;3334;3335;5377;5633;5634;5635;5636;5637;5641;5638;5639;5640;5889;5890;5891;7937;7938;7939;7940;8193;8194;8195;8196;8197;8449;8450;8451;10497;10753;10754;10755;10756;10757;11009;11010;11011;11012;13057;13313;13314;13315;15617;15618;15619;15620;15621;15622;15623;15624;15628;15625;15626;15627;15873;15874;15875;15876;15877;15878;15879;15880;15883;15881;15882;16129;16130;16131;16132', '0');
INSERT INTO `security_roles` VALUES ('11', 'Pengurus Pondok Harapan', 'Pengurus Pondok Asuh Harapan', null, null, '0');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `last_visit_date` datetime DEFAULT NULL,
  `inactive` tinyint(1) NOT NULL DEFAULT '0',
  `nij` varchar(20) NOT NULL,
  `security_roles_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`) USING BTREE,
  KEY `fk_users_jemaat1_idx` (`nij`),
  KEY `fk_users_security_roles1_idx` (`security_roles_id`),
  CONSTRAINT `fk_users_jemaat1` FOREIGN KEY (`nij`) REFERENCES `jemaat` (`nij`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_users_security_roles1` FOREIGN KEY (`security_roles_id`) REFERENCES `security_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '$2a$12$RWK.UtRECG0g7vO5ZEXfx.1YJFek1Gs0d/ug4aUOVGElYE7X3Mala', '2012-11-03 15:09:16', '0', '0', '0');
INSERT INTO `users` VALUES ('3', 'nove', '$2a$12$lFiY1ZWG6/UQrGOy2oC5uOLqW77mDw2lKn4dAPQNFksLYmz368FQq', '2012-10-13 19:39:01', '0', '1', '2');
INSERT INTO `users` VALUES ('4', 'beta', '$2a$12$IctLgrti/8czy2h.I.iwFOKfR/rGR3OFKFqpTfCH/r2UKCTCzA2Oe', '2012-11-02 20:41:08', '0', '2', '11');
