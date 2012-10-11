<?php
$this->breadcrumbs = array(
    'Pah Sub Aktivitases' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahSubAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahSubAktivitas', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahSubAktivitas</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>