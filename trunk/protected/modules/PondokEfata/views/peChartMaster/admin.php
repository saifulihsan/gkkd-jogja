<?php
$this->breadcrumbs = array(
    'Pe Chart Masters' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeChartMaster',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeChartMaster',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pe-chart-master-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pe Chart Masters</h1>

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
    'id' => 'pe-chart-master-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'account_code',
        'account_code2',
        'account_name',
        array(
            'name' => 'account_type',
            'value' => 'GxHtml::valueEx($data->accountType)',
            'filter' => GxHtml::listDataEx(PeChartTypes::model()->findAllAttributes(null, true)),
        ),
        'inactive',
        'description',
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>