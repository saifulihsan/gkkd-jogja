<?php

/**
 * This is the model base class for the table "mt_kas_keluar".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtKasKeluar".
 *
 * Columns in table "mt_kas_keluar" available as properties of the model,
 * followed by relations of table "mt_kas_keluar" available as properties of the model.
 *
 * @property integer $kas_keluar_id
 * @property string $doc_ref
 * @property string $no_bukti
 * @property double $amount
 * @property string $entry_time
 * @property string $trans_date
 * @property string $trans_via
 * @property string $mt_account_code
 * @property integer $mt_bank_accounts_id
 * @property integer $users_id
 * @property string $note
 * @property integer $id_mobil
 *
 * @property MtChartMaster $mtAccountCode
 * @property MtBankAccounts $mtBankAccounts
 * @property MtMobil $idMobil
 * @property Users $users
 */
abstract class BaseMtKasKeluar extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_kas_keluar';
	}

	public static function representingColumn() {
		return 'doc_ref';
	}

	public function rules() {
		return array(
			array('mt_account_code, mt_bank_accounts_id, users_id', 'required'),
			array('mt_bank_accounts_id, users_id, id_mobil', 'numerical', 'integerOnly'=>true),
			array('amount', 'numerical'),
			array('doc_ref, mt_account_code', 'length', 'max'=>15),
			array('no_bukti, trans_via', 'length', 'max'=>45),
			array('entry_time, trans_date, note', 'safe'),
			array('doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, note, id_mobil', 'default', 'setOnEmpty' => true, 'value' => null),
			array('kas_keluar_id, doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, mt_account_code, mt_bank_accounts_id, users_id, note, id_mobil', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'mtAccountCode' => array(self::BELONGS_TO, 'MtChartMaster', 'mt_account_code'),
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
			'kas_keluar_id' => Yii::t('app', 'Kas Keluar'),
			'doc_ref' => Yii::t('app', 'Doc Ref'),
			'no_bukti' => Yii::t('app', 'No Bukti'),
			'amount' => Yii::t('app', 'Amount'),
			'entry_time' => Yii::t('app', 'Entry Time'),
			'trans_date' => Yii::t('app', 'Trans Date'),
			'trans_via' => Yii::t('app', 'Trans Via'),
			'mt_account_code' => Yii::t('app', 'Mt Account Code'),
			'mt_bank_accounts_id' => Yii::t('app', 'Mt Bank Accounts'),
			'users_id' => Yii::t('app', 'Users'),
			'note' => Yii::t('app', 'Note'),
			'id_mobil' => Yii::t('app', 'Id Mobil'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('kas_keluar_id', $this->kas_keluar_id);
		$criteria->compare('doc_ref', $this->doc_ref, true);
		$criteria->compare('no_bukti', $this->no_bukti, true);
		$criteria->compare('amount', $this->amount);
		$criteria->compare('entry_time', $this->entry_time, true);
		$criteria->compare('trans_date', $this->trans_date, true);
		$criteria->compare('trans_via', $this->trans_via, true);
		$criteria->compare('mt_account_code', $this->mt_account_code);
		$criteria->compare('mt_bank_accounts_id', $this->mt_bank_accounts_id);
		$criteria->compare('users_id', $this->users_id);
		$criteria->compare('note', $this->note, true);
		$criteria->compare('id_mobil', $this->id_mobil);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}