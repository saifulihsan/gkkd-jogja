<?php
$this->breadcrumbs = array(
	'Chart Masters' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' ChartMaster', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' ChartMaster', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> ChartMaster</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>