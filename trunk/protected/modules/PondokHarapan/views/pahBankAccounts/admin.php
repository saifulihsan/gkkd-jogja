<?php
$this->breadcrumbs = array(
    'Pah Bank Accounts' => array('index'),
    Yii::t('app', 'Manage'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahBankAccounts',
        'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahBankAccounts',
        'url' => array('create')),
);
Yii::app()->clientScript->registerScript('search', "
$('.search-button').click(function(){
	$('.search-form').toggle();
	return false;
});
$('.search-form form').submit(function(){
	$.fn.yiiGridView.update('pah-bank-accounts-grid', {
		data: $(this).serialize()
	});
	return false;
});
");
?>

<h1><?php echo Yii::t('app', 'Manage'); ?> Pah Bank Accounts</h1>

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
    'id' => 'pah-bank-accounts-grid',
    'dataProvider' => $model->search(),
    'itemsCssClass' => 'table',
    'filter' => $model,
    'columns' => array(
        'id',
        array(
            'name' => 'account_code',
            'value' => 'GxHtml::valueEx($data->accountCode)',
            'filter' => GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true)),
        ),
        'account_type',
        'bank_account_name',
        'bank_account_number',
        'bank_name',
        /*
        'bank_address',
        'bank_curr_code',
        array(
                    'name' => 'dflt_curr_act',
                    'value' => '($data->dflt_curr_act === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
                    'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
                    ),
        'ending_reconcile_balance',
        array(
                    'name' => 'inactive',
                    'value' => '($data->inactive === 0) ? Yii::t(\'app\', \'No\') : Yii::t(\'app\', \'Yes\')',
                    'filter' => array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')),
                    ),
        'bank_phone',
        'atas_nama',
        */
        array(
            'class' => 'CButtonColumn',
        ),
    ),
)); ?>