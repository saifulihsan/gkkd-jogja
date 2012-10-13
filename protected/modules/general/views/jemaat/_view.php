<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('nij')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->nij), array('view', 'id' => $data->nij)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('real_name')); ?>:
	<?php echo GxHtml::encode($data->real_name); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('phone')); ?>:
	<?php echo GxHtml::encode($data->phone); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('email')); ?>:
	<?php echo GxHtml::encode($data->email); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('alamat')); ?>:
	<?php echo GxHtml::encode($data->alamat); ?>
	<br />

</div>