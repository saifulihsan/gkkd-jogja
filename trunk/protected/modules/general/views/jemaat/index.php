<?php
$this->breadcrumbs = array(
	'Jemaats',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' Jemaat', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' Jemaat', 'url' => array('admin')),
);
?>

<h1>Jemaats</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 