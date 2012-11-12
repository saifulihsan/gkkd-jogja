<?php
$this->breadcrumbs = array(
    'Pe Aktivitases' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeAktivitas', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeAktivitas', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeAktivitas #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>