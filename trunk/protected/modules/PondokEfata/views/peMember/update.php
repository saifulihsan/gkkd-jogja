<?php
$this->breadcrumbs = array(
    'Pe Members' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeMember', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeMember', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeMember', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeMember', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeMember #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>