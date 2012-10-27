<?php
$this->breadcrumbs = array(
	'Pah Aktivitas Grup Trans' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' PahAktivitasGrupTrans', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' PahAktivitasGrupTrans', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahAktivitasGrupTrans</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>