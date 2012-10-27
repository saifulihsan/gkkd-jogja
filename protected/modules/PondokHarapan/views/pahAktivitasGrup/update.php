<?php
$this->breadcrumbs = array(
	'Pah Aktivitas Grups' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahAktivitasGrup', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahAktivitasGrup', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahAktivitasGrup', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahAktivitasGrup', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahAktivitasGrup #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>