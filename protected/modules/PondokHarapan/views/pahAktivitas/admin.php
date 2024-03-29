<?php
$this->breadcrumbs = array(
	'Pah Aktivitases' => array('index'),
	Yii::t('app', 'Manage'),
);

$this->menu = array(
		array('label'=>Yii::t('app', 'List') . ' PahAktivitas',
			'url'=>array('index')),
		array('label'=>Yii::t('app', 'Create') . ' PahAktivitas',
		'url'=>array('create')),
	);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pah-aktivitas-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pah Aktivitases</h1>

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
	'id' => 'pah-aktivitas-grid',
	'dataProvider' => $model->search(),
        'itemsCssClass' => 'table',
	'filter' => $model,
	'columns' => array(
		'aktivitas_id',
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
				'name'=>'pah_bank_accounts_id',
				'value'=>'GxHtml::valueEx($data->pahBankAccounts)',
				'filter'=>GxHtml::listDataEx(PahBankAccounts::model()->findAllAttributes(null, true)),
				),
		array(
				'name'=>'pah_member_id',
				'value'=>'GxHtml::valueEx($data->pahMember)',
				'filter'=>GxHtml::listDataEx(PahMember::model()->findAllAttributes(null, true)),
				),
		array(
				'name'=>'pah_sub_aktivitas_id',
				'value'=>'GxHtml::valueEx($data->pahSubAktivitas)',
				'filter'=>GxHtml::listDataEx(PahSubAktivitas::model()->findAllAttributes(null, true)),
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