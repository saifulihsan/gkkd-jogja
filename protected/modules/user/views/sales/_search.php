<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'sales_id'); ?>
		<?php echo $form->textField($model, 'sales_id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'ref'); ?>
		<?php echo $form->textField($model, 'ref'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'name'); ?>
		<?php echo $form->textField($model, 'name'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'address'); ?>
		<?php echo $form->textArea($model, 'address'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'phone'); ?>
		<?php echo $form->textField($model, 'phone'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'phone2'); ?>
		<?php echo $form->textField($model, 'phone2'); ?>
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
