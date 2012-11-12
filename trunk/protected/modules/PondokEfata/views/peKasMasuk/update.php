<?php
$this->breadcrumbs = array(
    'Pe Kas Masuks' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeKasMasuk', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeKasMasuk', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeKasMasuk', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeKasMasuk', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeKasMasuk #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>