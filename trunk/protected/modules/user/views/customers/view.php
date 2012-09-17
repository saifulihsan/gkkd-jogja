<?php
$this->breadcrumbs = array(
	'Customers' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' Customers', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' Customers', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' Customers', 'url'=>array('update', 'id' => $model->customer_id)),
	array('label'=>Yii::t('app', 'Delete') . ' Customers', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->customer_id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' Customers', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> Customers #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'customer_id',
'name',
'phone',
'phone2',
'address',
'email',
'fax',
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