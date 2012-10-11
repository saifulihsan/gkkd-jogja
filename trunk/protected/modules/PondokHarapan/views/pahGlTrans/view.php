<?php
$this->breadcrumbs = array(
    'Pah Gl Trans' => array('index'),
    GxHtml::valueEx($model),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahGlTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahGlTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Update') . ' PahGlTrans', 'url' => array('update', 'id' => $model->counter)),
    array('label' => Yii::t('app', 'Delete') . ' PahGlTrans', 'url' => '#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->counter), 'confirm' => 'Are you sure you want to delete this item?')),
    //array('label'=>Yii::t('app', 'Manage') . ' PahGlTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> PahGlTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
    'data' => $model,
    'attributes' => array(
        'counter',
        'type',
        'type_no',
        'tran_date',
        array(
            'label' => 'PahChartMaster',
            'type' => 'raw',
            'value' => GxHtml::link(GxHtml::encode(GxHtml::valueEx($model->account0)), array('pahChartMaster/view', 'id' => GxActiveRecord::extractPkValue($model->account0, true))),
        ),
        'memo_',
        'amount',
        'person_type_id',
        'person_id',
    ),
    'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
    'htmlOptions' => array(
        'class' => 'table',
    ),
)); ?>

