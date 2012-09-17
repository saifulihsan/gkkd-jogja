<?php
$this->breadcrumbs = array(
	'Sales' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' Sales', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' Sales', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' Sales', 'url'=>array('update', 'id' => $model->sales_id)),
	array('label'=>Yii::t('app', 'Delete') . ' Sales', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->sales_id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' Sales', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> Sales #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'sales_id',
'ref',
'name',
'address',
'phone',
'phone2',
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

<!--h2>Notas</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->notas as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('nota/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>