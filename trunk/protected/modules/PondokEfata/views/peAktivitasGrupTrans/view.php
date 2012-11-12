<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grup Trans' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitasGrupTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAktivitasGrupTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeAktivitasGrupTrans', 'url' => array('update', 'id' => $model->aktivitas_id)),
    array('label' => Yii::t('app', 'Delete') . ' PeAktivitasGrupTrans', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->aktivitas_id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeAktivitasGrupTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeAktivitasGrupTrans
    #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

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
            'label' => 'Users',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->users)), array('users/view', 'id' => GxActiveRecord::extractPkValue($model->users, true))),
        ),
        array(
            'label' => 'PeAktivitasGrup',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peAktivitasGrup)), array('peAktivitasGrup/view', 'id' => GxActiveRecord::extractPkValue($model->peAktivitasGrup, true))),
        ),
        array(
            'label' => 'PeSubAktivitas',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peSubAktivitas)), array('peSubAktivitas/view', 'id' => GxActiveRecord::extractPkValue($model->peSubAktivitas, true))),
        ),
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

