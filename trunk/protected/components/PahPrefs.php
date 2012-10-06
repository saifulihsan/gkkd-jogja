<?php
/**
 * Created by novebeta.
 * Date: 9/27/12
 * Time: 3:31 AM
 */
class PahPrefs
{
    static function BankOnHand(){
        $model = PahSys::model()->findByPk('default_onhand_act');
        return $model->value;
    }

    static function TypeCostAct(){
        $model = PahSys::model()->findByPk('type_cost_act');
        return $model->value;
    }

    static function TypePendapatanAct(){
        $model = PahSys::model()->findByPk('type_pendapatan_act');
        return $model->value;
    }

}
