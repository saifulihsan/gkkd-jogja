<?php
$this->breadcrumbs = array(
	'Pah Anggaran Detils',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahAnggaranDetil', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahAnggaranDetil', 'url' => array('admin')),
);
?>

<h1>Pah Anggaran Detils</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 