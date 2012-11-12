<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grup Trans' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeAktivitasGrupTrans', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeAktivitasGrupTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeAktivitasGrupTrans', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeAktivitasGrupTrans', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeAktivitasGrupTrans
    #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>