<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('customer_id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->customer_id), array('view', 'id' => $data->customer_id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('name')); ?>:
	<?php echo GxHtml::encode($data->name); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('phone')); ?>:
	<?php echo GxHtml::encode($data->phone); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('phone2')); ?>:
	<?php echo GxHtml::encode($data->phone2); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('address')); ?>:
	<?php echo GxHtml::encode($data->address); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('email')); ?>:
	<?php echo GxHtml::encode($data->email); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('fax')); ?>:
	<?php echo GxHtml::encode($data->fax); ?>
	<br />
	<?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />
	*/ ?>

</div>