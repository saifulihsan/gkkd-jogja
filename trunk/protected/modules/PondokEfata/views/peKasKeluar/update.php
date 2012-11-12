<?php
$this->breadcrumbs = array(
    'Pe Kas Keluars' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeKasKeluar', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeKasKeluar', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeKasKeluar', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeKasKeluar', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeKasKeluar #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>