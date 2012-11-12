<?php
$this->breadcrumbs = array(
    'Pe Lampirans' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeLampiran', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeLampiran', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeLampiran', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeLampiran', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeLampiran #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>