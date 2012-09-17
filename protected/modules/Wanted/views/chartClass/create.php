<?php
$this->breadcrumbs = array(
	'Chart Classes' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' ChartClass', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' ChartClass', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> ChartClass</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>