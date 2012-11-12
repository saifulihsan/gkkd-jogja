<?php
$this->breadcrumbs = array(
    'Pe Kas Keluars' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeKasKeluar', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeKasKeluar', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeKasKeluar', 'url' => array('update', 'id' => $model->kas_keluar_id)),
    array('label' => Yii::t('app', 'Delete') . ' PeKasKeluar', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->kas_keluar_id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeKasKeluar', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeKasKeluar #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

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
            'label' => 'PeSuppliers',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peSupplier)), array('peSuppliers/view', 'id' => GxActiveRecord::extractPkValue($model->peSupplier, true))),
        ),
        array(
            'label' => 'PeChartMaster',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peAccountCode)), array('peChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->peAccountCode, true))),
        ),
        array(
            'label' => 'PeBankAccounts',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peBankAccounts)), array('peBankAccounts/view', 'id' => GxActiveRecord::extractPkValue($model->peBankAccounts, true))),
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

