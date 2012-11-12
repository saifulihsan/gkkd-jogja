<?php
$this->breadcrumbs = array(
    'Pe Members' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeMember', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeMember', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeMember', 'url' => array('update', 'id' => $model->id)),
    array('label' => Yii::t('app', 'Delete') . ' PeMember', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeMember', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeMember #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        array(
            'label' => 'Jemaat',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->jemaatNij)), array('jemaat/view', 'id' => GxActiveRecord::extractPkValue($model->jemaatNij, true))),
        ),
        'inactive',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

<!--h2>Pe Aktivitases</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->peAktivitases as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('peAktivitas/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>