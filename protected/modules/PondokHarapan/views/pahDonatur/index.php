<?php
$this->breadcrumbs = array(
	'Pah Donaturs',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahDonatur', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahDonatur', 'url' => array('admin')),
);
?>

<h1>Pah Donaturs</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 