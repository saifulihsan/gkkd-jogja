<?php
$this->breadcrumbs = array(
    'Pe Donaturs' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeDonatur', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeDonatur', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeDonatur', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeDonatur', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeDonatur #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>