<?php
/**
 * Created by novebeta.
 * Date: 9/6/12
 * Time: 7:33 PM
 */
class PahBankTransCom
{
    static function get_balance_before_for_bank_account($bank_account, $from)
    {
        $db = PahBankTrans::model()->getDbConnection();
        $total = $db->createCommand("SELECT SUM(amount)
        FROM pah_bank_trans where bank_act=$bank_account AND trans_date < '$from'")->queryScalar();
        return $total == null ? 0 : $total;
    }

    static function get_bank_trans_for_bank_account($bank_account, $from, $to)
    {
        $criteria = new CDbCriteria();
        $criteria->addCondition("bank_act =".$bank_account);
        $criteria->addCondition("trans_date >= '$from'");
        $criteria->addCondition("trans_date <= '$to'");
        $criteria->order = "trans_date, id";
        return PahBankTrans::model()->findAll($criteria);
    }


}
