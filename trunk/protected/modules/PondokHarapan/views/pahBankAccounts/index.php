<?php
$this->breadcrumbs = array(
    'Pah Bank Accounts',
    Yii::t('app', 'Index'),
);
$this->menu = array(
    array('label' => Yii::t('app', 'Create') . ' PahBankAccounts', 'url' => array('create')),
    array('label' => Yii::t('app', 'Manage') . ' PahBankAccounts', 'url' => array('admin')),
);
?>

<h1>Pah Bank Accounts</h1>

<?php $this->widget('zii.widgets.CListView', array(
    'dataProvider' => $dataProvider,
    'itemView' => '_view',
)); 