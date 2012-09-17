<?php

Yii::import('application.modules.wanted.models._base.BaseBankAccounts');

class BankAccounts extends BaseBankAccounts
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}