<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'barang_id'); ?>
		<?php echo $form->textField($model, 'barang_id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'ref'); ?>
		<?php echo $form->textField($model, 'ref'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'desc'); ?>
		<?php echo $form->textArea($model, 'desc'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'harga'); ?>
		<?php echo $form->textField($model, 'harga'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'inactive'); ?>
		<?php echo $form->textField($model, 'inactive'); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
