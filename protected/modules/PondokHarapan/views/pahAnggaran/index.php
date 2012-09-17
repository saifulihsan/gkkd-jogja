<?php
$this->breadcrumbs = array(
	'Pah Anggarans',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahAnggaran', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahAnggaran', 'url' => array('admin')),
);
?>

<h1>Pah Anggarans</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 