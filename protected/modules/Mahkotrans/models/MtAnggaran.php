<?php

Yii::import('application.modules.Mahkotrans.models._base.BaseMtAnggaran');
class MtAnggaran extends BaseMtAnggaran
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