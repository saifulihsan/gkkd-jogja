<?php
$this->breadcrumbs = array(
    'Pah Aktivitases' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahAktivitas', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahAktivitas', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahAktivitas #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>