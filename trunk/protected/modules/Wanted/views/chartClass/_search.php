<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'cid'); ?>
		<?php echo $form->textField($model, 'cid', array('maxlength' => 3)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'class_name'); ?>
		<?php echo $form->textField($model, 'class_name', array('maxlength' => 60)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'ctype'); ?>
		<?php echo $form->dropDownList($model, 'ctype', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
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
