<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'sales-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'ref'); ?>
		<?php echo $form->textField($model, 'ref'); ?>
		<?php echo $form->error($model,'ref'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'name'); ?>
		<?php echo $form->textField($model, 'name'); ?>
		<?php echo $form->error($model,'name'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'address'); ?>
		<?php echo $form->textArea($model, 'address'); ?>
		<?php echo $form->error($model,'address'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'phone'); ?>
		<?php echo $form->textField($model, 'phone'); ?>
		<?php echo $form->error($model,'phone'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'phone2'); ?>
		<?php echo $form->textField($model, 'phone2'); ?>
		<?php echo $form->error($model,'phone2'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'inactive'); ?>
		<?php echo $form->textField($model, 'inactive'); ?>
		<?php echo $form->error($model,'inactive'); ?>
		</div><!-- row -->
<!-- june -->
<div class="row"></div>
<!-- june -->
		<!--label--><!--/label-->
		                
<?php
echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
			'submit' => array('sales/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->