<?php
$this->breadcrumbs = array(
	'Notas',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' Nota', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' Nota', 'url' => array('admin')),
);
?>

<h1>Notas</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 