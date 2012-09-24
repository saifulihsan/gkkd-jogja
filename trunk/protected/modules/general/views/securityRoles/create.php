<?php
$this->breadcrumbs = array(
	'Security Roles' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' SecurityRoles', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' SecurityRoles', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> SecurityRoles</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>