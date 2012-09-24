<?php
$this->breadcrumbs = array(
	'Security Roles' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' SecurityRoles', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' SecurityRoles', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' SecurityRoles', 'url'=>array('update', 'id' => $model->id)),
	array('label'=>Yii::t('app', 'Delete') . ' SecurityRoles', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' SecurityRoles', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> SecurityRoles #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'id',
'role',
'description',
'sections',
'areas',
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

<!--h2>Users</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->users as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('users/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>