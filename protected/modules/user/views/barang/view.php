<?php
$this->breadcrumbs = array(
	'Barangs' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' Barang', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' Barang', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' Barang', 'url'=>array('update', 'id' => $model->barang_id)),
	array('label'=>Yii::t('app', 'Delete') . ' Barang', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->barang_id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' Barang', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> Barang #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'barang_id',
'ref',
'desc',
'harga',
'inactive',
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