<?php
$this->breadcrumbs = array(
    'Pe Anggaran Detils' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAnggaranDetil', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAnggaranDetil', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeAnggaranDetil', 'url' => array('update', 'id' => $model->id)),
    array('label' => Yii::t('app', 'Delete') . ' PeAnggaranDetil', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeAnggaranDetil', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeAnggaranDetil #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'id',
        array(
            'label' => 'PeAnggaran',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->anggaran)), array('peAnggaran/view', 'id' => GxActiveRecord::extractPkValue($model->anggaran, true))),
        ),
        'amount',
        array(
            'label' => 'PeChartMaster',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->accountCode)), array('peChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->accountCode, true))),
        ),
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

