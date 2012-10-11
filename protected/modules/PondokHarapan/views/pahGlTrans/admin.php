<?php
$this->breadcrumbs = array(
    'Pah Gl Trans' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahGlTrans',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahGlTrans',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pah-gl-trans-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pah Gl Trans</h1>

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
    'id' => 'pah-gl-trans-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'counter',
        'type',
        'type_no',
        'tran_date',
        array(
            'name' => 'account',
            'value' => 'GxHtml::valueEx($data->account0)',
            'filter' => GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true)),
        ),
        'memo_',
        /*
        'amount',
        'person_type_id',
        'person_id',
        */
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>