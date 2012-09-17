<div class="wide form">


<?php $form = $this->beginWidget('GxActiveForm', array(
	'id' => 'nota-dtl-form',
	'enableAjaxValidation' => false,
));
?>

	<p class="note">
		<?php echo Yii::t('app', 'Fields with'); ?> <span class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
	</p>

	<?php echo $form->errorSummary($model); ?>

		<div class="span-8 last">
		<?php echo $form->labelEx($model,'nota_id'); ?>
		<?php echo $form->dropDownList($model, 'nota_id', GxHtml::listDataEx(Nota::model()->findAllAttributes(null, true))); ?>
		<?php echo $form->error($model,'nota_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'barang_id'); ?>
		<?php echo $form->dropDownList($model, 'barang_id', GxHtml::listDataEx(Barang::model()->findAllAttributes(null, true))); ?>
		<?php echo $form->error($model,'barang_id'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'jml'); ?>
		<?php echo $form->textField($model, 'jml'); ?>
		<?php echo $form->error($model,'jml'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'harga_satuan'); ?>
		<?php echo $form->textField($model, 'harga_satuan'); ?>
		<?php echo $form->error($model,'harga_satuan'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'total_harga_1'); ?>
		<?php echo $form->textField($model, 'total_harga_1'); ?>
		<?php echo $form->error($model,'total_harga_1'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'disc_per'); ?>
		<?php echo $form->textField($model, 'disc_per'); ?>
		<?php echo $form->error($model,'disc_per'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'disc_rp'); ?>
		<?php echo $form->textField($model, 'disc_rp'); ?>
		<?php echo $form->error($model,'disc_rp'); ?>
		</div><!-- row -->
		<div class="span-8 last">
		<?php echo $form->labelEx($model,'total_harga_2'); ?>
		<?php echo $form->textField($model, 'total_harga_2'); ?>
		<?php echo $form->error($model,'total_harga_2'); ?>
		</div><!-- row -->
<!-- june -->
<div class="row"></div>
<!-- june -->
		<!--label--><!--/label-->
		                
<?php
echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
			'submit' => array('notadtl/admin')
		));
echo GxHtml::submitButton(Yii::t('app', 'Save'));
$this->endWidget();
?>
</div><!-- form -->