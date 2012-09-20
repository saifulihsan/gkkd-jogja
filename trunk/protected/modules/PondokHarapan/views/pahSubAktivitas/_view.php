<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('nama')); ?>:
	<?php echo GxHtml::encode($data->nama); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('desc')); ?>:
	<?php echo GxHtml::encode($data->desc); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('account_code')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->accountCode)); ?>
	<br />

</div>