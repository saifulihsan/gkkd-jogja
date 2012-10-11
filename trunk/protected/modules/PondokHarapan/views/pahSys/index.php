<?php
$this->breadcrumbs = array(
    'Pah Sys',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PahSys', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PahSys', 'url' => array('admin')),
);
?>

<h1>Pah Sys</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 