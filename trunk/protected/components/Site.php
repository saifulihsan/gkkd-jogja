<?php
/**
 * Created by novebeta.
 * Date: 10/2/12
 * Time: 5:21 AM
 */
class Site
{
    static function get_jemaat_from_user($nij)
    {
        return Jemaat::model()->findByPk($nij);
    }

    static function get_jemaat_from_user_id($id)
    {
        $user = Users::model()->findByPk($id);
        if ($user == null)
            return false;
        else {
            return Site::get_jemaat_from_user($user->nij);
        }
    }

//---------------------------------------------  Format  ---------------------------------------------------------------
    static function get_number($number)
    {
        return str_replace(",", "", $number);
    }

    static function sql2date($date)
    {
        $timestamp = CDateTimeParser::parse($date, 'yyyy-MM-dd');
        return Yii::app()->dateFormatter->format('dd/MM/yyyy', $timestamp);
    }

    static function date2sql($date)
    {
        $timestamp = CDateTimeParser::parse($date, 'dd/MM/yyyy');
        return Yii::app()->dateFormatter->format('yyyy-MM-dd', $timestamp);
    }

    static function sql2long_date($date)
    {
        $timestamp = CDateTimeParser::parse($date, 'yyyy-MM-dd');
        $formater = new CDateFormatter('id_ID');
        return $formater->formatDateTime($timestamp, 'long', false);
    }

//---------------------------------------------- DateTime --------------------------------------------------------------
    static function get_date_tomorrow()
    {
        return Yii::app()->dateFormatter->format('yyyy-MM-dd', time() + (1 * 24 * 60 * 60));
    }

    static function get_time_now()
    {
        return Yii::app()->dateFormatter->format('HH:mm:ss', time());
    }

    static function get_date_today($format = 'yyyy-MM-dd')
    {
        return Yii::app()->dateFormatter->format($format, time());
    }

    static function period2date($month, $year)
    {
        $timestamp = DateTime::createFromFormat('d/m/Y', "01/$month/$year");
        $start = $timestamp->format('Y-m-d');
        $end = $timestamp->format('Y-m-t');
        return array('start' => $start, 'end' => $end);
    }

    static function date2longperiode($date, $format)
    {
        $timestamp = CDateTimeParser::parse($date, 'yyyy-MM-dd');
        $formater = new CDateFormatter('id_ID');
        return $formater->format($format, $timestamp);
    }

    static function generatePassword($length = 8)
    {
        $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        $count = mb_strlen($chars);
        for ($i = 0, $result = ''; $i < $length; $i++) {
            $index = rand(0, $count - 1);
            $result .= mb_substr($chars, $index, 1);
        }
        return $result;
    }
}
