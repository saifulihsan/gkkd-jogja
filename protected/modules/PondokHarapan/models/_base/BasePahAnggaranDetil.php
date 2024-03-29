<?php

/**
 * This is the model base class for the table "pah_anggaran_detil".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PahAnggaranDetil".
 *
 * Columns in table "pah_anggaran_detil" available as properties of the model,
 * followed by relations of table "pah_anggaran_detil" available as properties of the model.
 *
 * @property integer $id
 * @property integer $pah_anggaran_id
 * @property double $amount
 * @property string $pah_chart_master_account_code
 *
 * @property PahAnggaran $pahAnggaran
 * @property PahChartMaster $pahChartMasterAccountCode
 */
abstract class BasePahAnggaranDetil extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'pah_anggaran_detil';
    }

    public static function representingColumn()
    {
        return 'pah_chart_master_account_code';
    }

    public function rules()
    {
        return array(
            array('pah_anggaran_id, pah_chart_master_account_code', 'required'),
            array('pah_anggaran_id', 'numerical', 'integerOnly' => true),
            array('amount', 'numerical'),
            array('pah_chart_master_account_code', 'length', 'max' => 15),
            array('amount', 'default', 'setOnEmpty' => true, 'value' => null),
            array('id, pah_anggaran_id, amount, pah_chart_master_account_code', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        return array(
            'pahAnggaran' => array(self::BELONGS_TO, 'PahAnggaran', 'pah_anggaran_id'),
            'pahChartMasterAccountCode' => array(self::BELONGS_TO, 'PahChartMaster', 'pah_chart_master_account_code'),
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
            'pah_anggaran_id' => Yii::t('app', 'Pah Anggaran'),
            'amount' => Yii::t('app', 'Amount'),
            'pah_chart_master_account_code' => Yii::t('app', 'Pah Chart Master Account Code'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('id', $this->id);
        $criteria->compare('pah_anggaran_id', $this->pah_anggaran_id);
        $criteria->compare('amount', $this->amount);
        $criteria->compare('pah_chart_master_account_code', $this->pah_chart_master_account_code);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}