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
		<?php echo $form->label($model, 'role'); ?>
		<?php echo $form->textField($model, 'role', array('maxlength' => 30)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'description'); ?>
		<?php echo $form->textField($model, 'description', array('maxlength' => 50)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'sections'); ?>
		<?php echo $form->textArea($model, 'sections'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'areas'); ?>
		<?php echo $form->textArea($model, 'areas'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'inactive'); ?>
		<?php echo $form->dropDownList($model, 'inactive', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
