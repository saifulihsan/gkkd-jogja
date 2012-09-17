<?php
$this->breadcrumbs = array(
	'Tbl Users' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' TblUser', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' TblUser', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' TblUser', 'url'=>array('update', 'id' => $model->id)),
	array('label'=>Yii::t('app', 'Delete') . ' TblUser', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' TblUser', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> TblUser #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'id',
'username',
'password',
'email',
'level',
'nick',
'complete',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

