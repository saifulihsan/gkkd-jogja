<?php
$this->breadcrumbs = array(
	'Chart Types',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' ChartTypes', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' ChartTypes', 'url' => array('admin')),
);
?>

<h1>Chart Types</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 