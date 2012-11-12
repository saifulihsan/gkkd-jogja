<?php
$this->breadcrumbs = array(
    'Pe Sys Prefs',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeSysPrefs', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeSysPrefs', 'url' => array('admin')),
);
?>

<h1>Pe Sys Prefs</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 