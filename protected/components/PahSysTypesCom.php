<?php
/**
 * Created by novebeta.
 * Date: 9/26/12
 * Time: 8:32 PM
 */
class PahSysTypesCom
{
    static function defaultBankOnHand(){
        $model = PahSysTypes::model()->findByPk('default_onhand_act');
        return $model->value;
    }
}
