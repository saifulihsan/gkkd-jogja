<?php
$this->breadcrumbs = array(
	'Pah Chart Masters' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahChartMaster', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahChartMaster', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahChartMaster', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahChartMaster', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahChartMaster #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>