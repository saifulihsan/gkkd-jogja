<?php
$this->breadcrumbs = array(
    'Pe Bank Trans',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeBankTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeBankTrans', 'url' => array('admin')),
);
?>

<h1>Pe Bank Trans</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 