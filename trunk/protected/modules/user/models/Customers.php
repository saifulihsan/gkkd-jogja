<?php

Yii::import('application.modules.user.models._base.BaseCustomers');

class Customers extends BaseCustomers
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}