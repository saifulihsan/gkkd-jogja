<?php

Yii::import('application.modules.Mahkotrans.models._base.BaseMtBankAccounts');

class MtBankAccounts extends BaseMtBankAccounts
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}