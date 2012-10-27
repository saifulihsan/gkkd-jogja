<?php
$this->breadcrumbs = array(
	'Pah Aktivitas Grup Trans' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahAktivitasGrupTrans', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahAktivitasGrupTrans', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahAktivitasGrupTrans', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahAktivitasGrupTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahAktivitasGrupTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>