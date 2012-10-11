<?php
$this->breadcrumbs = array(
    'Pah Kas Keluars',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PahKasKeluar', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PahKasKeluar', 'url' => array('admin')),
);
?>

<h1>Pah Kas Keluars</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 