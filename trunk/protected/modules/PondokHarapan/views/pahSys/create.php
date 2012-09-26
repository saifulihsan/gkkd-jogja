<?php
$this->breadcrumbs = array(
	'Pah Sys' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' PahSys', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' PahSys', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahSys</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>