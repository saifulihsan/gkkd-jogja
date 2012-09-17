<?php
$this->breadcrumbs = array(
	'Bank Accounts' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' BankAccounts', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' BankAccounts', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' BankAccounts', 'url'=>array('update', 'id' => $model->id)),
	array('label'=>Yii::t('app', 'Delete') . ' BankAccounts', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' BankAccounts', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> BankAccounts #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'id',
array(
			'label' => 'ChartMaster',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountCode)), array('chartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->accountCode, true))),
			),
'account_type',
'bank_account_name',
'bank_account_number',
'bank_name',
'bank_address',
'bank_curr_code',
'dflt_curr_act',
'last_reconciled_date',
'ending_reconcile_balance',
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

