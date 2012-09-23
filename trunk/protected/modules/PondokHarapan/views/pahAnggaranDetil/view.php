<?php
$this->breadcrumbs = array(
	'Pah Anggaran Detils' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' PahAnggaranDetil', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' PahAnggaranDetil', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' PahAnggaranDetil', 'url'=>array('update', 'id' => $model->id)),
	array('label'=>Yii::t('app', 'Delete') . ' PahAnggaranDetil', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' PahAnggaranDetil', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahAnggaranDetil #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'id',
array(
			'label' => 'PahAnggaran',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahAnggaran)), array('pahAnggaran/view', 'id' => GxActiveRecord::extractPkValue($model->pahAnggaran, true))),
			),
'amount',
array(
			'label' => 'PahChartMaster',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->pahChartMasterAccountCode)), array('pahChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->pahChartMasterAccountCode, true))),
			),
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

