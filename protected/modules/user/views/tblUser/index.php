<?php
$this->breadcrumbs = array(
	'Tbl Users',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' TblUser', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' TblUser', 'url' => array('admin')),
);
?>

<h1>Tbl Users</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 