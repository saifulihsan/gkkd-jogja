<?php
$this->breadcrumbs = array(
    'Pe Chart Types' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeChartTypes', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeChartTypes', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeChartTypes</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>