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
		<?php echo $form->label($model, 'type'); ?>
		<?php echo $form->textField($model, 'type'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'trans_no'); ?>
		<?php echo $form->textField($model, 'trans_no'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'bank_act'); ?>
		<?php echo $form->dropDownList($model, 'bank_act', GxHtml::listDataEx(PahBankAccounts::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'ref'); ?>
		<?php echo $form->textField($model, 'ref', array('maxlength' => 40)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'trans_date'); ?>
		<?php $form->widget('zii.widgets.jui.CJuiDatePicker', array(
			'model' => $model,
			'attribute' => 'trans_date',
			'value' => $model->trans_date,
			'options' => array(
				'showButtonPanel' => true,
				'changeYear' => true,
				'dateFormat' => 'yy-mm-dd',
				),
			));
; ?>
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

	<div class="span-8 last">
		<?php echo $form->label($model, 'reconciled'); ?>
		<?php $form->widget('zii.widgets.jui.CJuiDatePicker', array(
			'model' => $model,
			'attribute' => 'reconciled',
			'value' => $model->reconciled,
			'options' => array(
				'showButtonPanel' => true,
				'changeYear' => true,
				'dateFormat' => 'yy-mm-dd',
				),
			));
; ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
