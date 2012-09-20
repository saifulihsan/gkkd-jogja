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
		<?php echo $form->label($model, 'nama'); ?>
		<?php echo $form->textField($model, 'nama', array('maxlength' => 50)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'desc'); ?>
		<?php echo $form->textArea($model, 'desc'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'account_code'); ?>
		<?php echo $form->dropDownList($model, 'account_code', GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
