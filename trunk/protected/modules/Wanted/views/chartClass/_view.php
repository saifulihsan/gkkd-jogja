<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('cid')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->cid), array('view', 'id' => $data->cid)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('class_name')); ?>:
	<?php echo GxHtml::encode($data->class_name); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('ctype')); ?>:
	<?php echo GxHtml::encode($data->ctype); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />

</div>