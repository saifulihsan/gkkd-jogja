<?php
$this->breadcrumbs = array(
    'Pah Anggarans' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahAnggaran', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahAnggaran', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahAnggaran</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>