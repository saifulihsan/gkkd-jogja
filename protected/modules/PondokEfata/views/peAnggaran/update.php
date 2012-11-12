<?php
$this->breadcrumbs = array(
    'Pe Anggarans' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAnggaran', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAnggaran', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeAnggaran', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeAnggaran', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeAnggaran #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>