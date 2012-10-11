<?php
$this->breadcrumbs = array(
    'Pah Kas Keluars' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahKasKeluar', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahKasKeluar', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahKasKeluar', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahKasKeluar', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahKasKeluar #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>