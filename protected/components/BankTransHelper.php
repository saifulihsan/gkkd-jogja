<?php
/**
 * Created by JetBrains PhpStorm.
 * User: axioo
 * Date: 9/6/12
 * Time: 7:33 PM
 * To change this template use File | Settings | File Templates.
 */
class BankTransHelper
{
    static function get_balance_before_for_bank_account($bank_account, $from)
    {
        $db = BankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT SUM(amount)
        FROM bank_trans where bank_act=$bank_account AND trans_date < '$from'")->queryScalar();
        return $total;
    }

    static function get_bank_trans_for_bank_account($bank_account, $from, $to)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("bank_act =".$bank_account);
        $criteria->addCondition("trans_date >= '$from'");
        $criteria->addCondition("trans_date <= '$to'");
        $criteria->order = "trans_date, id";
        return BankTrans::model()->findAll($criteria);
    }


}
