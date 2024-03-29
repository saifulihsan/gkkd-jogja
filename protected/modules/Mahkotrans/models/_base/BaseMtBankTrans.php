<?php

/**
 * This is the model base class for the table "mt_bank_trans".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtBankTrans".
 *
 * Columns in table "mt_bank_trans" available as properties of the model,
 * followed by relations of table "mt_bank_trans" available as properties of the model.
 *
 * @property integer $id
 * @property integer $type
 * @property integer $trans_no
 * @property integer $bank_act
 * @property string $ref
 * @property string $trans_date
 * @property double $amount
 * @property integer $users_id
 *
 * @property MtBankAccounts $bankAct
 * @property Users $users
 */
abstract class BaseMtBankTrans extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_bank_trans';
	}

	public static function representingColumn() {
		return 'ref';
	}

	public function rules() {
		return array(
			array('users_id', 'required'),
			array('type, trans_no, bank_act, users_id', 'numerical', 'integerOnly'=>true),
			array('amount', 'numerical'),
			array('ref', 'length', 'max'=>40),
			array('trans_date', 'safe'),
			array('type, trans_no, bank_act, ref, trans_date, amount', 'default', 'setOnEmpty' => true, 'value' => null),
			array('id, type, trans_no, bank_act, ref, trans_date, amount, users_id', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'bankAct' => array(self::BELONGS_TO, 'MtBankAccounts', 'bank_act'),
			'users' => array(self::BELONGS_TO, 'Users', 'users_id'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'id' => Yii::t('app', 'ID'),
			'type' => Yii::t('app', 'Type'),
			'trans_no' => Yii::t('app', 'Trans No'),
			'bank_act' => Yii::t('app', 'Bank Act'),
			'ref' => Yii::t('app', 'Ref'),
			'trans_date' => Yii::t('app', 'Trans Date'),
			'amount' => Yii::t('app', 'Amount'),
			'users_id' => Yii::t('app', 'Users'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('id', $this->id);
		$criteria->compare('type', $this->type);
		$criteria->compare('trans_no', $this->trans_no);
		$criteria->compare('bank_act', $this->bank_act);
		$criteria->compare('ref', $this->ref, true);
		$criteria->compare('trans_date', $this->trans_date, true);
		$criteria->compare('amount', $this->amount);
		$criteria->compare('users_id', $this->users_id);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}