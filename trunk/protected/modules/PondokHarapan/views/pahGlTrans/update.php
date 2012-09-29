<?php
$this->breadcrumbs = array(
	'Pah Gl Trans' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahGlTrans', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahGlTrans', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahGlTrans', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahGlTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahGlTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>