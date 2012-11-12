<?php
$this->breadcrumbs = array(
    'Pe Gl Trans',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeGlTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeGlTrans', 'url' => array('admin')),
);
?>

<h1>Pe Gl Trans</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 