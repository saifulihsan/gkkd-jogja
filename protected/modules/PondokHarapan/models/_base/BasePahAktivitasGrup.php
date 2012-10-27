<?php

/**
 * This is the model base class for the table "pah_aktivitas_grup".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PahAktivitasGrup".
 *
 * Columns in table "pah_aktivitas_grup" available as properties of the model,
 * followed by relations of table "pah_aktivitas_grup" available as properties of the model.
 *
 * @property integer $id
 * @property string $name
 * @property string $notes
 * @property integer $inactive
 *
 * @property PahAktivitasGrupTrans[] $pahAktivitasGrupTrans
 */
abstract class BasePahAktivitasGrup extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'pah_aktivitas_grup';
	}

	public static function representingColumn() {
		return 'name';
	}

	public function rules() {
		return array(
			array('inactive', 'numerical', 'integerOnly'=>true),
			array('name', 'length', 'max'=>50),
			array('notes', 'safe'),
			array('name, notes, inactive', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id, name, notes, inactive', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'pahAktivitasGrupTrans' => array(self::HAS_MANY, 'PahAktivitasGrupTrans', 'pah_aktivitas_grup_id'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'id' => Yii::t('app', 'ID'),
			'name' => Yii::t('app', 'Name'),
			'notes' => Yii::t('app', 'Notes'),
			'inactive' => Yii::t('app', 'Inactive'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id', $this->id);
		$criteria->compare('name', $this->name, true);
		$criteria->compare('notes', $this->notes, true);
		$criteria->compare('inactive', $this->inactive);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}