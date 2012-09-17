<?php
$this->breadcrumbs = array(
	'Tbl Users' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' TblUser', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' TblUser', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> TblUser</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>