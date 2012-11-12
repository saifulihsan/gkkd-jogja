<?php
$this->breadcrumbs = array(
    'Pe Sub Aktivitases' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PeSubAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PeSubAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PeSubAktivitas', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PeSubAktivitas', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PeSubAktivitas #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>