<?php
$this->breadcrumbs = array(
	'Customers' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' Customers', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' Customers', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> Customers</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>