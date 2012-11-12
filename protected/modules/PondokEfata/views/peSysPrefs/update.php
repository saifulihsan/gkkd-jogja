<?php
$this->breadcrumbs = array(
    'Pe Sys Prefs' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeSysPrefs', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeSysPrefs', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeSysPrefs', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeSysPrefs', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeSysPrefs #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>