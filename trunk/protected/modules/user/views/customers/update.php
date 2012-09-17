<?php
$this->breadcrumbs = array(
	'Customers' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' Customers', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' Customers', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' Customers', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' Customers', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> Customers #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>