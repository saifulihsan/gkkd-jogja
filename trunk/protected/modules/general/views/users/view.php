<?php
$this->breadcrumbs = array(
    'Users' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' Users', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' Users', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' Users', 'url' => array('update', 'id' => $model->id)),
    array('label' => Yii::t('app', 'Delete') . ' Users', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' Users', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> Users #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        'user_id',
        'password',
        'last_visit_date',
        'inactive',
        array(
            'label' => 'Jemaat',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->nij0)), array('jemaat/view', 'id' => GxActiveRecord::extractPkValue($model->nij0, true))),
        ),
        array(
            'label' => 'SecurityRoles',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->securityRoles)), array('securityRoles/view', 'id' => GxActiveRecord::extractPkValue($model->securityRoles, true))),
        ),
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

<!--h2>Pah Aktivitases</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahAktivitases as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahAktivitas/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pah Anggarans</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahAnggarans as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahAnggaran/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pah Kas Keluars</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahKasKeluars as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahKasKeluar/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?><!--h2>Pah Kas Masuks</h2-->
<?php
/*
	echo GxHtml::openTag('ul');
	foreach($model->pahKasMasuks as $relatedModel) {
		echo GxHtml::openTag('li');
		echo GxHtml::link(GxHtml::encode(GxHtml::valueEx($relatedModel)), array('pahKasMasuk/view', 'id' => GxActiveRecord::extractPkValue($relatedModel, true)));
		echo GxHtml::closeTag('li');
	}
	echo GxHtml::closeTag('ul');*/
?>