<?php
$this->breadcrumbs = array(
    'Pah Chart Types' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahChartTypes', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahChartTypes', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahChartTypes</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>