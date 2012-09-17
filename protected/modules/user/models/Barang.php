<?php

Yii::import('application.modules.user.models._base.BaseBarang');

class Barang extends BaseBarang
{
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
}