<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('barang_id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->barang_id), array('view', 'id' => $data->barang_id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('ref')); ?>:
	<?php echo GxHtml::encode($data->ref); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('desc')); ?>:
	<?php echo GxHtml::encode($data->desc); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('harga')); ?>:
	<?php echo GxHtml::encode($data->harga); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />

</div>