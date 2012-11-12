<?php
$this->breadcrumbs = array(
    'Pe Aktivitases' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeAktivitas', 'url' => array('update', 'id' => $model->aktivitas_id)),
    array('label' => Yii::t('app', 'Delete') . ' PeAktivitas', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->aktivitas_id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeAktivitas', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeAktivitas #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

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
            'label' => 'PeSuppliers',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peSupplier)), array('peSuppliers/view', 'id' => GxActiveRecord::extractPkValue($model->peSupplier, true))),
        ),
        array(
            'label' => 'PeBankAccounts',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peBankAccounts)), array('peBankAccounts/view', 'id' => GxActiveRecord::extractPkValue($model->peBankAccounts, true))),
        ),
        array(
            'label' => 'PeMember',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peMember)), array('peMember/view', 'id' => GxActiveRecord::extractPkValue($model->peMember, true))),
        ),
        array(
            'label' => 'PeSubAktivitas',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peSubAktivitas)), array('peSubAktivitas/view', 'id' => GxActiveRecord::extractPkValue($model->peSubAktivitas, true))),
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

