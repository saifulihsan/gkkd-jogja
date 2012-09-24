<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('role')); ?>:
	<?php echo GxHtml::encode($data->role); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('description')); ?>:
	<?php echo GxHtml::encode($data->description); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('sections')); ?>:
	<?php echo GxHtml::encode($data->sections); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('areas')); ?>:
	<?php echo GxHtml::encode($data->areas); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('inactive')); ?>:
	<?php echo GxHtml::encode($data->inactive); ?>
	<br />

</div>