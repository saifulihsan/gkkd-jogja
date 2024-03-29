<?php

/**
 * This is the model base class for the table "users".
 * DO NOT MODIFY THIS FILE! It is automatically generated by giix.
 * If any changes are necessary, you must set or override the required
 * property or method in class "Users".
 *
 * Columns in table "users" available as properties of the model,
 * followed by relations of table "users" available as properties of the model.
 *
 * @property integer $id
 * @property string $user_id
 * @property string $password
 * @property string $last_visit_date
 * @property integer $inactive
 * @property string $nij
 * @property integer $security_roles_id
 *
 * @property PahAktivitas[] $pahAktivitases
 * @property PahAnggaran[] $pahAnggarans
 * @property PahKasKeluar[] $pahKasKeluars
 * @property PahKasMasuk[] $pahKasMasuks
 * @property SecurityRoles $securityRoles
 * @property Jemaat $nij0
 */
abstract class BaseUsers extends GxActiveRecord
{
    public static function model($className = __CLASS__)
    {
        return parent::model($className);
    }

    public function tableName()
    {
        return 'users';
    }

    public static function representingColumn()
    {
        return 'user_id';
    }

    public function rules()
    {
        return array(
            array('nij, security_roles_id', 'required'),
            array('inactive, security_roles_id', 'numerical', 'integerOnly' => true),
            array('user_id', 'length', 'max' => 60),
            array('password', 'length', 'max' => 100),
            array('nij', 'length', 'max' => 20),
            array('last_visit_date', 'safe'),
            array('user_id, password, last_visit_date, inactive', 'default', 'setOnEmpty' => true, 'value' => null),
            array('id, user_id, password, last_visit_date, inactive, nij, security_roles_id', 'safe', 'on' => 'search'),
        );
    }

    public function relations()
    {
        return array(
            'pahAktivitases' => array(self::HAS_MANY, 'PahAktivitas', 'users_id'),
            'pahAnggarans' => array(self::HAS_MANY, 'PahAnggaran', 'users_id'),
            'pahKasKeluars' => array(self::HAS_MANY, 'PahKasKeluar', 'users_id'),
            'pahKasMasuks' => array(self::HAS_MANY, 'PahKasMasuk', 'users_id'),
            'securityRoles' => array(self::BELONGS_TO, 'SecurityRoles', 'security_roles_id'),
            'nij0' => array(self::BELONGS_TO, 'Jemaat', 'nij'),
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
            'user_id' => Yii::t('app', 'User'),
            'password' => Yii::t('app', 'Password'),
            'last_visit_date' => Yii::t('app', 'Last Visit Date'),
            'inactive' => Yii::t('app', 'Inactive'),
            'nij' => Yii::t('app', 'Nij'),
            'security_roles_id' => Yii::t('app', 'Security Roles'),
        );
    }

    public function search()
    {
        $criteria = new CDbCriteria;
        $criteria->compare('id', $this->id);
        $criteria->compare('user_id', $this->user_id, true);
        $criteria->compare('password', $this->password, true);
        $criteria->compare('last_visit_date', $this->last_visit_date, true);
        $criteria->compare('inactive', $this->inactive);
        $criteria->compare('nij', $this->nij);
        $criteria->compare('security_roles_id', $this->security_roles_id);
        return new CActiveDataProvider(get_class($this), array(
            'criteria' => $criteria,
        ));
    }
}