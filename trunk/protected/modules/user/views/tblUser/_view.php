<div class="view">

	<?php echo GxHtml::encode($data->getAttributeLabel('id')); ?>:
	<?php echo GxHtml::link(GxHtml::encode($data->id), array('view', 'id' => $data->id)); ?>
	<br />

	<?php echo GxHtml::encode($data->getAttributeLabel('username')); ?>:
	<?php echo GxHtml::encode($data->username); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('password')); ?>:
	<?php echo GxHtml::encode($data->password); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('email')); ?>:
	<?php echo GxHtml::encode($data->email); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('level')); ?>:
	<?php echo GxHtml::encode($data->level); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('nick')); ?>:
	<?php echo GxHtml::encode($data->nick); ?>
	<br />
	<?php echo GxHtml::encode($data->getAttributeLabel('complete')); ?>:
	<?php echo GxHtml::encode($data->complete); ?>
	<br />

</div>