<?php

/**
 * This is the model base class for the table "jemaat".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "Jemaat".
 *
 * Columns in table "jemaat" available as properties of the model,
 * followed by relations of table "jemaat" available as properties of the model.
 *
 * @property string $nij
 * @property string $real_name
 * @property string $phone
 * @property string $email
 * @property integer $inactive
 * @property string $alamat
 * @property string $gender
 * @property string $birthdate
 * @property string $education
 * @property string $hometown
 *
 * @property PahMember[] $pahMembers
 * @property PeMember[] $peMembers
 * @property Users[] $users
 */
abstract class BaseJemaat extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'jemaat';
	}

	public static function representingColumn() {
		return 'real_name';
	}

	public function rules() {
		return array(
			array('nij', 'required'),
			array('inactive', 'numerical', 'integerOnly'=>true),
			array('nij', 'length', 'max'=>20),
			array('real_name, email', 'length', 'max'=>100),
			array('phone', 'length', 'max'=>30),
			array('gender', 'length', 'max'=>1),
			array('education', 'length', 'max'=>255),
			array('alamat, birthdate, hometown', 'safe'),
			array('real_name, phone, email, inactive, alamat, gender, birthdate, education, hometown', 'default', 'setOnEmpty' => true, 'value' => null),
			array('nij, real_name, phone, email, inactive, alamat, gender, birthdate, education, hometown', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'pahMembers' => array(self::HAS_MANY, 'PahMember', 'jemaat_nij'),
			'peMembers' => array(self::HAS_MANY, 'PeMember', 'jemaat_nij'),
			'users' => array(self::HAS_MANY, 'Users', 'nij'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'nij' => Yii::t('app', 'Nij'),
			'real_name' => Yii::t('app', 'Real Name'),
			'phone' => Yii::t('app', 'Phone'),
			'email' => Yii::t('app', 'Email'),
			'inactive' => Yii::t('app', 'Inactive'),
			'alamat' => Yii::t('app', 'Alamat'),
			'gender' => Yii::t('app', 'Gender'),
			'birthdate' => Yii::t('app', 'Birthdate'),
			'education' => Yii::t('app', 'Education'),
			'hometown' => Yii::t('app', 'Hometown'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('nij', $this->nij, true);
		$criteria->compare('real_name', $this->real_name, true);
		$criteria->compare('phone', $this->phone, true);
		$criteria->compare('email', $this->email, true);
		$criteria->compare('inactive', $this->inactive);
		$criteria->compare('alamat', $this->alamat, true);
		$criteria->compare('gender', $this->gender, true);
		$criteria->compare('birthdate', $this->birthdate, true);
		$criteria->compare('education', $this->education, true);
		$criteria->compare('hometown', $this->hometown, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}