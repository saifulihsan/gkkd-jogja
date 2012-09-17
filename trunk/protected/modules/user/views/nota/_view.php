<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('nota_id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->nota_id), array('view', 'id' => $data->nota_id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('sales_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->sales)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('term')); ?>:
	<?php echo GxHtml::encode($data->term); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('warehouse')); ?>:
	<?php echo GxHtml::encode($data->warehouse); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('status')); ?>:
	<?php echo GxHtml::encode($data->status); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('currency')); ?>:
	<?php echo GxHtml::encode($data->currency); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('notes')); ?>:
	<?php echo GxHtml::encode($data->notes); ?>
	<br />
	<?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('rate')); ?>:
	<?php echo GxHtml::encode($data->rate); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('doc_date')); ?>:
	<?php echo GxHtml::encode($data->doc_date); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('doc_ref')); ?>:
	<?php echo GxHtml::encode($data->doc_ref); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('customer_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->customer)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('trans_date')); ?>:
	<?php echo GxHtml::encode($data->trans_date); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('total_1')); ?>:
	<?php echo GxHtml::encode($data->total_1); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('disc')); ?>:
	<?php echo GxHtml::encode($data->disc); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('total_2')); ?>:
	<?php echo GxHtml::encode($data->total_2); ?>
	<br />
	*/ ?>

</div>