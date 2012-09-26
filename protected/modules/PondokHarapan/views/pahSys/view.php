<?php
$this->breadcrumbs = array(
	'Pah Sys' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' PahSys', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' PahSys', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' PahSys', 'url'=>array('update', 'id' => $model->name)),
	array('label'=>Yii::t('app', 'Delete') . ' PahSys', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->name), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' PahSys', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahSys #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'name',
'value',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

