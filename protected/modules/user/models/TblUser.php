<?php

Yii::import('application.modules.user.models._base.BaseTblUser');

class TblUser extends BaseTblUser
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}