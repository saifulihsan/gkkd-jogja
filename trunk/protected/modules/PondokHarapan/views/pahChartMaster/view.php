<?php
$this->breadcrumbs = array(
    'Pah Chart Masters' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahChartMaster', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahChartMaster', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PahChartMaster', 'url' => array('update', 'id' => $model->account_code)),
    array('label' => Yii::t('app', 'Delete') . ' PahChartMaster', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->account_code), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PahChartMaster', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahChartMaster #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'account_code',
        'account_code2',
        'account_name',
        array(
            'label' => 'PahChartTypes',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountType)), array('pahChartTypes/view', 'id' => GxActiveRecord::extractPkValue($model->accountType, true))),
        ),
        'inactive',
        'description',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

<!--h2>Pah Bank Accounts</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahBankAccounts as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahBankAccounts/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pah Gl Trans</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahGlTrans as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahGlTrans/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pah Sub Aktivitases</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahSubAktivitases as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahSubAktivitas/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>