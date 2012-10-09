<?php

/**
 * This is the model base class for the table "pah_donatur".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PahDonatur".
 *
 * Columns in table "pah_donatur" available as properties of the model,
 * and there are no model relations.
 *
 * @property integer $id
 * @property string $name
 * @property string $phone
 * @property string $alamat
 *
 */
abstract class BasePahDonatur extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'pah_donatur';
	}

	public static function representingColumn() {
		return 'name';
	}

	public function rules() {
		return array(
			array('name', 'length', 'max'=>50),
			array('phone', 'length', 'max'=>30),
			array('alamat', 'safe'),
			array('name, phone, alamat', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id, name, phone, alamat', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
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
			'phone' => Yii::t('app', 'Phone'),
			'alamat' => Yii::t('app', 'Alamat'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id', $this->id);
		$criteria->compare('name', $this->name, true);
		$criteria->compare('phone', $this->phone, true);
		$criteria->compare('alamat', $this->alamat, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}