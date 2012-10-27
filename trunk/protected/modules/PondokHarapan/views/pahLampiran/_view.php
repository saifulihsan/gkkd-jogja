<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id_lampiran')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id_lampiran), array('view', 'id' => $data->id_lampiran)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('nama')); ?>:
	<?php echo GxHtml::encode($data->nama); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('trans_date')); ?>:
	<?php echo GxHtml::encode($data->trans_date); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('keterangan')); ?>:
	<?php echo GxHtml::encode($data->keterangan); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('satuan')); ?>:
	<?php echo GxHtml::encode($data->satuan); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('qty')); ?>:
	<?php echo GxHtml::encode($data->qty); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('entry_time')); ?>:
	<?php echo GxHtml::encode($data->entry_time); ?>
	<br />

</div>