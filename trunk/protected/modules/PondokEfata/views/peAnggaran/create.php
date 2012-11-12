<?php
$this->breadcrumbs = array(
    'Pe Anggarans' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAnggaran', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeAnggaran', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeAnggaran</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>