<?php
$this->breadcrumbs = array(
    'Pe Gl Trans' => array('index'),
    Yii::t('app', 'Create'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeGlTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Manage') . ' PeGlTrans', 'url' => array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Create'); ?> PeGlTrans</h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model,
    'buttons' => 'create'));
?>