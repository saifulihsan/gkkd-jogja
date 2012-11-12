<?php
$this->breadcrumbs = array(
    'Pe Suppliers' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeSuppliers', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeSuppliers', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeSuppliers', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeSuppliers', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeSuppliers #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>