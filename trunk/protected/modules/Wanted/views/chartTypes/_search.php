<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'id'); ?>
		<?php echo $form->textField($model, 'id', array('maxlength' => 10)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'name'); ?>
		<?php echo $form->textField($model, 'name', array('maxlength' => 60)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'class_id'); ?>
		<?php echo $form->dropDownList($model, 'class_id', GxHtml::listDataEx(ChartClass::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'parent'); ?>
		<?php echo $form->textField($model, 'parent', array('maxlength' => 10)); ?>
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
