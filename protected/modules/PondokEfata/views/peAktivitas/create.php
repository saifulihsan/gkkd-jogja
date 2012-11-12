<?php
$this->breadcrumbs = array(
    'Pe Aktivitases' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeAktivitas', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeAktivitas</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>