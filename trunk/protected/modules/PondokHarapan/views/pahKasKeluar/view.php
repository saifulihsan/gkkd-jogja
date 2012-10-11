<?php
$this->breadcrumbs = array(
    'Pah Kas Keluars' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahKasKeluar', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahKasKeluar', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PahKasKeluar', 'url' => array('update', 'id' => $model->kas_keluar_id)),
    array('label' => Yii::t('app', 'Delete') . ' PahKasKeluar', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->kas_keluar_id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PahKasKeluar', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahKasKeluar #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'kas_keluar_id',
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

