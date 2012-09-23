<?php
$this->breadcrumbs = array(
	'Pah Kas Keluars' => array('index'),
	Yii::t('app', 'Manage'),
);

$this->menu = array(
		array('label'=>Yii::t('app', 'List') . ' PahKasKeluar',
			'url'=>array('index')),
		array('label'=>Yii::t('app', 'Create') . ' PahKasKeluar',
		'url'=>array('create')),
	);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pah-kas-keluar-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pah Kas Keluars</h1>

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
	'id' => 'pah-kas-keluar-grid',
	'dataProvider' => $model->search(),
        'itemsCssClass' => 'table',
	'filter' => $model,
	'columns' => array(
		'kas_keluar_id',
		'doc_ref',
		'no_bukti',
		'amount',
		'entry_time',
		'trans_date',
		/*
		'trans_via',
		array(
				'name'=>'pah_suppliers_supplier_id',
				'value'=>'GxHtml::valueEx($data->pahSuppliersSupplier)',
				'filter'=>GxHtml::listDataEx(PahSuppliers::model()->findAllAttributes(null, true)),
				),
		array(
				'name'=>'pah_chart_master_account_code',
				'value'=>'GxHtml::valueEx($data->pahChartMasterAccountCode)',
				'filter'=>GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true)),
				),
		array(
				'name'=>'pah_bank_accounts_id',
				'value'=>'GxHtml::valueEx($data->pahBankAccounts)',
				'filter'=>GxHtml::listDataEx(PahBankAccounts::model()->findAllAttributes(null, true)),
				),
		array(
				'name'=>'users_id',
				'value'=>'GxHtml::valueEx($data->users)',
				'filter'=>GxHtml::listDataEx(Users::model()->findAllAttributes(null, true)),
				),
		*/
		array(
			'class' => 'CButtonColumn',
		),
	),
)); ?>