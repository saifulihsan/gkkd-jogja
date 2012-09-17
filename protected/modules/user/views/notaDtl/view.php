<?php
$this->breadcrumbs = array(
	'Nota Dtls' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' NotaDtl', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' NotaDtl', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' NotaDtl', 'url'=>array('update', 'id' => $model->nota_dtl_id)),
	array('label'=>Yii::t('app', 'Delete') . ' NotaDtl', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->nota_dtl_id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' NotaDtl', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> NotaDtl #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'nota_dtl_id',
array(
			'label' => 'Nota',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->nota)), array('nota/view', 'id' => GxActiveRecord::extractPkValue($model->nota, true))),
			),
array(
			'label' => 'Barang',
			'type' => 'raw',
			'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->barang)), array('barang/view', 'id' => GxActiveRecord::extractPkValue($model->barang, true))),
			),
'jml',
'harga_satuan',
'total_harga_1',
'disc_per',
'disc_rp',
'total_harga_2',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

