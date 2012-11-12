<?php
$this->breadcrumbs = array(
    'Pe Lampirans' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeLampiran', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeLampiran', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeLampiran</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>