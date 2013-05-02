<?php
/**
 * Created by novebeta.
 * Date: 9/27/12
 * Time: 3:31 AM
 */
class MtPrefs
{
    static function BankOnHand()
    {
        $model = MtSys::model()->findByPk('default_onhand_act');
        return $model->value;
    }

    static function TypeCostAct()
    {
        $model = MtSys::model()->findByPk('type_cost_act');
        return $model->value;
    }

    static function TypePendapatanAct()
    {
        $model = MtSys::model()->findByPk('type_pendapatan_act');
        return $model->value;
    }
}
