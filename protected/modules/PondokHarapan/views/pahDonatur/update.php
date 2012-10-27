<?php
$this->breadcrumbs = array(
	'Pah Donaturs' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahDonatur', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahDonatur', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahDonatur', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahDonatur', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahDonatur #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>