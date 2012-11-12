<?php
$this->breadcrumbs = array(
    'Pe Bank Accounts' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeBankAccounts', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeBankAccounts', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeBankAccounts', 'url' => array('update', 'id' => $model->id)),
    array('label' => Yii::t('app', 'Delete') . ' PeBankAccounts', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeBankAccounts', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeBankAccounts #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        array(
            'label' => 'PeChartMaster',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountCode)), array('peChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->accountCode, true))),
        ),
        'account_type',
        'bank_account_name',
        'bank_account_number',
        'bank_name',
        'bank_address',
        'bank_curr_code',
        'dflt_curr_act',
        'ending_reconcile_balance',
        'inactive',
        'bank_phone',
        'atas_nama',
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
?><!--h2>Pe Bank Trans</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peBankTrans as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peBankTrans/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
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
?><!--h2>Pe Kas Masuks</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peKasMasuks as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peKasMasuk/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>