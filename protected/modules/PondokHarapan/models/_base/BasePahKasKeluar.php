<?php

/**
 * This is the model base class for the table "pah_kas_keluar".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PahKasKeluar".
 *
 * Columns in table "pah_kas_keluar" available as properties of the model,
 * followed by relations of table "pah_kas_keluar" available as properties of the model.
 *
 * @property integer $kas_keluar_id
 * @property string $doc_ref
 * @property string $no_bukti
 * @property double $amount
 * @property string $entry_time
 * @property string $trans_date
 * @property string $trans_via
 * @property integer $pah_suppliers_supplier_id
 * @property string $pah_chart_master_account_code
 * @property integer $pah_bank_accounts_id
 * @property integer $users_id
 * @property string $note
 *
 * @property PahBankAccounts $pahBankAccounts
 * @property PahChartMaster $pahChartMasterAccountCode
 * @property PahSuppliers $pahSuppliersSupplier
 * @property Users $users
 */
abstract class BasePahKasKeluar extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'pah_kas_keluar';
	}

	public static function representingColumn() {
		return 'doc_ref';
	}

	public function rules() {
		return array(
			array('pah_suppliers_supplier_id, pah_chart_master_account_code, pah_bank_accounts_id, users_id', 'required'),
			array('pah_suppliers_supplier_id, pah_bank_accounts_id, users_id', 'numerical', 'integerOnly'=>true),
			array('amount', 'numerical'),
			array('doc_ref, pah_chart_master_account_code', 'length', 'max'=>15),
			array('no_bukti, trans_via', 'length', 'max'=>45),
			array('entry_time, trans_date, note', 'safe'),
			array('doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, note', 'default', 'setOnEmpty' => true, 'value' => null),
			array('kas_keluar_id, doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, pah_suppliers_supplier_id, pah_chart_master_account_code, pah_bank_accounts_id, users_id, note', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'pahBankAccounts' => array(self::BELONGS_TO, 'PahBankAccounts', 'pah_bank_accounts_id'),
			'pahChartMasterAccountCode' => array(self::BELONGS_TO, 'PahChartMaster', 'pah_chart_master_account_code'),
			'pahSuppliersSupplier' => array(self::BELONGS_TO, 'PahSuppliers', 'pah_suppliers_supplier_id'),
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
			'pah_suppliers_supplier_id' => Yii::t('app', 'Pah Suppliers Supplier'),
			'pah_chart_master_account_code' => Yii::t('app', 'Pah Chart Master Account Code'),
			'pah_bank_accounts_id' => Yii::t('app', 'Pah Bank Accounts'),
			'users_id' => Yii::t('app', 'Users'),
			'note' => Yii::t('app', 'Note'),
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
		$criteria->compare('pah_suppliers_supplier_id', $this->pah_suppliers_supplier_id);
		$criteria->compare('pah_chart_master_account_code', $this->pah_chart_master_account_code);
		$criteria->compare('pah_bank_accounts_id', $this->pah_bank_accounts_id);
		$criteria->compare('users_id', $this->users_id);
		$criteria->compare('note', $this->note, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}