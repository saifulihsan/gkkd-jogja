<?php

/**
 * This is the model base class for the table "tbl_user".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "TblUser".
 *
 * Columns in table "tbl_user" available as properties of the model,
 * and there are no model relations.
 *
 * @property integer $id
 * @property string $username
 * @property string $password
 * @property string $email
 * @property string $level
 * @property string $nick
 * @property string $complete
 *
 */
abstract class BaseTblUser extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'tbl_user';
	}

	public static function representingColumn() {
		return 'username';
	}

	public function rules() {
		return array(
			array('username, password, email', 'required'),
			array('username, password, email, level, complete', 'length', 'max'=>128),
			array('nick', 'length', 'max'=>10),
			array('level, nick, complete', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id, username, password, email, level, nick, complete', 'safe', 'on'=>'search'),
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
			'username' => Yii::t('app', 'Username'),
			'password' => Yii::t('app', 'Password'),
			'email' => Yii::t('app', 'Email'),
			'level' => Yii::t('app', 'Level'),
			'nick' => Yii::t('app', 'Nick'),
			'complete' => Yii::t('app', 'Complete'),
		);
	}

    protected function afterValidate()
    {
        $this->password = $this->encrypt($this->password);
        return parent::afterValidate();
    }

    public function encrypt($value)
    {
        $enc = NEW bCrypt();
        return $enc->hash($value);
    }

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id', $this->id);
		$criteria->compare('username', $this->username, true);
		$criteria->compare('password', $this->password, true);
		$criteria->compare('email', $this->email, true);
		$criteria->compare('level', $this->level, true);
		$criteria->compare('nick', $this->nick, true);
		$criteria->compare('complete', $this->complete, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}