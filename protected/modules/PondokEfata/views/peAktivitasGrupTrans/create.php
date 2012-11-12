<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grup Trans' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitasGrupTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeAktivitasGrupTrans', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeAktivitasGrupTrans</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>