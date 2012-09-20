<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('type')); ?>:
	<?php echo GxHtml::encode($data->type); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('trans_no')); ?>:
	<?php echo GxHtml::encode($data->trans_no); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('bank_act')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->bankAct)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ref')); ?>:
	<?php echo GxHtml::encode($data->ref); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('trans_date')); ?>:
	<?php echo GxHtml::encode($data->trans_date); ?>
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
	<?php echo GxHtml::encode($data->getAttributeLabel('reconciled')); ?>:
	<?php echo GxHtml::encode($data->reconciled); ?>
	<br />
	*/ ?>

</div>