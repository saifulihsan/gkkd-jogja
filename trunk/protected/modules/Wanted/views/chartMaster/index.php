<?php
$this->breadcrumbs = array(
	'Chart Masters',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' ChartMaster', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' ChartMaster', 'url' => array('admin')),
);
?>

<h1>Chart Masters</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 