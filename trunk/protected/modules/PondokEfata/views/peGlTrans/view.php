<?php
$this->breadcrumbs = array(
    'Pe Gl Trans' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeGlTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeGlTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PeGlTrans', 'url' => array('update', 'id' => $model->counter)),
    array('label' => Yii::t('app', 'Delete') . ' PeGlTrans', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->counter), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PeGlTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PeGlTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'counter',
        'type',
        'type_no',
        'tran_date',
        array(
            'label' => 'PeChartMaster',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->account0)), array('peChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->account0, true))),
        ),
        'memo_',
        'amount',
        'users_id',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

