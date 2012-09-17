<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('sales_id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->sales_id), array('view', 'id' => $data->sales_id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('ref')); ?>:
	<?php echo GxHtml::encode($data->ref); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('name')); ?>:
	<?php echo GxHtml::encode($data->name); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('address')); ?>:
	<?php echo GxHtml::encode($data->address); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('phone')); ?>:
	<?php echo GxHtml::encode($data->phone); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('phone2')); ?>:
	<?php echo GxHtml::encode($data->phone2); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />

</div>