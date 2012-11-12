<?php
$this->breadcrumbs = array(
    'Pe Members',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeMember', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeMember', 'url' => array('admin')),
);
?>

<h1>Pe Members</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 