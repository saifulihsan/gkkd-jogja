<?php
$this->breadcrumbs = array(
    'Pe Bank Trans' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeBankTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeBankTrans', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeBankTrans</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>