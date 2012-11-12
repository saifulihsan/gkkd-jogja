<?php
$this->breadcrumbs = array(
    'Pe Bank Accounts',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PeBankAccounts', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PeBankAccounts', 'url' => array('admin')),
);
?>

<h1>Pe Bank Accounts</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 