<?php
$this->breadcrumbs = array(
    'Jemaats' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' Jemaat', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' Jemaat', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> Jemaat</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>