<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'pah-anggaran-detil-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'pah_anggaran_id'); ?>
		<?php echo $form->dropDownList($model, 'pah_anggaran_id', GxHtml::listDataEx(PahAnggaran::model()->findAllAttributes(null, true))); ?>
		<?php echo $form->error($model,'pah_anggaran_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'kode_rekening'); ?>
		<?php echo $form->textField($model, 'kode_rekening', array('maxlength' => 15)); ?>
		<?php echo $form->error($model,'kode_rekening'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'amount'); ?>
		<?php echo $form->textField($model, 'amount'); ?>
		<?php echo $form->error($model,'amount'); ?>
		</div><!-- row -->
<!-- june -->
<div class="row"></div>
<!-- june -->
		<!--label--><!--/label-->
		                
<?php
echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
			'submit' => array('pahanggarandetil/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->