<?php
$this->breadcrumbs = array(
    'Pe Bank Accounts' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeBankAccounts', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeBankAccounts', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeBankAccounts', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeBankAccounts', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeBankAccounts #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>