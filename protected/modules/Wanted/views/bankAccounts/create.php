<?php
$this->breadcrumbs = array(
	'Bank Accounts' => array('index'),
	Yii::t('app', 'Create'),
);

$this->menu = array(
	array('label'=>Yii::t('app', 'List') . ' BankAccounts', 'url' => array('index')),
	array('label'=>Yii::t('app', 'Manage') . ' BankAccounts', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> BankAccounts</h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model,
		'buttons' => 'create'));
?>