<?php
$this->breadcrumbs = array(
    'Pe Aktivitases' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitas',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAktivitas',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pe-aktivitas-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pe Aktivitases</h1>

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
    'id' => 'pe-aktivitas-grid',
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
                'name'=>'pe_supplier_id',
                'value'=>'GxHtml::valueEx($data->peSupplier)',
                'filter'=>GxHtml::listDataEx(PeSuppliers::model()->findAllAttributes(null, true)),
                ),
        array(
                'name'=>'pe_bank_accounts_id',
                'value'=>'GxHtml::valueEx($data->peBankAccounts)',
                'filter'=>GxHtml::listDataEx(PeBankAccounts::model()->findAllAttributes(null, true)),
                ),
        array(
                'name'=>'pe_member_id',
                'value'=>'GxHtml::valueEx($data->peMember)',
                'filter'=>GxHtml::listDataEx(PeMember::model()->findAllAttributes(null, true)),
                ),
        array(
                'name'=>'pe_sub_aktivitas_id',
                'value'=>'GxHtml::valueEx($data->peSubAktivitas)',
                'filter'=>GxHtml::listDataEx(PeSubAktivitas::model()->findAllAttributes(null, true)),
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