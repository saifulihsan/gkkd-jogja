<?php
$this->breadcrumbs = array(
	'Pah Lampirans' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahLampiran', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahLampiran', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahLampiran', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahLampiran', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahLampiran #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>