<?php
$this->breadcrumbs = array(
    'Security Roles',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' SecurityRoles', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' SecurityRoles', 'url' => array('admin')),
);
?>

<h1>Security Roles</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 