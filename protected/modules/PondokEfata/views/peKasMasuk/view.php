<?php
$this->breadcrumbs = array(
    'Pe Kas Masuks' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeKasMasuk', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeKasMasuk', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeKasMasuk', 'url' => array('update', 'id' => $model->kas_masuk_id)),
    array('label' => Yii::t('app', 'Delete') . ' PeKasMasuk', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->kas_masuk_id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeKasMasuk', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeKasMasuk #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

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
            'label' => 'PeDonatur',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->peDonatur)), array('peDonatur/view', 'id' => GxActiveRecord::extractPkValue($model->peDonatur, true))),
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

