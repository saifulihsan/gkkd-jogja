<?php
$this->breadcrumbs = array(
	'Nota Dtls' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' NotaDtl', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' NotaDtl', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' NotaDtl', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' NotaDtl', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> NotaDtl #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>