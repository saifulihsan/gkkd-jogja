<?php
$this->breadcrumbs = array(
    'Pah Bank Trans' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahBankTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahBankTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahBankTrans', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahBankTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahBankTrans #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>