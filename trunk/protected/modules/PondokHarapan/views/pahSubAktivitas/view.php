<?php
$this->breadcrumbs = array(
    'Pah Sub Aktivitases' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahSubAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahSubAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PahSubAktivitas', 'url' => array('update', 'id' => $model->id)),
    array('label' => Yii::t('app', 'Delete') . ' PahSubAktivitas', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PahSubAktivitas', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahSubAktivitas #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        'nama',
        'desc',
        array(
            'label' => 'PahChartMaster',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountCode)), array('pahChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->accountCode, true))),
        ),
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

