<?php
$this->breadcrumbs = array(
	'Chart Types' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' ChartTypes', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' ChartTypes', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> ChartTypes</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>