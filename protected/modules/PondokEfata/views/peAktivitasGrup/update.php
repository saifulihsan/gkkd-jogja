<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grups' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitasGrup', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAktivitasGrup', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeAktivitasGrup', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeAktivitasGrup', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeAktivitasGrup #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>