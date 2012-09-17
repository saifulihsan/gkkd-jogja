<?php
$this->breadcrumbs = array(
	'Tbl Users' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' TblUser', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' TblUser', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' TblUser', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' TblUser', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> TblUser #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>