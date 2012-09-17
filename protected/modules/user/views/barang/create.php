<?php
$this->breadcrumbs = array(
	'Barangs' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' Barang', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' Barang', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> Barang</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>