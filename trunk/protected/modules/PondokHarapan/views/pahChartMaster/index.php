<?php
$this->breadcrumbs = array(
	'Pah Chart Masters',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahChartMaster', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahChartMaster', 'url' => array('admin')),
);
?>

<h1>Pah Chart Masters</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 