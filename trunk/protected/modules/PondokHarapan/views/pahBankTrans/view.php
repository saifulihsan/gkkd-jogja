<?php
$this->breadcrumbs = array(
    'Pah Bank Trans' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahBankTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahBankTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PahBankTrans', 'url' => array('update', 'id' => $model->id)),
    array('label' => Yii::t('app', 'Delete') . ' PahBankTrans', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PahBankTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahBankTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        'type',
        'trans_no',
        array(
            'label' => 'PahBankAccounts',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->bankAct)), array('pahBankAccounts/view', 'id' => GxActiveRecord::extractPkValue($model->bankAct, true))),
        ),
        'ref',
        'trans_date',
        'amount',
        'person_type_id',
        'person_id',
        'reconciled',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

