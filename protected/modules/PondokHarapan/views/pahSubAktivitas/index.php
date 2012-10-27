<?php
$this->breadcrumbs = array(
	'Pah Sub Aktivitases',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahSubAktivitas', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahSubAktivitas', 'url' => array('admin')),
);
?>

<h1>Pah Sub Aktivitases</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 