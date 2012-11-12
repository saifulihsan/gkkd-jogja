<?php
$this->breadcrumbs = array(
    'Pe Chart Masters' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeChartMaster', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeChartMaster', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeChartMaster</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>