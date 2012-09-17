<?php
$this->breadcrumbs = array(
	'Sales' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' Sales', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' Sales', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> Sales</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>