<?php

/**
 * This is the model base class for the table "pah_member".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PahMember".
 *
 * Columns in table "pah_member" available as properties of the model,
 * followed by relations of table "pah_member" available as properties of the model.
 *
 * @property integer $id
 * @property string $jemaat_nij
 * @property integer $inactive
 *
 * @property PahAktivitas[] $pahAktivitases
 * @property Jemaat $jemaatNij
 */
abstract class BasePahMember extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'pah_member';
	}

	public static function representingColumn() {
		return 'jemaat_nij';
	}

	public function rules() {
		return array(
			array('jemaat_nij', 'required'),
			array('inactive', 'numerical', 'integerOnly'=>true),
			array('jemaat_nij', 'length', 'max'=>20),
			array('inactive', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id, jemaat_nij, inactive', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'pahAktivitases' => array(self::HAS_MANY, 'PahAktivitas', 'pah_member_id'),
			'jemaatNij' => array(self::BELONGS_TO, 'Jemaat', 'jemaat_nij'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'id' => Yii::t('app', 'ID'),
			'jemaat_nij' => Yii::t('app', 'Jemaat Nij'),
			'inactive' => Yii::t('app', 'Inactive'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id', $this->id);
		$criteria->compare('jemaat_nij', $this->jemaat_nij);
		$criteria->compare('inactive', $this->inactive);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}