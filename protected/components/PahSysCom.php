<?php
/**
 * Created by novebeta.
 * Date: 9/27/12
 * Time: 3:31 AM
 */
class PahSysCom
{
    function defaultBankOnHand(){
        $model = PahSys::model()->findByPk('default_onhand_act');
        return $model->value;
    }

}
