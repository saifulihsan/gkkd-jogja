<?php

/**
 * This is the model base class for the table "mt_aktivitas_grup_trans".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtAktivitasGrupTrans".
 *
 * Columns in table "mt_aktivitas_grup_trans" available as properties of the model,
 * followed by relations of table "mt_aktivitas_grup_trans" available as properties of the model.
 *
 * @property integer $aktivitas_id
 * @property string $doc_ref
 * @property string $no_bukti
 * @property double $amount
 * @property string $entry_time
 * @property string $trans_date
 * @property string $trans_via
 * @property integer $mt_suppliers_supplier_id
 * @property integer $mt_bank_accounts_id
 * @property integer $users_id
 * @property integer $mt_aktivitas_grup_id
 * @property integer $mt_sub_aktivitas_id
 * @property string $note
 *
 * @property MtAktivitasGrup $pahAktivitasGrup
 * @property MtSubAktivitas $pahSubAktivitas
 * @property MtBankAccounts $pahBankAccounts
 * @property MtSuppliers $pahSuppliersSupplier
 * @property Users $users
 */
abstract class BaseMtAktivitasGrupTrans extends GxActiveRecord {

	public static function model($className=__CLASS__) {
		return parent::model($className);
	}

	public function tableName() {
		return 'mt_aktivitas_grup_trans';
	}

	public static function representingColumn() {
		return 'doc_ref';
	}

	public function rules() {
		return array(
			array('mt_suppliers_supplier_id, mt_bank_accounts_id, users_id, mt_aktivitas_grup_id, mt_sub_aktivitas_id', 'required'),
			array('mt_suppliers_supplier_id, mt_bank_accounts_id, users_id, mt_aktivitas_grup_id, mt_sub_aktivitas_id', 'numerical', 'integerOnly'=>true),
			array('amount', 'numerical'),
			array('doc_ref', 'length', 'max'=>15),
			array('no_bukti, trans_via', 'length', 'max'=>45),
			array('entry_time, trans_date, note', 'safe'),
			array('doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, note', 'default', 'setOnEmpty' => true, 'value' => null),
			array('aktivitas_id, doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, mt_suppliers_supplier_id, mt_bank_accounts_id, users_id, mt_aktivitas_grup_id, mt_sub_aktivitas_id, note', 'safe', 'on'=>'search'),
		);
	}

	public function relations() {
		return array(
			'pahAktivitasGrup' => array(self::BELONGS_TO, 'MtAktivitasGrup', 'mt_aktivitas_grup_id'),
			'pahSubAktivitas' => array(self::BELONGS_TO, 'MtSubAktivitas', 'mt_sub_aktivitas_id'),
			'pahBankAccounts' => array(self::BELONGS_TO, 'MtBankAccounts', 'mt_bank_accounts_id'),
			'pahSuppliersSupplier' => array(self::BELONGS_TO, 'MtSuppliers', 'mt_suppliers_supplier_id'),
			'users' => array(self::BELONGS_TO, 'Users', 'users_id'),
		);
	}

	public function pivotModels() {
		return array(
		);
	}

	public function attributeLabels() {
		return array(
			'aktivitas_id' => Yii::t('app', 'Aktivitas'),
			'doc_ref' => Yii::t('app', 'Doc Ref'),
			'no_bukti' => Yii::t('app', 'No Bukti'),
			'amount' => Yii::t('app', 'Amount'),
			'entry_time' => Yii::t('app', 'Entry Time'),
			'trans_date' => Yii::t('app', 'Trans Date'),
			'trans_via' => Yii::t('app', 'Trans Via'),
			'mt_suppliers_supplier_id' => Yii::t('app', 'Mt Suppliers Supplier'),
			'mt_bank_accounts_id' => Yii::t('app', 'Mt Bank Accounts'),
			'users_id' => Yii::t('app', 'Users'),
			'mt_aktivitas_grup_id' => Yii::t('app', 'Mt Aktivitas Grup'),
			'mt_sub_aktivitas_id' => Yii::t('app', 'Mt Sub Aktivitas'),
			'note' => Yii::t('app', 'Note'),
		);
	}

	public function search() {
		$criteria = new CDbCriteria;

		$criteria->compare('aktivitas_id', $this->aktivitas_id);
		$criteria->compare('doc_ref', $this->doc_ref, true);
		$criteria->compare('no_bukti', $this->no_bukti, true);
		$criteria->compare('amount', $this->amount);
		$criteria->compare('entry_time', $this->entry_time, true);
		$criteria->compare('trans_date', $this->trans_date, true);
		$criteria->compare('trans_via', $this->trans_via, true);
		$criteria->compare('mt_suppliers_supplier_id', $this->mt_suppliers_supplier_id);
		$criteria->compare('mt_bank_accounts_id', $this->mt_bank_accounts_id);
		$criteria->compare('users_id', $this->users_id);
		$criteria->compare('mt_aktivitas_grup_id', $this->mt_aktivitas_grup_id);
		$criteria->compare('mt_sub_aktivitas_id', $this->mt_sub_aktivitas_id);
		$criteria->compare('note', $this->note, true);

		return new CActiveDataProvider(get_class($this), array(
			'criteria' => $criteria,
		));
	}
}