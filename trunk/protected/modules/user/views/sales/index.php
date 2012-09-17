<?php
$this->breadcrumbs = array(
	'Sales',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' Sales', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' Sales', 'url' => array('admin')),
);
?>

<h1>Sales</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 