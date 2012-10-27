<?php
$this->breadcrumbs = array(
	'Pah Lampirans' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' PahLampiran', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' PahLampiran', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahLampiran</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>