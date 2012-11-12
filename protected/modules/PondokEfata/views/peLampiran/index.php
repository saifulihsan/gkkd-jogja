<?php
$this->breadcrumbs = array(
    'Pe Lampirans',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeLampiran', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeLampiran', 'url' => array('admin')),
);
?>

<h1>Pe Lampirans</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 