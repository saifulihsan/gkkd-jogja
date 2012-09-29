<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'counter'); ?>
		<?php echo $form->textField($model, 'counter'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'type'); ?>
		<?php echo $form->textField($model, 'type'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'type_no'); ?>
		<?php echo $form->textField($model, 'type_no'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'tran_date'); ?>
		<?php $form->widget('zii.widgets.jui.CJuiDatePicker', array(
			'model' => $model,
			'attribute' => 'tran_date',
			'value' => $model->tran_date,
			'options' => array(
				'showButtonPanel' => true,
				'changeYear' => true,
				'dateFormat' => 'yy-mm-dd',
				),
			));
; ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'account'); ?>
		<?php echo $form->dropDownList($model, 'account', GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'memo_'); ?>
		<?php echo $form->textArea($model, 'memo_'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'amount'); ?>
		<?php echo $form->textField($model, 'amount'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'person_type_id'); ?>
		<?php echo $form->textField($model, 'person_type_id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'person_id'); ?>
		<?php echo $form->textField($model, 'person_id'); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
