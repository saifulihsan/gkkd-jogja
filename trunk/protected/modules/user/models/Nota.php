<?php

Yii::import('application.modules.user.models._base.BaseNota');

class Nota extends BaseNota
{
   
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}