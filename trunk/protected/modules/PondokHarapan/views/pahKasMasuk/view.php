<?php
$this->breadcrumbs = array(
	'Pah Kas Masuks' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' PahKasMasuk', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' PahKasMasuk', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' PahKasMasuk', 'url'=>array('update', 'id' => $model->kas_masuk_id)),
	array('label'=>Yii::t('app', 'Delete') . ' PahKasMasuk', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->kas_masuk_id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' PahKasMasuk', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahKasMasuk #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'kas_masuk_id',
'doc_ref',
'no_bukti',
'amount',
'entry_time',
'trans_date',
'trans_via',
array(
			'label' => 'PahDonatur',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahDonatur)), array('pahDonatur/view', 'id' => GxActiveRecord::extractPkValue($model->pahDonatur, true))),
			),
array(
			'label' => 'PahChartMaster',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahChartMasterAccountCode)), array('pahChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->pahChartMasterAccountCode, true))),
			),
array(
			'label' => 'PahBankAccounts',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahBankAccounts)), array('pahBankAccounts/view', 'id' => GxActiveRecord::extractPkValue($model->pahBankAccounts, true))),
			),
array(
			'label' => 'Users',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->users)), array('users/view', 'id' => GxActiveRecord::extractPkValue($model->users, true))),
			),
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

