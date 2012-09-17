<?php
$this->breadcrumbs = array(
	'Chart Classes' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' ChartClass', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' ChartClass', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' ChartClass', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' ChartClass', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> ChartClass #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>