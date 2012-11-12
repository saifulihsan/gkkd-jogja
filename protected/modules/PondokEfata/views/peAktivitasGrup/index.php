<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grups',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeAktivitasGrup', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeAktivitasGrup', 'url' => array('admin')),
);
?>

<h1>Pe Aktivitas Grups</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 