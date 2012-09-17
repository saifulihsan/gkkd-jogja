<?php
$this->breadcrumbs = array(
	'Sales' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' Sales', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' Sales', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' Sales', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' Sales', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> Sales #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>