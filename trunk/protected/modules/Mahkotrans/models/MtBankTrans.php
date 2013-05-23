<?php

Yii::import('application.modules.Mahkotrans.models._base.BaseMtBankTrans');

class MtBankTrans extends BaseMtBankTrans
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}