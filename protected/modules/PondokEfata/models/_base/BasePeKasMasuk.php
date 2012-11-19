<?php

/**
 * This is the model base class for the table "pe_kas_masuk".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PeKasMasuk".
 *
 * Columns in table "pe_kas_masuk" available as properties of the model,
 * followed by relations of table "pe_kas_masuk" available as properties of the model.
 *
 * @property integer $kas_masuk_id
 * @property string $doc_ref
 * @property string $no_bukti
 * @property double $amount
 * @property string $entry_time
 * @property string $trans_date
 * @property string $trans_via
 * @property integer $pe_donatur_id
 * @property integer $pe_bank_accounts_id
 * @property integer $users_id
 *
 * @property Users $users
 * @property PeDonatur $peDonatur
 * @property PeBankAccounts $peBankAccounts
 */
abstract class BasePeKasMasuk extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'pe_kas_masuk';
    }

    public static function representingColumn()
    {
        return 'doc_ref';
    }

    public function rules()
    {
        return array(
            array('pe_donatur_id, pe_bank_accounts_id, users_id', 'required'),
            array('pe_donatur_id, pe_bank_accounts_id, users_id', 'numerical', 'integerOnly' => true),
            array('amount', 'numerical'),
            array('doc_ref', 'length', 'max' => 15),
            array('no_bukti, trans_via', 'length', 'max' => 45),
            array('entry_time, trans_date', 'safe'),
            array('doc_ref, no_bukti, amount, entry_time, trans_date, trans_via', 'default', 'setOnEmpty' => true, 'value' => null),
            array('kas_masuk_id, doc_ref, no_bukti, amount, entry_time, trans_date, trans_via, pe_donatur_id, pe_bank_accounts_id, users_id', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        return array(
            'users' => array(self::BELONGS_TO, 'Users', 'users_id'),
            'peDonatur' => array(self::BELONGS_TO, 'PeDonatur', 'pe_donatur_id'),
            'peBankAccounts' => array(self::BELONGS_TO, 'PeBankAccounts', 'pe_bank_accounts_id'),
        );
    }

    public function pivotModels()
    {
        return array();
    }

    public function attributeLabels()
    {
        return array(
            'kas_masuk_id' => Yii::t('app', 'Kas Masuk'),
            'doc_ref' => Yii::t('app', 'Doc Ref'),
            'no_bukti' => Yii::t('app', 'No Bukti'),
            'amount' => Yii::t('app', 'Amount'),
            'entry_time' => Yii::t('app', 'Entry Time'),
            'trans_date' => Yii::t('app', 'Trans Date'),
            'trans_via' => Yii::t('app', 'Trans Via'),
            'pe_donatur_id' => Yii::t('app', 'Pe Donatur'),
            'pe_bank_accounts_id' => Yii::t('app', 'Pe Bank Accounts'),
            'users_id' => Yii::t('app', 'Users'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('kas_masuk_id', $this->kas_masuk_id);
        $criteria->compare('doc_ref', $this->doc_ref, true);
        $criteria->compare('no_bukti', $this->no_bukti, true);
        $criteria->compare('amount', $this->amount);
        $criteria->compare('entry_time', $this->entry_time, true);
        $criteria->compare('trans_date', $this->trans_date, true);
        $criteria->compare('trans_via', $this->trans_via, true);
        $criteria->compare('pe_donatur_id', $this->pe_donatur_id);
        $criteria->compare('pe_bank_accounts_id', $this->pe_bank_accounts_id);
        $criteria->compare('users_id', $this->users_id);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}