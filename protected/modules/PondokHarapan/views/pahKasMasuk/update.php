<?php
$this->breadcrumbs = array(
    'Pah Kas Masuks' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahKasMasuk', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahKasMasuk', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahKasMasuk', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahKasMasuk', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahKasMasuk #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>