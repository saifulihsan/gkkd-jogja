<?php
$this->breadcrumbs = array(
    'Pe Kas Masuks' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeKasMasuk',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeKasMasuk',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pe-kas-masuk-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pe Kas Masuks</h1>

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
    'id' => 'pe-kas-masuk-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'kas_masuk_id',
        'doc_ref',
        'no_bukti',
        'amount',
        'entry_time',
        'trans_date',
        /*
        'trans_via',
        array(
                'name'=>'pe_donatur_id',
                'value'=>'GxHtml::valueEx($data->peDonatur)',
                'filter'=>GxHtml::listDataEx(PeDonatur::model()->findAllAttributes(null, true)),
                ),
        array(
                'name'=>'pe_bank_accounts_id',
                'value'=>'GxHtml::valueEx($data->peBankAccounts)',
                'filter'=>GxHtml::listDataEx(PeBankAccounts::model()->findAllAttributes(null, true)),
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