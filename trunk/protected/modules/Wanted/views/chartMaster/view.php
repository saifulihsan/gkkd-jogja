<?php
$this->breadcrumbs = array(
	'Chart Masters' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' ChartMaster', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' ChartMaster', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' ChartMaster', 'url'=>array('update', 'id' => $model->account_code)),
	array('label'=>Yii::t('app', 'Delete') . ' ChartMaster', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->account_code), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' ChartMaster', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> ChartMaster #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'account_code',
'account_code2',
'account_name',
array(
			'label' => 'ChartTypes',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountType)), array('chartTypes/view', 'id' => GxActiveRecord::extractPkValue($model->accountType, true))),
			),
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

