<?php
$this->breadcrumbs = array(
    'Pe Anggaran Detils' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAnggaranDetil', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAnggaranDetil', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeAnggaranDetil', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeAnggaranDetil', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeAnggaranDetil #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>