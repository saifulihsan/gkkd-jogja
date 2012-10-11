<?php
$this->breadcrumbs = array(
    'Pah Bank Trans',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PahBankTrans', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PahBankTrans', 'url' => array('admin')),
);
?>

<h1>Pah Bank Trans</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 