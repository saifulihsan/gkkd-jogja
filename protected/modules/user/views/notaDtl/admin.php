<?php
$this->breadcrumbs = array(
	'Nota Dtls' => array('index'),
	Yii::t('app', 'Manage'),
);

$this->menu = array(
		array('label'=>Yii::t('app', 'List') . ' NotaDtl',
			'url'=>array('index')),
		array('label'=>Yii::t('app', 'Create') . ' NotaDtl',
		'url'=>array('create')),
	);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('nota-dtl-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Nota Dtls</h1>

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
	'id' => 'nota-dtl-grid',
	'dataProvider' => $model->search(),
        'itemsCssClass' => 'table',
	'filter' => $model,
	'columns' => array(
		'nota_dtl_id',
		array(
				'name'=>'nota_id',
				'value'=>'GxHtml::valueEx($data->nota)',
				'filter'=>GxHtml::listDataEx(Nota::model()->findAllAttributes(null, true)),
				),
		array(
				'name'=>'barang_id',
				'value'=>'GxHtml::valueEx($data->barang)',
				'filter'=>GxHtml::listDataEx(Barang::model()->findAllAttributes(null, true)),
				),
		'jml',
		'harga_satuan',
		'total_harga_1',
		/*
		'disc_per',
		'disc_rp',
		'total_harga_2',
		*/
		array(
			'class' => 'CButtonColumn',
		),
	),
)); ?>