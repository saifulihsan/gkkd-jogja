<?php
$this->breadcrumbs = array(
    'Pah Sub Aktivitases' => array('index'),
    GxHtml::valueEx($model) => array('view', 'id' => GxActiveRecord::extractPkValue($model, true)),
    Yii::t('app', 'Update'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'List') . ' PahSubAktivitas', 'url' => array('index')),
    array('label' => Yii::t('app', 'Create') . ' PahSubAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'View') . ' PahSubAktivitas', 'url' => array('view', 'id' => GxActiveRecord::extractPkValue($model, true))),
    //array('label' => Yii::t('app', 'Manage') . ' PahSubAktivitas', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'Update'); ?> PahSubAktivitas #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php
$this->renderPartial('_form', array(
    'model' => $model));
?>