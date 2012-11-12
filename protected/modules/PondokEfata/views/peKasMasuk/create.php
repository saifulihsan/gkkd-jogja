<?php
$this->breadcrumbs = array(
    'Pe Kas Masuks' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeKasMasuk', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeKasMasuk', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeKasMasuk</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>