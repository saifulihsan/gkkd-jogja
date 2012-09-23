<?php
$this->breadcrumbs = array(
	'Pah Aktivitases',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahAktivitas', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahAktivitas', 'url' => array('admin')),
);
?>

<h1>Pah Aktivitases</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 