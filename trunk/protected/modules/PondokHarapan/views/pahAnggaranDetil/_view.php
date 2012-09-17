<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('pah_anggaran_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->pahAnggaran)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('kode_rekening')); ?>:
	<?php echo GxHtml::encode($data->kode_rekening); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('amount')); ?>:
	<?php echo GxHtml::encode($data->amount); ?>
	<br />

</div>