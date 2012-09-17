<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'users-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'user_id'); ?>
		<?php echo $form->textField($model, 'user_id', array('maxlength' => 60)); ?>
		<?php echo $form->error($model,'user_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'password'); ?>
		<?php echo $form->passwordField($model, 'password', array('maxlength' => 100)); ?>
		<?php echo $form->error($model,'password'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'real_name'); ?>
		<?php echo $form->textField($model, 'real_name', array('maxlength' => 100)); ?>
		<?php echo $form->error($model,'real_name'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'role_id'); ?>
		<?php echo $form->textField($model, 'role_id'); ?>
		<?php echo $form->error($model,'role_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'phone'); ?>
		<?php echo $form->textField($model, 'phone', array('maxlength' => 30)); ?>
		<?php echo $form->error($model,'phone'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'email'); ?>
		<?php echo $form->textField($model, 'email', array('maxlength' => 100)); ?>
		<?php echo $form->error($model,'email'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'language'); ?>
		<?php echo $form->textField($model, 'language', array('maxlength' => 20)); ?>
		<?php echo $form->error($model,'language'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'date_format'); ?>
		<?php echo $form->checkBox($model, 'date_format'); ?>
		<?php echo $form->error($model,'date_format'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'date_sep'); ?>
		<?php echo $form->checkBox($model, 'date_sep'); ?>
		<?php echo $form->error($model,'date_sep'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'tho_sep'); ?>
		<?php echo $form->checkBox($model, 'tho_sep'); ?>
		<?php echo $form->error($model,'tho_sep'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'dec_sep'); ?>
		<?php echo $form->checkBox($model, 'dec_sep'); ?>
		<?php echo $form->error($model,'dec_sep'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'theme'); ?>
		<?php echo $form->textField($model, 'theme', array('maxlength' => 20)); ?>
		<?php echo $form->error($model,'theme'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'page_size'); ?>
		<?php echo $form->textField($model, 'page_size', array('maxlength' => 20)); ?>
		<?php echo $form->error($model,'page_size'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'prices_dec'); ?>
		<?php echo $form->textField($model, 'prices_dec'); ?>
		<?php echo $form->error($model,'prices_dec'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'qty_dec'); ?>
		<?php echo $form->textField($model, 'qty_dec'); ?>
		<?php echo $form->error($model,'qty_dec'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'rates_dec'); ?>
		<?php echo $form->textField($model, 'rates_dec'); ?>
		<?php echo $form->error($model,'rates_dec'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'percent_dec'); ?>
		<?php echo $form->textField($model, 'percent_dec'); ?>
		<?php echo $form->error($model,'percent_dec'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'show_gl'); ?>
		<?php echo $form->checkBox($model, 'show_gl'); ?>
		<?php echo $form->error($model,'show_gl'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'show_codes'); ?>
		<?php echo $form->checkBox($model, 'show_codes'); ?>
		<?php echo $form->error($model,'show_codes'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'show_hints'); ?>
		<?php echo $form->checkBox($model, 'show_hints'); ?>
		<?php echo $form->error($model,'show_hints'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'last_visit_date'); ?>
		<?php echo $form->textField($model, 'last_visit_date'); ?>
		<?php echo $form->error($model,'last_visit_date'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'query_size'); ?>
		<?php echo $form->checkBox($model, 'query_size'); ?>
		<?php echo $form->error($model,'query_size'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'graphic_links'); ?>
		<?php echo $form->checkBox($model, 'graphic_links'); ?>
		<?php echo $form->error($model,'graphic_links'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'pos'); ?>
		<?php echo $form->textField($model, 'pos'); ?>
		<?php echo $form->error($model,'pos'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'print_profile'); ?>
		<?php echo $form->textField($model, 'print_profile', array('maxlength' => 30)); ?>
		<?php echo $form->error($model,'print_profile'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'rep_popup'); ?>
		<?php echo $form->checkBox($model, 'rep_popup'); ?>
		<?php echo $form->error($model,'rep_popup'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'sticky_doc_date'); ?>
		<?php echo $form->checkBox($model, 'sticky_doc_date'); ?>
		<?php echo $form->error($model,'sticky_doc_date'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'startup_tab'); ?>
		<?php echo $form->textField($model, 'startup_tab', array('maxlength' => 20)); ?>
		<?php echo $form->error($model,'startup_tab'); ?>
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
			'submit' => array('users/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->