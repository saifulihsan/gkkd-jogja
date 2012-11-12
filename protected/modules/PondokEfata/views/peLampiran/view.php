<?php
$this->breadcrumbs = array(
    'Pe Lampirans' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeLampiran', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeLampiran', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeLampiran', 'url' => array('update', 'id' => $model->id_lampiran)),
    array('label' => Yii::t('app', 'Delete') . ' PeLampiran', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id_lampiran), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeLampiran', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeLampiran #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id_lampiran',
        'nama',
        'trans_date',
        'keterangan',
        'satuan',
        'qty',
        'entry_time',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

