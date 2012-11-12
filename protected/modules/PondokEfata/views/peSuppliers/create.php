<?php
$this->breadcrumbs = array(
    'Pe Suppliers' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeSuppliers', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeSuppliers', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeSuppliers</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>