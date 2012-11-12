<?php
$this->breadcrumbs = array(
    'Pe Aktivitas Grup Trans',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeAktivitasGrupTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeAktivitasGrupTrans', 'url' => array('admin')),
);
?>

<h1>Pe Aktivitas Grup Trans</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 