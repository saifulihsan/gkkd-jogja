<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'pah-anggaran-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'doc_ref'); ?>
		<?php echo $form->textField($model, 'doc_ref', array('maxlength' => 15)); ?>
		<?php echo $form->error($model,'doc_ref'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'periode_bulan'); ?>
		<?php echo $form->textField($model, 'periode_bulan'); ?>
		<?php echo $form->error($model,'periode_bulan'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'periode_tahun'); ?>
		<?php echo $form->textField($model, 'periode_tahun'); ?>
		<?php echo $form->error($model,'periode_tahun'); ?>
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
		<?php echo $form->labelEx($model,'lock'); ?>
		<?php echo $form->checkBox($model, 'lock'); ?>
		<?php echo $form->error($model,'lock'); ?>
		</div><!-- row -->
<!-- june -->
<div class="row"></div>
<!-- june -->
		<!--label--><!--/label-->
		                
<?php
echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
			'submit' => array('pahanggaran/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->