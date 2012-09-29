<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('counter')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->counter), array('view', 'id' => $data->counter)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('type')); ?>:
	<?php echo GxHtml::encode($data->type); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('type_no')); ?>:
	<?php echo GxHtml::encode($data->type_no); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('tran_date')); ?>:
	<?php echo GxHtml::encode($data->tran_date); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('account')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->account0)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('memo_')); ?>:
	<?php echo GxHtml::encode($data->memo_); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('amount')); ?>:
	<?php echo GxHtml::encode($data->amount); ?>
	<br />
	<?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('person_type_id')); ?>:
	<?php echo GxHtml::encode($data->person_type_id); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('person_id')); ?>:
	<?php echo GxHtml::encode($data->person_id); ?>
	<br />
	*/ ?>

</div>