<?php
$this->breadcrumbs = array(
    'Pe Anggarans' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAnggaran',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAnggaran',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pe-anggaran-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pe Anggarans</h1>

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
    'id' => 'pe-anggaran-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'id',
        'doc_ref',
        'periode_bulan',
        'periode_tahun',
        'trans_date',
        array(
            'name' => 'users_id',
            'value' => 'GxHtml::valueEx($data->users)',
            'filter' => GxHtml::listDataEx(Users::model()->findAllAttributes(null, true)),
        ),
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>