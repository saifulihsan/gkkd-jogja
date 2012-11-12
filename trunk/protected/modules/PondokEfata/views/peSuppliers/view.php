<?php
$this->breadcrumbs = array(
    'Pe Suppliers' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeSuppliers', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeSuppliers', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeSuppliers', 'url' => array('update', 'id' => $model->supplier_id)),
    array('label' => Yii::t('app', 'Delete') . ' PeSuppliers', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->supplier_id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeSuppliers', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeSuppliers #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

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

<!--h2>Pe Aktivitases</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peAktivitases as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peAktivitas/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pe Aktivitas Grup Trans</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peAktivitasGrupTrans as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peAktivitasGrupTrans/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pe Kas Keluars</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peKasKeluars as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peKasKeluar/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>