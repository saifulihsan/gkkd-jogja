<?php
$this->breadcrumbs = array(
    'Pe Chart Masters' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeChartMaster', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeChartMaster', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeChartMaster', 'url' => array('update', 'id' => $model->account_code)),
    array('label' => Yii::t('app', 'Delete') . ' PeChartMaster', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->account_code), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeChartMaster', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeChartMaster #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'account_code',
        'account_code2',
        'account_name',
        array(
            'label' => 'PeChartTypes',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountType)), array('peChartTypes/view', 'id' => GxActiveRecord::extractPkValue($model->accountType, true))),
        ),
        'inactive',
        'description',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

<!--h2>Pe Anggaran Detils</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peAnggaranDetils as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peAnggaranDetil/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pe Bank Accounts</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peBankAccounts as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peBankAccounts/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pe Donaturs</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peDonaturs as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peDonatur/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pe Gl Trans</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peGlTrans as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peGlTrans/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
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
?><!--h2>Pe Sub Aktivitases</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peSubAktivitases as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peSubAktivitas/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>