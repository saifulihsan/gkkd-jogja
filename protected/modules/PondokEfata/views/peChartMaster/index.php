<?php
$this->breadcrumbs = array(
    'Pe Chart Masters',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeChartMaster', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeChartMaster', 'url' => array('admin')),
);
?>

<h1>Pe Chart Masters</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 