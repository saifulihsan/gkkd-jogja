<?php

/**
 * This is the model base class for the table "mt_kelompok_pelanggan".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtKelompokPelanggan".
 *
 * Columns in table "mt_kelompok_pelanggan" available as properties of the model,
 * followed by relations of table "mt_kelompok_pelanggan" available as properties of the model.
 *
 * @property integer $id_kelompok
 * @property string $nama
 * @property double $discont_persen
 *
 * @property MtPinjamKendaraan[] $mtPinjamKendaraans
 */
abstract class BaseMtKelompokPelanggan extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_kelompok_pelanggan';
	}

	public static function representingColumn() {
		return 'nama';
	}

	public function rules() {
		return array(
			array('nama', 'required'),
			array('discont_persen', 'numerical'),
			array('nama', 'length', 'max'=>50),
			array('discont_persen', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id_kelompok, nama, discont_persen', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'mtPinjamKendaraans' => array(self::HAS_MANY, 'MtPinjamKendaraan', 'id_kelompok'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'id_kelompok' => Yii::t('app', 'Id Kelompok'),
			'nama' => Yii::t('app', 'Nama'),
			'discont_persen' => Yii::t('app', 'Discont Persen'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id_kelompok', $this->id_kelompok);
		$criteria->compare('nama', $this->nama, true);
		$criteria->compare('discont_persen', $this->discont_persen);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}