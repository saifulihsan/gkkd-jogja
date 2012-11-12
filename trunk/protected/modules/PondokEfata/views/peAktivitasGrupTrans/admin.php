<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grup Trans' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitasGrupTrans',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAktivitasGrupTrans',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pe-aktivitas-grup-trans-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pe Aktivitas Grup Trans</h1>

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
    'id' => 'pe-aktivitas-grup-trans-grid',
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
                'name'=>'users_id',
                'value'=>'GxHtml::valueEx($data->users)',
                'filter'=>GxHtml::listDataEx(Users::model()->findAllAttributes(null, true)),
                ),
        array(
                'name'=>'pe_aktivitas_grup_id',
                'value'=>'GxHtml::valueEx($data->peAktivitasGrup)',
                'filter'=>GxHtml::listDataEx(PeAktivitasGrup::model()->findAllAttributes(null, true)),
                ),
        array(
                'name'=>'pe_sub_aktivitas_id',
                'value'=>'GxHtml::valueEx($data->peSubAktivitas)',
                'filter'=>GxHtml::listDataEx(PeSubAktivitas::model()->findAllAttributes(null, true)),
                ),
        */
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>