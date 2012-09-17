<?php
$this->breadcrumbs = array(
	'Pah Chart Types' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' PahChartTypes', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' PahChartTypes', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' PahChartTypes', 'url'=>array('update', 'id' => $model->id)),
	array('label'=>Yii::t('app', 'Delete') . ' PahChartTypes', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' PahChartTypes', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahChartTypes #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'id',
'name',
array(
			'label' => 'PahChartClass',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->class)), array('pahChartClass/view', 'id' => GxActiveRecord::extractPkValue($model->class, true))),
			),
'parent',
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

<!--h2>Pah Chart Masters</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahChartMasters as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahChartMaster/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>