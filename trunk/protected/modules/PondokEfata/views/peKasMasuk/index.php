<?php
$this->breadcrumbs = array(
    'Pe Kas Masuks',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeKasMasuk', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeKasMasuk', 'url' => array('admin')),
);
?>

<h1>Pe Kas Masuks</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 