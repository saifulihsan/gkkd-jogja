<?php
$this->breadcrumbs = array(
    'Pah Kas Masuks' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahKasMasuk', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahKasMasuk', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahKasMasuk</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>