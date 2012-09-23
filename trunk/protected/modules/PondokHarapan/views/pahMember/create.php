<?php
$this->breadcrumbs = array(
	'Pah Members' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' PahMember', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' PahMember', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahMember</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>