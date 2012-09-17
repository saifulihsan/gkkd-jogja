<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'tbl-user-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'username'); ?>
		<?php echo $form->textField($model, 'username', array('maxlength' => 128)); ?>
		<?php echo $form->error($model,'username'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'password'); ?>
		<?php echo $form->passwordField($model, 'password', array('maxlength' => 128)); ?>
		<?php echo $form->error($model,'password'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'email'); ?>
		<?php echo $form->textField($model, 'email', array('maxlength' => 128)); ?>
		<?php echo $form->error($model,'email'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'level'); ?>
		<?php echo $form->textField($model, 'level', array('maxlength' => 128)); ?>
		<?php echo $form->error($model,'level'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'nick'); ?>
		<?php echo $form->textField($model, 'nick', array('maxlength' => 10)); ?>
		<?php echo $form->error($model,'nick'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'complete'); ?>
		<?php echo $form->textField($model, 'complete', array('maxlength' => 128)); ?>
		<?php echo $form->error($model,'complete'); ?>
		</div><!-- row -->
<!-- june -->
<div class="row"></div>
<!-- june -->
		<!--label--><!--/label-->
		                
<?php
echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
			'submit' => array('tbluser/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->