<?php
$this->breadcrumbs = array(
    'Pah Suppliers' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahSuppliers', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahSuppliers', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahSuppliers', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahSuppliers', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahSuppliers #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>