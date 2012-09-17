<?php
$this->breadcrumbs = array(
	'Barangs',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' Barang', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' Barang', 'url' => array('admin')),
);
?>

<h1>Barangs</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 