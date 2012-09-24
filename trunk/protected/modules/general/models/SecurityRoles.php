<?php

Yii::import('application.modules.general.models._base.BaseSecurityRoles');

class SecurityRoles extends BaseSecurityRoles
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}