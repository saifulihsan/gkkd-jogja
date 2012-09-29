<?php
$this->breadcrumbs = array(
	'Pah Gl Trans',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' PahGlTrans', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' PahGlTrans', 'url' => array('admin')),
);
?>

<h1>Pah Gl Trans</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 