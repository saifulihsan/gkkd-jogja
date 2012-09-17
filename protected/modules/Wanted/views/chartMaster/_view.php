<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('account_code')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->account_code), array('view', 'id' => $data->account_code)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('account_code2')); ?>:
	<?php echo GxHtml::encode($data->account_code2); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('account_name')); ?>:
	<?php echo GxHtml::encode($data->account_name); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('account_type')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->accountType)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />

</div>