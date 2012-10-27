<?php
$this->breadcrumbs = array(
	'Pah Lampirans',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahLampiran', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahLampiran', 'url' => array('admin')),
);
?>

<h1>Pah Lampirans</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 