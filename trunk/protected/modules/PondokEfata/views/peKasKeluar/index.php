<?php
$this->breadcrumbs = array(
    'Pe Kas Keluars',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeKasKeluar', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeKasKeluar', 'url' => array('admin')),
);
?>

<h1>Pe Kas Keluars</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 