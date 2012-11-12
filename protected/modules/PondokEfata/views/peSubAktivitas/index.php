<?php
$this->breadcrumbs = array(
    'Pe Sub Aktivitases',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeSubAktivitas', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeSubAktivitas', 'url' => array('admin')),
);
?>

<h1>Pe Sub Aktivitases</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 