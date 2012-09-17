<?php
$this->breadcrumbs = array(
	'Chart Classes' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' ChartClass', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' ChartClass', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' ChartClass', 'url'=>array('update', 'id' => $model->cid)),
	array('label'=>Yii::t('app', 'Delete') . ' ChartClass', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->cid), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' ChartClass', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> ChartClass #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'cid',
'class_name',
'ctype',
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

<!--h2>Chart Types</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->chartTypes as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('chartTypes/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>