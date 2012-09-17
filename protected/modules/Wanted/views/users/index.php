<?php
$this->breadcrumbs = array(
	'Users',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' Users', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' Users', 'url' => array('admin')),
);
?>

<h1>Users</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 