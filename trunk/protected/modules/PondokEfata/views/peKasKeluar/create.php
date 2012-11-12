<?php
$this->breadcrumbs = array(
    'Pe Kas Keluars' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeKasKeluar', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeKasKeluar', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeKasKeluar</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>