<?php
$this->breadcrumbs = array(
	'Notas' => array('index'),
	Yii::t('app', 'Manage'),
);

$this->menu = array(
		array('label'=>Yii::t('app', 'List') . ' Nota',
			'url'=>array('index')),
		array('label'=>Yii::t('app', 'Create') . ' Nota',
		'url'=>array('create')),
	);

Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('nota-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Notas</h1>

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
	'id' => 'nota-grid',
	'dataProvider' => $model->search(),
        'itemsCssClass' => 'table',
	'filter' => $model,
	'columns' => array(
		'nota_id',
		array(
				'name'=>'sales_id',
				'value'=>'GxHtml::valueEx($data->sales)',
				'filter'=>GxHtml::listDataEx(Sales::model()->findAllAttributes(null, true)),
				),
		'term',
		'warehouse',
		'status',
		'currency',
		/*
		'notes',
		'rate',
		'doc_date',
		'doc_ref',
		array(
				'name'=>'customer_id',
				'value'=>'GxHtml::valueEx($data->customer)',
				'filter'=>GxHtml::listDataEx(Customers::model()->findAllAttributes(null, true)),
				),
		'trans_date',
		'total_1',
		'disc',
		'total_2',
		*/
		array(
			'class' => 'CButtonColumn',
		),
	),
)); ?>