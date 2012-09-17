<?php
$this->breadcrumbs = array(
	'Bank Accounts',
	Yii::t('app', 'Index'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'Create') . ' BankAccounts', 'url' => array('create')),
	array('label'=>Yii::t('app', 'Manage') . ' BankAccounts', 'url' => array('admin')),
);
?>

<h1>Bank Accounts</h1>

<?php $this->widget('zii.widgets.CListView', array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); 