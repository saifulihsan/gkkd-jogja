<?php
$this->breadcrumbs = array(
	'Barangs' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' Barang', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' Barang', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' Barang', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' Barang', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> Barang #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>