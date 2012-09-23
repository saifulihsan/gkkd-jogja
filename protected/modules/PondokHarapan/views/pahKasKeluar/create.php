<?php
$this->breadcrumbs = array(
	'Pah Kas Keluars' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' PahKasKeluar', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' PahKasKeluar', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahKasKeluar</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>