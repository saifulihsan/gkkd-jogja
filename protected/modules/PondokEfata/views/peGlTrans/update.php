<?php
$this->breadcrumbs = array(
    'Pe Gl Trans' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeGlTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeGlTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeGlTrans', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeGlTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeGlTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>