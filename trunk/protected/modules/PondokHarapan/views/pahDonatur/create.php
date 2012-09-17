<?php
$this->breadcrumbs = array(
	'Pah Donaturs' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' PahDonatur', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' PahDonatur', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahDonatur</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>