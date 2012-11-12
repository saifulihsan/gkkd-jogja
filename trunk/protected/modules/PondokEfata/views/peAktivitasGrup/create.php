<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grups' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitasGrup', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeAktivitasGrup', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeAktivitasGrup</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>