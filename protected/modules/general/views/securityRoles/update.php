<?php
$this->breadcrumbs = array(
    'Security Roles' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' SecurityRoles', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' SecurityRoles', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' SecurityRoles', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' SecurityRoles', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> SecurityRoles #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>