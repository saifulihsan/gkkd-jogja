<?php
$this->breadcrumbs = array(
	'Nota Dtls',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' NotaDtl', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' NotaDtl', 'url' => array('admin')),
);
?>

<h1>Nota Dtls</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 