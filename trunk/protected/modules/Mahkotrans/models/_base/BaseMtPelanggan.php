<?php

/**
 * This is the model base class for the table "mt_pelanggan".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtPelanggan".
 *
 * Columns in table "mt_pelanggan" available as properties of the model,
 * followed by relations of table "mt_pelanggan" available as properties of the model.
 *
 * @property integer $id_pelanggan
 * @property string $nama
 * @property string $no_tlp
 * @property string $alamat
 * @property integer $inactive
 *
 * @property MtPinjamKendaraan[] $mtPinjamKendaraans
 */
abstract class BaseMtPelanggan extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_pelanggan';
	}

	public static function representingColumn() {
		return 'nama';
	}

	public function rules() {
		return array(
			array('nama', 'required'),
			array('inactive', 'numerical', 'integerOnly'=>true),
			array('nama', 'length', 'max'=>50),
			array('no_tlp', 'length', 'max'=>30),
			array('alamat', 'length', 'max'=>225),
			array('no_tlp, alamat, inactive', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id_pelanggan, nama, no_tlp, alamat, inactive', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'mtPinjamKendaraans' => array(self::HAS_MANY, 'MtPinjamKendaraan', 'id_pelanggan'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'id_pelanggan' => Yii::t('app', 'Id Pelanggan'),
			'nama' => Yii::t('app', 'Nama'),
			'no_tlp' => Yii::t('app', 'No Tlp'),
			'alamat' => Yii::t('app', 'Alamat'),
			'inactive' => Yii::t('app', 'Inactive'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id_pelanggan', $this->id_pelanggan);
		$criteria->compare('nama', $this->nama, true);
		$criteria->compare('no_tlp', $this->no_tlp, true);
		$criteria->compare('alamat', $this->alamat, true);
		$criteria->compare('inactive', $this->inactive);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}