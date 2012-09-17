<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'chart-master-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'account_code2'); ?>
		<?php echo $form->textField($model, 'account_code2', array('maxlength' => 15)); ?>
		<?php echo $form->error($model,'account_code2'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'account_name'); ?>
		<?php echo $form->textField($model, 'account_name', array('maxlength' => 60)); ?>
		<?php echo $form->error($model,'account_name'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'account_type'); ?>
		<?php echo $form->dropDownList($model, 'account_type', GxHtml::listDataEx(ChartTypes::model()->findAllAttributes(null, true))); ?>
		<?php echo $form->error($model,'account_type'); ?>
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
			'submit' => array('chartmaster/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->