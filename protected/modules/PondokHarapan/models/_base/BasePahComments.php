<?php

/**
 * This is the model base class for the table "pah_comments".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "PahComments".
 *
 * Columns in table "pah_comments" available as properties of the model,
 * and there are no model relations.
 *
 * @property integer $id
 * @property integer $type
 * @property integer $type_no
 * @property string $date_
 * @property string $memo_
 *
 */
abstract class BasePahComments extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'pah_comments';
    }

    public static function representingColumn()
    {
        return 'date_';
    }

    public function rules()
    {
        return array(
            array('type, type_no', 'numerical', 'integerOnly' => true),
            array('date_, memo_', 'safe'),
            array('type, type_no, date_, memo_', 'default', 'setOnEmpty' => true, 'value' => null),
            array('id, type, type_no, date_, memo_', 'safe', 'on' => 'search'),
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
            'id' => Yii::t('app', 'ID'),
            'type' => Yii::t('app', 'Type'),
            'type_no' => Yii::t('app', 'Type No'),
            'date_' => Yii::t('app', 'Date'),
            'memo_' => Yii::t('app', 'Memo'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('id', $this->id);
        $criteria->compare('type', $this->type);
        $criteria->compare('type_no', $this->type_no);
        $criteria->compare('date_', $this->date_, true);
        $criteria->compare('memo_', $this->memo_, true);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}