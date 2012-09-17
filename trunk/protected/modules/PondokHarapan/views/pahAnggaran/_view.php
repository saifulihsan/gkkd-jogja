<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('doc_ref')); ?>:
	<?php echo GxHtml::encode($data->doc_ref); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('periode_bulan')); ?>:
	<?php echo GxHtml::encode($data->periode_bulan); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('periode_tahun')); ?>:
	<?php echo GxHtml::encode($data->periode_tahun); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('trans_date')); ?>:
	<?php echo GxHtml::encode($data->trans_date); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('lock')); ?>:
	<?php echo GxHtml::encode($data->lock); ?>
	<br />

</div>