<?php
$this->breadcrumbs = array(
    'Pe Suppliers' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeSuppliers',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeSuppliers',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pe-suppliers-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pe Suppliers</h1>

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
    'id' => 'pe-suppliers-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'supplier_id',
        'supp_name',
        'supp_ref',
        'address',
        'mail_address',
        'gst_no',
        /*
        'contact',
        'supp_account_no',
        'website',
        'bank_account',
        'curr_code',
        'payment_terms',
        'credit_limit',
        'purchase_account',
        'payable_account',
        'payment_discount_account',
        'notes',
        'inactive',
        */
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>