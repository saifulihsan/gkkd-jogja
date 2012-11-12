<?php
$this->breadcrumbs = array(
    'Pe Anggarans',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeAnggaran', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeAnggaran', 'url' => array('admin')),
);
?>

<h1>Pe Anggarans</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 