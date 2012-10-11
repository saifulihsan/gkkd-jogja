<?php
$this->breadcrumbs = array(
    'Pah Bank Accounts' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahBankAccounts', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahBankAccounts', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PahBankAccounts', 'url' => array('update', 'id' => $model->id)),
    array('label' => Yii::t('app', 'Delete') . ' PahBankAccounts', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PahBankAccounts', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahBankAccounts #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        array(
            'label' => 'PahChartMaster',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountCode)), array('pahChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->accountCode, true))),
        ),
        'account_type',
        'bank_account_name',
        'bank_account_number',
        'bank_name',
        'bank_address',
        'bank_curr_code',
        'dflt_curr_act',
        'ending_reconcile_balance',
        'inactive',
        'bank_phone',
        'atas_nama',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

<!--h2>Pah Bank Trans</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahBankTrans as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahBankTrans/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>