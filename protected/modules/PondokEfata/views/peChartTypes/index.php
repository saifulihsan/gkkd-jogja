<?php
$this->breadcrumbs = array(
    'Pe Chart Types',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeChartTypes', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeChartTypes', 'url' => array('admin')),
);
?>

<h1>Pe Chart Types</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 