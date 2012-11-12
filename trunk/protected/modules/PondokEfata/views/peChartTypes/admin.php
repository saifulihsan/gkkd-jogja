<?php
$this->breadcrumbs = array(
    'Pe Chart Types' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeChartTypes',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeChartTypes',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pe-chart-types-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pe Chart Types</h1>

<p style="display:none">
    You may optionally enter a comparison operator (&lt;, &lt;=, &gt;, &gt;=, &lt;&gt; or =) at the beginning of each of
    your search values to specify how the comparison should be done.
</p>

<?php //echo GxHtml::link(Yii::t('app', 'Advanced Search'), '#', array('class' => 'search-button')); ?>
<div class="search-form" style="display:none">
    <?php $this->renderPartial('_search', array(
    'model' => $model,
)); ?>
</div><!-- search-form -->

<?php $this->widget('zii.widgets.grid.CGridView', array(
    'id' => 'pe-chart-types-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'id',
        'name',
        array(
            'name' => 'class_id',
            'value' => 'GxHtml::valueEx($data->class)',
            'filter' => GxHtml::listDataEx(PeChartClass::model()->findAllAttributes(null, true)),
        ),
        'parent',
        'inactive',
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>