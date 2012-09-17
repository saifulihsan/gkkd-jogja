<?php
$this->breadcrumbs = array(
	'Pah Anggaran Detils' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahAnggaranDetil', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahAnggaranDetil', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahAnggaranDetil', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahAnggaranDetil', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahAnggaranDetil #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>