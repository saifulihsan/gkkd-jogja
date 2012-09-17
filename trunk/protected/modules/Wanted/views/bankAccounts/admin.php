<?php
$this->breadcrumbs = array(
	'Bank Accounts' => array('index'),
	Yii::t('app', 'Manage'),
);

$this->menu = array(
		array('label'=>Yii::t('app', 'List') . ' BankAccounts',
			'url'=>array('index')),
		array('label'=>Yii::t('app', 'Create') . ' BankAccounts',
		'url'=>array('create')),
	);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('bank-accounts-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Bank Accounts</h1>

<p style="display:none">
You may optionally enter a comparison operator (&lt;, &lt;=, &gt;, &gt;=, &lt;&gt; or =) at the beginning of each of your search values to specify how the comparison should be done.
</p>

<?php //echo GxHtml::link(Yii::t('app', 'Advanced Search'), '#', array('class' => 'search-button')); ?>
<div class="search-form" style="display:none">
<?php $this->renderPartial('_search', array(
	'model' => $model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
	'id' => 'bank-accounts-grid',
	'dataProvider' => $model->search(),
        'itemsCssClass' => 'table',
	'filter' => $model,
	'columns' => array(
		'id',
		array(
				'name'=>'account_code',
				'value'=>'GxHtml::valueEx($data->accountCode)',
				'filter'=>GxHtml::listDataEx(ChartMaster::model()->findAllAttributes(null, true)),
				),
		'account_type',
		'bank_account_name',
		'bank_account_number',
		'bank_name',
		/*
		'bank_address',
		'bank_curr_code',
		array(
					'name' => 'dflt_curr_act',
					'value' => '($data->dflt_curr_act === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
					'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
					),
		'last_reconciled_date',
		'ending_reconcile_balance',
		array(
					'name' => 'inactive',
					'value' => '($data->inactive === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
					'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
					),
		*/
		array(
			'class' => 'CButtonColumn',
		),
	),
)); ?>