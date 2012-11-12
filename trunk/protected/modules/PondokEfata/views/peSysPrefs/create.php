<?php
$this->breadcrumbs = array(
    'Pe Sys Prefs' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeSysPrefs', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeSysPrefs', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeSysPrefs</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>