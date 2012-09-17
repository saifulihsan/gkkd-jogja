<?php
$this->breadcrumbs = array(
	'Pah Donaturs' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' PahDonatur', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' PahDonatur', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' PahDonatur', 'url'=>array('update', 'id' => $model->id)),
	array('label'=>Yii::t('app', 'Delete') . ' PahDonatur', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' PahDonatur', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahDonatur #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'id',
'name',
'phone',
'alamat',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

