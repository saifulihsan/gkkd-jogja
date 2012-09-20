<?php
$this->breadcrumbs = array(
	'Pah Suppliers',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahSuppliers', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahSuppliers', 'url' => array('admin')),
);
?>

<h1>Pah Suppliers</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 