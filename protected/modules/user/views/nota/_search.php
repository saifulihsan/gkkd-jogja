<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'nota_id'); ?>
		<?php echo $form->textField($model, 'nota_id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'sales_id'); ?>
		<?php echo $form->dropDownList($model, 'sales_id', GxHtml::listDataEx(Sales::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'term'); ?>
		<?php echo $form->textField($model, 'term'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'warehouse'); ?>
		<?php echo $form->textField($model, 'warehouse'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'status'); ?>
		<?php echo $form->textField($model, 'status'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'currency'); ?>
		<?php echo $form->textField($model, 'currency'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'notes'); ?>
		<?php echo $form->textArea($model, 'notes'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'rate'); ?>
		<?php echo $form->textField($model, 'rate'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'doc_date'); ?>
		<?php echo $form->textField($model, 'doc_date'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'doc_ref'); ?>
		<?php echo $form->textField($model, 'doc_ref'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'customer_id'); ?>
		<?php echo $form->dropDownList($model, 'customer_id', GxHtml::listDataEx(Customers::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
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
		<?php echo $form->label($model, 'total_1'); ?>
		<?php echo $form->textField($model, 'total_1'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'disc'); ?>
		<?php echo $form->textField($model, 'disc'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'total_2'); ?>
		<?php echo $form->textField($model, 'total_2'); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
