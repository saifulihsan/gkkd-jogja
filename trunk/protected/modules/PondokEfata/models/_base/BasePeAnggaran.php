<?php

/**
 * This is the model base class for the table "pe_anggaran".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PeAnggaran".
 *
 * Columns in table "pe_anggaran" available as properties of the model,
 * followed by relations of table "pe_anggaran" available as properties of the model.
 *
 * @property integer $id
 * @property string $doc_ref
 * @property integer $periode_bulan
 * @property integer $periode_tahun
 * @property string $trans_date
 * @property integer $users_id
 *
 * @property Users $users
 * @property PeAnggaranDetil[] $peAnggaranDetils
 */
abstract class BasePeAnggaran extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'pe_anggaran';
    }

    public static function representingColumn()
    {
        return 'doc_ref';
    }

    public function rules()
    {
        return array(
            array('users_id', 'required'),
            array('periode_bulan, periode_tahun, users_id', 'numerical', 'integerOnly' => true),
            array('doc_ref', 'length', 'max' => 15),
            array('trans_date', 'safe'),
            array('doc_ref, periode_bulan, periode_tahun, trans_date', 'default', 'setOnEmpty' => true, 'value' => null),
            array('id, doc_ref, periode_bulan, periode_tahun, trans_date, users_id', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        return array(
            'users' => array(self::BELONGS_TO, 'Users', 'users_id'),
            'peAnggaranDetils' => array(self::HAS_MANY, 'PeAnggaranDetil', 'anggaran_id'),
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
            'doc_ref' => Yii::t('app', 'Doc Ref'),
            'periode_bulan' => Yii::t('app', 'Periode Bulan'),
            'periode_tahun' => Yii::t('app', 'Periode Tahun'),
            'trans_date' => Yii::t('app', 'Trans Date'),
            'users_id' => Yii::t('app', 'Users'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('id', $this->id);
        $criteria->compare('doc_ref', $this->doc_ref, true);
        $criteria->compare('periode_bulan', $this->periode_bulan);
        $criteria->compare('periode_tahun', $this->periode_tahun);
        $criteria->compare('trans_date', $this->trans_date, true);
        $criteria->compare('users_id', $this->users_id);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}