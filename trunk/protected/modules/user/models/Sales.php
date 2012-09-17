<?php

Yii::import('application.modules.user.models._base.BaseSales');

class Sales extends BaseSales
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}