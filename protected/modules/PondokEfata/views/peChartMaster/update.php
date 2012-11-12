<?php
$this->breadcrumbs = array(
    'Pe Chart Masters' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeChartMaster', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeChartMaster', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeChartMaster', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeChartMaster', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeChartMaster #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>