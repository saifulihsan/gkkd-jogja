<?php
/**
 * Created by novebeta.
 * Date: 9/27/12
 * Time: 3:31 AM
 */
class PePrefs
{
    static function BankOnHand()
    {
        $model = PeSysPrefs::model()->findByPk('default_onhand_act');
        return $model->value;
    }

    static function TypeCostAct()
    {
        $model = PeSysPrefs::model()->findByPk('type_cost_act');
        return $model->value;
    }

    static function TypePendapatanAct()
    {
        $model = PeSysPrefs::model()->findByPk('type_pendapatan_act');
        return $model->value;
    }
}
