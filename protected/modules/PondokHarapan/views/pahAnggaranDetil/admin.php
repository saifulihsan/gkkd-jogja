<?php
$this->breadcrumbs = array(
    'Pah Anggaran Detils' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahAnggaranDetil',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahAnggaranDetil',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pah-anggaran-detil-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pah Anggaran Detils</h1>

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
    'id' => 'pah-anggaran-detil-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'id',
        array(
            'name' => 'pah_anggaran_id',
            'value' => 'GxHtml::valueEx($data->pahAnggaran)',
            'filter' => GxHtml::listDataEx(PahAnggaran::model()->findAllAttributes(null, true)),
        ),
        'amount',
        array(
            'name' => 'pah_chart_master_account_code',
            'value' => 'GxHtml::valueEx($data->pahChartMasterAccountCode)',
            'filter' => GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true)),
        ),
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>