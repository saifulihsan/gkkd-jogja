<?php
$this->breadcrumbs = array(
	'Pah Aktivitas Grup Trans',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahAktivitasGrupTrans', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahAktivitasGrupTrans', 'url' => array('admin')),
);
?>

<h1>Pah Aktivitas Grup Trans</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 