<?php
$this->breadcrumbs = array(
	'Chart Classes',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' ChartClass', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' ChartClass', 'url' => array('admin')),
);
?>

<h1>Chart Classes</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 