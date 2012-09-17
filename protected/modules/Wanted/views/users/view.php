<?php
$this->breadcrumbs = array(
	'Users' => array('index'),
	GxHtml::valueEx($model),
);

$this->menu=array(
	array('label'=>Yii::t('app', 'List') . ' Users', 'url'=>array('index')),
	array('label'=>Yii::t('app', 'Create') . ' Users', 'url'=>array('create')),
	array('label'=>Yii::t('app', 'Update') . ' Users', 'url'=>array('update', 'id' => $model->id)),
	array('label'=>Yii::t('app', 'Delete') . ' Users', 'url'=>'#', 'linkOptions' => array('submit' => array('delete', 'id' => $model->id), 'confirm'=>'Are you sure you want to delete this item?')),
	//array('label'=>Yii::t('app', 'Manage') . ' Users', 'url'=>array('admin')),
);
?>

<h1><?php echo Yii::t('app', 'View'); ?> Users #<?php echo GxHtml::encode(GxHtml::valueEx($model)); ?></h1>

<?php $this->widget('zii.widgets.CDetailView', array(
	'data' => $model,
	'attributes' => array(
'id',
'user_id',
'password',
'real_name',
'role_id',
'phone',
'email',
'language',
'date_format',
'date_sep',
'tho_sep',
'dec_sep',
'theme',
'page_size',
'prices_dec',
'qty_dec',
'rates_dec',
'percent_dec',
'show_gl',
'show_codes',
'show_hints',
'last_visit_date',
'query_size',
'graphic_links',
'pos',
'print_profile',
'rep_popup',
'sticky_doc_date',
'startup_tab',
'inactive',
	),
        'itemTemplate' => "<tr class=\"{class}\"><td style=\"width: 120px\"><b>{label}</b></td><td>{value}</td></tr>\n",
        'htmlOptions' => array(
            'class' => 'table',
        ),
)); ?>

