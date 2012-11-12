<?php
$this->breadcrumbs = array(
    'Pe Members' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeMember', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeMember', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeMember</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>