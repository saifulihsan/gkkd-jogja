<?php

/**
 * This is the model base class for the table "mt_kas_masuk".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtKasMasuk".
 *
 * Columns in table "mt_kas_masuk" available as properties of the model,
 * followed by relations of table "mt_kas_masuk" available as properties of the model.
 *
 * @property integer $kas_masuk_id
 * @property string $doc_ref
 * @property string $no_bukti
 * @property double $amount
 * @property string $entry_time
 * @property string $trans_date
 * @property string $trans_via
 * @property integer $mt_bank_accounts_id
 * @property integer $users_id
 * @property string $note
 * @property integer $id_mobil
 * @property string $account_code
 * @property string $dari
 *
 * @property MtChartMaster $accountCode
 * @property MtBankAccounts $mtBankAccounts
 * @property MtMobil $idMobil
 * @property Users $users
 */
abstract class BaseMtKasMasuk extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_kas_masuk';
	}

	public static function representingColumn() {
		return 'dari';
	}

	public function rules() {
		return array(
			array('mt_bank_accounts_id, users_id, dari', 'required'),
			array('mt_bank_accounts_id, users_id, id_mobil', 'numerical', 'integerOnly'=>true),
			array('amount', 'numerical'),
			array('doc_ref, account_code', 'length', 'max'=>15),
			array('no_bukti, trans_via', 'length', 'max'=>45),
			array('dari', 'length', 'max'=>30),
			array('entry_time, trans_date, note', 'safe'),
			array('doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, note, id_mobil, account_code', 'default', 'setOnEmpty' => true, 'value' => null),
			array('kas_masuk_id, doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, mt_bank_accounts_id, users_id, note, id_mobil, account_code, dari', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'accountCode' => array(self::BELONGS_TO, 'MtChartMaster', 'account_code'),
			'mtBankAccounts' => array(self::BELONGS_TO, 'MtBankAccounts', 'mt_bank_accounts_id'),
			'idMobil' => array(self::BELONGS_TO, 'MtMobil', 'id_mobil'),
			'users' => array(self::BELONGS_TO, 'Users', 'users_id'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'kas_masuk_id' => Yii::t('app', 'Kas Masuk'),
			'doc_ref' => Yii::t('app', 'Doc Ref'),
			'no_bukti' => Yii::t('app', 'No Bukti'),
			'amount' => Yii::t('app', 'Amount'),
			'entry_time' => Yii::t('app', 'Entry Time'),
			'trans_date' => Yii::t('app', 'Trans Date'),
			'trans_via' => Yii::t('app', 'Trans Via'),
			'mt_bank_accounts_id' => Yii::t('app', 'Mt Bank Accounts'),
			'users_id' => Yii::t('app', 'Users'),
			'note' => Yii::t('app', 'Note'),
			'id_mobil' => Yii::t('app', 'Id Mobil'),
			'account_code' => Yii::t('app', 'Account Code'),
			'dari' => Yii::t('app', 'Dari'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('kas_masuk_id', $this->kas_masuk_id);
		$criteria->compare('doc_ref', $this->doc_ref, true);
		$criteria->compare('no_bukti', $this->no_bukti, true);
		$criteria->compare('amount', $this->amount);
		$criteria->compare('entry_time', $this->entry_time, true);
		$criteria->compare('trans_date', $this->trans_date, true);
		$criteria->compare('trans_via', $this->trans_via, true);
		$criteria->compare('mt_bank_accounts_id', $this->mt_bank_accounts_id);
		$criteria->compare('users_id', $this->users_id);
		$criteria->compare('note', $this->note, true);
		$criteria->compare('id_mobil', $this->id_mobil);
		$criteria->compare('account_code', $this->account_code);
		$criteria->compare('dari', $this->dari, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}