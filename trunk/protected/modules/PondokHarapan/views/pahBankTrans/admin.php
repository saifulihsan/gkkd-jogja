<?php
$this->breadcrumbs = array(
    'Pah Bank Trans' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahBankTrans',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahBankTrans',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pah-bank-trans-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pah Bank Trans</h1>

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
    'id' => 'pah-bank-trans-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'id',
        'type',
        'trans_no',
        array(
            'name' => 'bank_act',
            'value' => 'GxHtml::valueEx($data->bankAct)',
            'filter' => GxHtml::listDataEx(PahBankAccounts::model()->findAllAttributes(null, true)),
        ),
        'ref',
        'trans_date',
        /*
        'amount',
        'person_type_id',
        'person_id',
        'reconciled',
        */
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>