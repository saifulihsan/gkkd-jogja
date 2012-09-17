<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'nota-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'sales_id'); ?>
		<?php echo $form->dropDownList($model, 'sales_id', GxHtml::listDataEx(Sales::model()->findAllAttributes(null, true))); ?>
		<?php echo $form->error($model,'sales_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'term'); ?>
		<?php echo $form->textField($model, 'term'); ?>
		<?php echo $form->error($model,'term'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'warehouse'); ?>
		<?php echo $form->textField($model, 'warehouse'); ?>
		<?php echo $form->error($model,'warehouse'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'status'); ?>
		<?php echo $form->textField($model, 'status'); ?>
		<?php echo $form->error($model,'status'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'currency'); ?>
		<?php echo $form->textField($model, 'currency'); ?>
		<?php echo $form->error($model,'currency'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'notes'); ?>
		<?php echo $form->textArea($model, 'notes'); ?>
		<?php echo $form->error($model,'notes'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'rate'); ?>
		<?php echo $form->textField($model, 'rate'); ?>
		<?php echo $form->error($model,'rate'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'doc_date'); ?>
		<?php echo $form->textField($model, 'doc_date'); ?>
		<?php echo $form->error($model,'doc_date'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'doc_ref'); ?>
		<?php echo $form->textField($model, 'doc_ref'); ?>
		<?php echo $form->error($model,'doc_ref'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'customer_id'); ?>
		<?php echo $form->dropDownList($model, 'customer_id', GxHtml::listDataEx(Customers::model()->findAllAttributes(null, true))); ?>
		<?php echo $form->error($model,'customer_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'trans_date'); ?>
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
		<?php echo $form->error($model,'trans_date'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'total_1'); ?>
		<?php echo $form->textField($model, 'total_1'); ?>
		<?php echo $form->error($model,'total_1'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'disc'); ?>
		<?php echo $form->textField($model, 'disc'); ?>
		<?php echo $form->error($model,'disc'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'total_2'); ?>
		<?php echo $form->textField($model, 'total_2'); ?>
		<?php echo $form->error($model,'total_2'); ?>
		</div><!-- row -->
<!-- june -->
<div class="row"></div>
<!-- june -->
		<!--label--><!--/label-->
		                
<?php
echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
			'submit' => array('nota/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->