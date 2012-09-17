<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'id'); ?>
		<?php echo $form->textField($model, 'id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'username'); ?>
		<?php echo $form->textField($model, 'username', array('maxlength' => 128)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'email'); ?>
		<?php echo $form->textField($model, 'email', array('maxlength' => 128)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'level'); ?>
		<?php echo $form->textField($model, 'level', array('maxlength' => 128)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'nick'); ?>
		<?php echo $form->textField($model, 'nick', array('maxlength' => 10)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'complete'); ?>
		<?php echo $form->textField($model, 'complete', array('maxlength' => 128)); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
