<?php
$this->breadcrumbs = array(
    'Pah Aktivitases' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahAktivitas', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahAktivitas</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>