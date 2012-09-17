<?php
$this->breadcrumbs = array(
	'Users' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' Users', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' Users', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> Users</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>