<?php
$this->breadcrumbs = array(
    'Pah Chart Types' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahChartTypes', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahChartTypes', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahChartTypes', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahChartTypes', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahChartTypes #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>