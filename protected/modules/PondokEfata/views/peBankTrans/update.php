<?php
$this->breadcrumbs = array(
    'Pe Bank Trans' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeBankTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeBankTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeBankTrans', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeBankTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeBankTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>