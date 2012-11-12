<?php
$this->breadcrumbs = array(
    'Pe Donaturs',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeDonatur', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeDonatur', 'url' => array('admin')),
);
?>

<h1>Pe Donaturs</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 