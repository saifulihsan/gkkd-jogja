<?php
$this->breadcrumbs = array(
    'Pah Suppliers' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahSuppliers', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahSuppliers', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PahSuppliers', 'url' => array('update', 'id' => $model->supplier_id)),
    array('label' => Yii::t('app', 'Delete') . ' PahSuppliers', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->supplier_id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PahSuppliers', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahSuppliers #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'supplier_id',
        'supp_name',
        'supp_ref',
        'address',
        'mail_address',
        'gst_no',
        'contact',
        'supp_account_no',
        'website',
        'bank_account',
        'curr_code',
        'payment_terms',
        'credit_limit',
        'purchase_account',
        'payable_account',
        'payment_discount_account',
        'notes',
        'inactive',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

