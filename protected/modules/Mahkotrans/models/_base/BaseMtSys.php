<?php

/**
 * This is the model base class for the table "mt_sys_prefs".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "MtSys".
 *
 * Columns in table "mt_sys_prefs" available as properties of the model,
 * and there are no model relations.
 *
 * @property string $name
 * @property string $value
 *
 */
abstract class BaseMtSys extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'mt_sys_prefs';
    }

    public static function representingColumn()
    {
        return 'name';
    }

    public function rules()
    {
        return array(
            array('name', 'length', 'max' => 35),
            array('value', 'safe'),
            array('name, value', 'default', 'setOnEmpty' => true, 'value' => null),
            array('name, value', 'safe', 'on' => 'search'),
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
            'name' => Yii::t('app', 'Name'),
            'value' => Yii::t('app', 'Value'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('name', $this->name, true);
        $criteria->compare('value', $this->value, true);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}