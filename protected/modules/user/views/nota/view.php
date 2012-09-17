<?php
$this->breadcrumbs = array(
	'Notas' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' Nota', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' Nota', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' Nota', 'url'=>array('update', 'id' => $model->nota_id)),
	array('label'=>Yii::t('app', 'Delete') . ' Nota', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->nota_id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' Nota', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> Nota #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'nota_id',
array(
			'label' => 'Sales',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->sales)), array('sales/view', 'id' => GxActiveRecord::extractPkValue($model->sales, true))),
			),
'term',
'warehouse',
'status',
'currency',
'notes',
'rate',
'doc_date',
'doc_ref',
array(
			'label' => 'Customers',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->customer)), array('customers/view', 'id' => GxActiveRecord::extractPkValue($model->customer, true))),
			),
'trans_date',
'total_1',
'disc',
'total_2',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

<!--h2>Nota Dtls</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->notaDtls as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('notaDtl/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>