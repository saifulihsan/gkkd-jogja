<?php

/**
 * This is the model base class for the table "mt_anggaran_detil".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtAnggaranDetil".
 *
 * Columns in table "mt_anggaran_detil" available as properties of the model,
 * followed by relations of table "mt_anggaran_detil" available as properties of the model.
 *
 * @property integer $id
 * @property integer $mt_anggaran_id
 * @property double $amount
 * @property string $mt_chart_master_account_code
 *
 * @property MtAnggaran $pahAnggaran
 * @property MtChartMaster $pahChartMasterAccountCode
 */
abstract class BaseMtAnggaranDetil extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'mt_anggaran_detil';
    }

    public static function representingColumn()
    {
        return 'mt_chart_master_account_code';
    }

    public function rules()
    {
        return array(
            array('mt_anggaran_id, mt_chart_master_account_code', 'required'),
            array('mt_anggaran_id', 'numerical', 'integerOnly' => true),
            array('amount', 'numerical'),
            array('mt_chart_master_account_code', 'length', 'max' => 15),
            array('amount', 'default', 'setOnEmpty' => true, 'value' => null),
            array('id, mt_anggaran_id, amount, mt_chart_master_account_code', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        return array(
            'pahAnggaran' => array(self::BELONGS_TO, 'MtAnggaran', 'mt_anggaran_id'),
            'pahChartMasterAccountCode' => array(self::BELONGS_TO, 'MtChartMaster', 'mt_chart_master_account_code'),
        );
    }

    public function pivotModels()
    {
        return array();
    }

    public function attributeLabels()
    {
        return array(
            'id' => Yii::t('app', 'ID'),
            'mt_anggaran_id' => Yii::t('app', 'Mt Anggaran'),
            'amount' => Yii::t('app', 'Amount'),
            'mt_chart_master_account_code' => Yii::t('app', 'Mt Chart Master Account Code'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('id', $this->id);
        $criteria->compare('mt_anggaran_id', $this->mt_anggaran_id);
        $criteria->compare('amount', $this->amount);
        $criteria->compare('mt_chart_master_account_code', $this->mt_chart_master_account_code);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}