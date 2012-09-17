<?php
$this->breadcrumbs = array(
	'Pah Bank Accounts' => array('index'),
	GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
	Yii::t('app', 'Update'),
);

$this->menu = array(
	array('label' => Yii::t('app', 'List') . ' PahBankAccounts', 'url'=>array('index')),
	array('label' => Yii::t('app', 'Create') . ' PahBankAccounts', 'url'=>array('create')),
	array('label' => Yii::t('app', 'View') . ' PahBankAccounts', 'url'=>array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
	//array('label' => Yii::t('app', 'Manage') . ' PahBankAccounts', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahBankAccounts #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
		'model' => $model));
?>