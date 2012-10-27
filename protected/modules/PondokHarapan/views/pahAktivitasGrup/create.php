<?php
$this->breadcrumbs = array(
	'Pah Aktivitas Grups' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' PahAktivitasGrup', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' PahAktivitasGrup', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahAktivitasGrup</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>