<?php
$this->breadcrumbs = array(
    'Pah Bank Accounts' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahBankAccounts', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahBankAccounts', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahBankAccounts</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>