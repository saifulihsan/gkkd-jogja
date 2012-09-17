<?php
$this->breadcrumbs = array(
	'Chart Masters' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' ChartMaster', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' ChartMaster', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' ChartMaster', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' ChartMaster', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> ChartMaster #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>