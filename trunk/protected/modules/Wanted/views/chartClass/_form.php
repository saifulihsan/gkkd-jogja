<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'chart-class-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'class_name'); ?>
		<?php echo $form->textField($model, 'class_name', array('maxlength' => 60)); ?>
		<?php echo $form->error($model,'class_name'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'ctype'); ?>
		<?php echo $form->checkBox($model, 'ctype'); ?>
		<?php echo $form->error($model,'ctype'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'inactive'); ?>
		<?php echo $form->checkBox($model, 'inactive'); ?>
		<?php echo $form->error($model,'inactive'); ?>
		</div><!-- row -->
<!-- june -->
<div class="row"></div>
<!-- june -->
		<!--label--><!--/label-->
		                
<?php
echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
			'submit' => array('chartclass/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->