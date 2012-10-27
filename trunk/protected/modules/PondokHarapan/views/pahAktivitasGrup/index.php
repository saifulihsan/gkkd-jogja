<?php
$this->breadcrumbs = array(
	'Pah Aktivitas Grups',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahAktivitasGrup', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahAktivitasGrup', 'url' => array('admin')),
);
?>

<h1>Pah Aktivitas Grups</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 