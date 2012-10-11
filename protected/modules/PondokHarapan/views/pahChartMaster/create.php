<?php
$this->breadcrumbs = array(
    'Pah Chart Masters' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahChartMaster', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahChartMaster', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahChartMaster</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>