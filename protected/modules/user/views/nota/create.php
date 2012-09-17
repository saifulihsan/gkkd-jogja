<?php
$this->breadcrumbs = array(
	'Notas' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' Nota', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' Nota', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> Nota</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>