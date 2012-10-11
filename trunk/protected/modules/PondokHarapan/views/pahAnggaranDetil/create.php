<?php
$this->breadcrumbs = array(
    'Pah Anggaran Detils' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahAnggaranDetil', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahAnggaranDetil', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahAnggaranDetil</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>