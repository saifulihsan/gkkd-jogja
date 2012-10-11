<?php
$this->breadcrumbs = array(
    'Pah Anggarans' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahAnggaran', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahAnggaran', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahAnggaran', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahAnggaran', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahAnggaran #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>