<?php
$this->breadcrumbs = array(
    'Pe Bank Accounts' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeBankAccounts', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeBankAccounts', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeBankAccounts</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>