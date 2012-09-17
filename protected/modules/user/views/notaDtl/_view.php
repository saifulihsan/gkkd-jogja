<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('nota_dtl_id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->nota_dtl_id), array('view', 'id' => $data->nota_dtl_id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('nota_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->nota)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('barang_id')); ?>:
		<?php echo GxHtml::encode(GxHtml::valueEx($data->barang)); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('jml')); ?>:
	<?php echo GxHtml::encode($data->jml); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('harga_satuan')); ?>:
	<?php echo GxHtml::encode($data->harga_satuan); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('total_harga_1')); ?>:
	<?php echo GxHtml::encode($data->total_harga_1); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('disc_per')); ?>:
	<?php echo GxHtml::encode($data->disc_per); ?>
	<br />
	<?php /*
	<?php echo GxHtml::encode($data->getAttributeLabel('disc_rp')); ?>:
	<?php echo GxHtml::encode($data->disc_rp); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('total_harga_2')); ?>:
	<?php echo GxHtml::encode($data->total_harga_2); ?>
	<br />
	*/ ?>

</div>