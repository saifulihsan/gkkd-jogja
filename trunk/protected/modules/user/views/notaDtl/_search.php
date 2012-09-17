<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'nota_dtl_id'); ?>
		<?php echo $form->textField($model, 'nota_dtl_id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'nota_id'); ?>
		<?php echo $form->dropDownList($model, 'nota_id', GxHtml::listDataEx(Nota::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'barang_id'); ?>
		<?php echo $form->dropDownList($model, 'barang_id', GxHtml::listDataEx(Barang::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'jml'); ?>
		<?php echo $form->textField($model, 'jml'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'harga_satuan'); ?>
		<?php echo $form->textField($model, 'harga_satuan'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'total_harga_1'); ?>
		<?php echo $form->textField($model, 'total_harga_1'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'disc_per'); ?>
		<?php echo $form->textField($model, 'disc_per'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'disc_rp'); ?>
		<?php echo $form->textField($model, 'disc_rp'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'total_harga_2'); ?>
		<?php echo $form->textField($model, 'total_harga_2'); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
