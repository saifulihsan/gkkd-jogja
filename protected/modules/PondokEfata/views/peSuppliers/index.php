<?php
$this->breadcrumbs = array(
    'Pe Suppliers',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeSuppliers', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeSuppliers', 'url' => array('admin')),
);
?>

<h1>Pe Suppliers</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 