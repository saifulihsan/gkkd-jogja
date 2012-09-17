<?php
$this->breadcrumbs = array(
	'Nota Dtls' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' NotaDtl', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' NotaDtl', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> NotaDtl</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>