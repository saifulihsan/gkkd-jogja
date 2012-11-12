<?php
$this->breadcrumbs = array(
    'Pe Aktivitases',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeAktivitas', 'url' => array('admin')),
);
?>

<h1>Pe Aktivitases</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 