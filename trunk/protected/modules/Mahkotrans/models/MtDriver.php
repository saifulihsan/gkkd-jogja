<?php

Yii::import('application.modules.Mahkotrans.models._base.BaseMtDriver');

class MtDriver extends BaseMtDriver
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}