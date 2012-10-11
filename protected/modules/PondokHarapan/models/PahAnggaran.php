<?php

Yii::import('application.modules.PondokHarapan.models._base.BasePahAnggaran');
class PahAnggaran extends BasePahAnggaran
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function behaviors()
    {
        return array(
            'withRelated' => array(
                'class' => 'ext.wr.WithRelatedBehavior',
            ),
        );
    }
}