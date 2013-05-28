<?php

/**
 * This is the model base class for the table "pe_lampiran".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PeLampiran".
 *
 * Columns in table "pe_lampiran" available as properties of the model,
 * and there are no model relations.
 *
 * @property integer $id_lampiran
 * @property string $nama
 * @property string $trans_date
 * @property string $keterangan
 * @property string $satuan
 * @property double $qty
 * @property string $entry_time
 *
 */
abstract class BasePeLampiran extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'pe_lampiran';
    }

    public static function representingColumn()
    {
        return 'nama';
    }

    public function rules()
    {
        return array(
            array('qty', 'numerical'),
            array('nama', 'length', 'max' => 100),
            array('satuan', 'length', 'max' => 45),
            array('trans_date, keterangan, entry_time', 'safe'),
            array('nama, trans_date, keterangan, satuan, qty, entry_time', 'default', 'setOnEmpty' => true, 'value' => null),
            array('id_lampiran, nama, trans_date, keterangan, satuan, qty, entry_time', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        return array();
    }

    public function pivotModels()
    {
        return array();
    }

    public function attributeLabels()
    {
        return array(
            'id_lampiran' => Yii::t('app', 'Id Lampiran'),
            'nama' => Yii::t('app', 'Nama'),
            'trans_date' => Yii::t('app', 'Trans Date'),
            'keterangan' => Yii::t('app', 'Keterangan'),
            'satuan' => Yii::t('app', 'Satuan'),
            'qty' => Yii::t('app', 'Qty'),
            'entry_time' => Yii::t('app', 'Entry Time'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('id_lampiran', $this->id_lampiran);
        $criteria->compare('nama', $this->nama, true);
        $criteria->compare('trans_date', $this->trans_date, true);
        $criteria->compare('keterangan', $this->keterangan, true);
        $criteria->compare('satuan', $this->satuan, true);
        $criteria->compare('qty', $this->qty);
        $criteria->compare('entry_time', $this->entry_time, true);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}