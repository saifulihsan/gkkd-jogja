<?php
$this->breadcrumbs = array(
    'Pe Chart Types' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeChartTypes', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeChartTypes', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeChartTypes', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeChartTypes', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeChartTypes #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>