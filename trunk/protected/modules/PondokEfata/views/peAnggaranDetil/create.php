<?php
$this->breadcrumbs = array(
    'Pe Anggaran Detils' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAnggaranDetil', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeAnggaranDetil', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeAnggaranDetil</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>