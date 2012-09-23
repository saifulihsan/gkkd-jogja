<?php
$this->breadcrumbs = array(
	'Jemaats' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' Jemaat', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' Jemaat', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' Jemaat', 'url'=>array('update', 'id' => $model->nij)),
	array('label'=>Yii::t('app', 'Delete') . ' Jemaat', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->nij), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' Jemaat', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> Jemaat #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'nij',
'real_name',
'phone',
'email',
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

<!--h2>Pah Members</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahMembers as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahMember/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Users</h2-->
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