<?php
$this->breadcrumbs = array(
	'Customers',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' Customers', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' Customers', 'url' => array('admin')),
);
?>

<h1>Customers</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 