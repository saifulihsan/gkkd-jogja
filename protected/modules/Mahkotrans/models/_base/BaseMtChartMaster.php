<?php

/**
 * This is the model base class for the table "mt_chart_master".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtChartMaster".
 *
 * Columns in table "mt_chart_master" available as properties of the model,
 * followed by relations of table "mt_chart_master" available as properties of the model.
 *
 * @property string $account_code
 * @property string $account_code2
 * @property string $account_name
 * @property string $account_type
 * @property integer $inactive
 * @property string $description
 *
 * @property MtBankAccounts[] $mtBankAccounts
 * @property MtChartTypes $accountType
 * @property MtGlTrans[] $mtGlTrans
 * @property MtKasKeluar[] $mtKasKeluars
 * @property MtKasMasuk[] $mtKasMasuks
 */
abstract class BaseMtChartMaster extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_chart_master';
	}

	public static function representingColumn() {
		return 'account_code2';
	}

	public function rules() {
		return array(
			array('inactive', 'numerical', 'integerOnly'=>true),
			array('account_code, account_code2', 'length', 'max'=>15),
			array('account_name', 'length', 'max'=>60),
			array('account_type', 'length', 'max'=>10),
			array('description', 'safe'),
			array('account_code, account_code2, account_name, account_type, inactive, description', 'default', 'setOnEmpty' => true, 'value' => null),
			array('account_code, account_code2, account_name, account_type, inactive, description', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'mtBankAccounts' => array(self::HAS_MANY, 'MtBankAccounts', 'account_code'),
			'accountType' => array(self::BELONGS_TO, 'MtChartTypes', 'account_type'),
			'mtGlTrans' => array(self::HAS_MANY, 'MtGlTrans', 'account'),
			'mtKasKeluars' => array(self::HAS_MANY, 'MtKasKeluar', 'mt_account_code'),
			'mtKasMasuks' => array(self::HAS_MANY, 'MtKasMasuk', 'account_code'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'account_code' => Yii::t('app', 'Account Code'),
			'account_code2' => Yii::t('app', 'Account Code2'),
			'account_name' => Yii::t('app', 'Account Name'),
			'account_type' => Yii::t('app', 'Account Type'),
			'inactive' => Yii::t('app', 'Inactive'),
			'description' => Yii::t('app', 'Description'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('account_code', $this->account_code, true);
		$criteria->compare('account_code2', $this->account_code2, true);
		$criteria->compare('account_name', $this->account_name, true);
		$criteria->compare('account_type', $this->account_type);
		$criteria->compare('inactive', $this->inactive);
		$criteria->compare('description', $this->description, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}