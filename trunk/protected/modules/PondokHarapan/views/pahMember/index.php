<?php
$this->breadcrumbs = array(
    'Pah Members',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PahMember', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PahMember', 'url' => array('admin')),
);
?>

<h1>Pah Members</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 