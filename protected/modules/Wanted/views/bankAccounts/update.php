<?php
$this->breadcrumbs = array(
	'Bank Accounts' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' BankAccounts', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' BankAccounts', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' BankAccounts', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' BankAccounts', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> BankAccounts #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>