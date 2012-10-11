<?php
$this->breadcrumbs = array(
    'Pah Bank Trans' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahBankTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PahBankTrans', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PahBankTrans</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>