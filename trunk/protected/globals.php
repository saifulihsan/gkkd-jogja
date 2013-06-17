<?php

/**
 * Created by novebeta.
 * Date: 10/21/12
 * Time: 6:01 PM
 */
require_once('security.php');
/**
 * This is the shortcut to DIRECTORY_SEPARATOR
 */
defined('DS') or define('DS', DIRECTORY_SEPARATOR);
defined('KAS_MASUK') or define('KAS_MASUK', 0);
defined('KAS_KELUAR') or define('KAS_KELUAR', 1);
defined('ANGGARAN') or define('ANGGARAN', 2);
defined('AKTIVITAS') or define('AKTIVITAS', 3);
defined('BANKTRANSFER') or define('BANKTRANSFER', 4);
defined('VOID') or define('VOID', 5);
defined('SALDO_AWAL') or define('SALDO_AWAL', 6);
defined('T_AKTIVITASGRUP') or define('T_AKTIVITASGRUP', 7);
defined('JURNAL_UMUM') or define('JURNAL_UMUM', 8);
defined('PINJAM_KENDARAAN') or define('PINJAM_KENDARAAN', 9);
defined('KEMBALI_KENDARAAN') or define('KEMBALI_KENDARAAN', 10);

global $systypes_array;
$systypes_array = array(
    KAS_MASUK => "Kas Masuk",
    KAS_KELUAR => "Kas Keluar",
    ANGGARAN => "Anggaran",
    AKTIVITAS => "Aktivitas",
    BANKTRANSFER => "Mutasi Antar Kas/Bank",
    VOID => "Void Dokumen",
    SALDO_AWAL => "Saldo Awal",
    T_AKTIVITASGRUP => 'Aktivitas Grup',
    JURNAL_UMUM => 'Jurnal Umum',
    PINJAM_KENDARAAN => 'Peminjaman Kendaraan',
    KEMBALI_KENDARAAN => 'Pengembalian Kendaraan'
);

/**
 * This is the shortcut to Yii::app()
 */
function app() {
    return Yii::app();
}

/**
 * This is the shortcut to Yii::app()->clientScript
 */
function cs() {
    // You could also call the client script instance via Yii::app()->clientScript
    // But this is faster
    return Yii::app()->getClientScript();
}

/**
 * This is the shortcut to Yii::app()->user.
 */
function user() {
    return Yii::app()->getUser();
}

/**
 * This is the shortcut to Yii::app()->createUrl()
 */
function url($route, $params = array(), $ampersand = '&') {
    return Yii::app()->createUrl($route, $params, $ampersand);
}

/**
 * This is the shortcut to CHtml::encode
 */
function h($text) {
    return htmlspecialchars($text, ENT_QUOTES, Yii::app()->charset);
}

function dbTrans() {
    return Yii::app()->db->beginTransaction();
}

/**
 * This is the shortcut to CHtml::link()
 */
function l($text, $url = '#', $htmlOptions = array()) {
    return CHtml::link($text, $url, $htmlOptions);
}

/**
 * This is the shortcut to Yii::t() with default category = 'stay'
 */
function t($message, $category = 'stay', $params = array(), $source = null, $language = null) {
    return Yii::t($category, $message, $params, $source, $language);
}

/**
 * This is the shortcut to Yii::app()->request->baseUrl
 * If the parameter is given, it will be returned and prefixed with the app baseUrl.
 */
function bu($url = null) {
    static $baseUrl;
    if ($baseUrl === null) $baseUrl = Yii::app()->getRequest()->getBaseUrl();
    return $url === null ? $baseUrl : $baseUrl . '/' . ltrim($url, '/');
}

/**
 * Returns the named application parameter.
 * This is the shortcut to Yii::app()->params[$name].
 */
function param($name) {
    return Yii::app()->params[$name];
}

function Encrypt($string) {
    return base64_encode(Yii::app()->getSecurityManager()->encrypt($string));
}

function Decrypt($string) {
    return Yii::app()->getSecurityManager()->decrypt(base64_decode($string));
}

function generatePassword($length = 8) {
    $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $count = mb_strlen($chars);
    for ($i = 0, $result = ''; $i < $length; $i++) {
        $index = rand(0, $count - 1);
        $result .= mb_substr($chars, $index, 1);
    }
    return $result;
}

function date2longperiode($date, $format) {
    $timestamp = CDateTimeParser::parse($date, 'yyyy-MM-dd');
    $formater = new CDateFormatter('id_ID');
    return $formater->format($format, $timestamp);
}

function period2date($month, $year) {
    $timestamp = DateTime::createFromFormat('d/m/Y', "01/$month/$year");
    $start = $timestamp->format('Y-m-d');
    $end = $timestamp->format('Y-m-t');
    return array('start' => $start, 'end' => $end);
}

function get_jemaat_from_user($nij) {
    return Jemaat::model()->findByPk($nij);
}

function get_number($number) {
    return str_replace(",", "", $number);
}

function get_jemaat_from_user_id($id) {
    $user = Users::model()->findByPk($id);
    if ($user == null) return false;
    else {
        return get_jemaat_from_user($user->nij);
    }
}

function sql2date($date) {
    $timestamp = CDateTimeParser::parse($date, 'yyyy-MM-dd');
    return Yii::app()->dateFormatter->format('dd/MM/yyyy', $timestamp);
}

function date2sql($date) {
    $timestamp = CDateTimeParser::parse($date, 'dd/MM/yyyy');
    return Yii::app()->dateFormatter->format('yyyy-MM-dd', $timestamp);
}

function sql2long_date($date) {
    $timestamp = CDateTimeParser::parse($date, 'yyyy-MM-dd');
    $formater = new CDateFormatter('id_ID');
    return $formater->formatDateTime($timestamp, 'long', false);
}

function get_date_tomorrow() {
    return Yii::app()->dateFormatter->format('yyyy-MM-dd', time() + (1 * 24 * 60 * 60));
}

function get_time_now() {
    return Yii::app()->dateFormatter->format('HH:mm:ss', time());
}

function get_date_today($format = 'yyyy-MM-dd') {
    return Yii::app()->dateFormatter->format($format, time());
}

function Now($formatDate = 'yyyy-MM-dd') {
    return get_date_today($formatDate) . ' ' . get_time_now();
}

function percent_format($value, $decimal = 0) {
    return number_format($value * 100, $decimal) . '%';
}

function acc_format($value, $decimal = 0) {
    $normalize = $value < 0 ? -$value : $value;
    $print = number_format($normalize, $decimal);
    return $value < 0 ? "($print)" : $print;
}