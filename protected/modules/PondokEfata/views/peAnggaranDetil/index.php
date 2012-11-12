<?php
$this->breadcrumbs = array(
    'Pe Anggaran Detils',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeAnggaranDetil', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeAnggaranDetil', 'url' => array('admin')),
);
?>

<h1>Pe Anggaran Detils</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 