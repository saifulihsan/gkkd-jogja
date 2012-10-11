<?php
$this->breadcrumbs = array(
    'Pah Chart Types',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PahChartTypes', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PahChartTypes', 'url' => array('admin')),
);
?>

<h1>Pah Chart Types</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 