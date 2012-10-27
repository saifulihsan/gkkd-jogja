<?php
$this->breadcrumbs = array(
	'Pah Aktivitas Grup Trans' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' PahAktivitasGrupTrans', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' PahAktivitasGrupTrans', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' PahAktivitasGrupTrans', 'url'=>array('update', 'id' => $model->aktivitas_id)),
	array('label'=>Yii::t('app', 'Delete') . ' PahAktivitasGrupTrans', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->aktivitas_id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' PahAktivitasGrupTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahAktivitasGrupTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'aktivitas_id',
'doc_ref',
'no_bukti',
'amount',
'entry_time',
'trans_date',
'trans_via',
array(
			'label' => 'PahSuppliers',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahSuppliersSupplier)), array('pahSuppliers/view', 'id' => GxActiveRecord::extractPkValue($model->pahSuppliersSupplier, true))),
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
array(
			'label' => 'PahAktivitasGrup',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahAktivitasGrup)), array('pahAktivitasGrup/view', 'id' => GxActiveRecord::extractPkValue($model->pahAktivitasGrup, true))),
			),
array(
			'label' => 'PahSubAktivitas',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahSubAktivitas)), array('pahSubAktivitas/view', 'id' => GxActiveRecord::extractPkValue($model->pahSubAktivitas, true))),
			),
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

