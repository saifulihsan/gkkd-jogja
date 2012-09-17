<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'chart-types-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'name'); ?>
		<?php echo $form->textField($model, 'name', array('maxlength' => 60)); ?>
		<?php echo $form->error($model,'name'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'class_id'); ?>
		<?php echo $form->dropDownList($model, 'class_id', GxHtml::listDataEx(ChartClass::model()->findAllAttributes(null, true))); ?>
		<?php echo $form->error($model,'class_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'parent'); ?>
		<?php echo $form->textField($model, 'parent', array('maxlength' => 10)); ?>
		<?php echo $form->error($model,'parent'); ?>
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
			'submit' => array('charttypes/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->