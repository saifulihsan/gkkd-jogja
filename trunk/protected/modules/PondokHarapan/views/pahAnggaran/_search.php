<div class="wide form">

<?php $form = $this->beginWidget('GxActiveForm', array(
	'action' => Yii::app()->createUrl($this->route),
	'method' => 'get',
)); ?>

	<div class="span-8 last">
		<?php echo $form->label($model, 'id'); ?>
		<?php echo $form->textField($model, 'id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'doc_ref'); ?>
		<?php echo $form->textField($model, 'doc_ref', array('maxlength' => 15)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'periode_bulan'); ?>
		<?php echo $form->textField($model, 'periode_bulan'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'periode_tahun'); ?>
		<?php echo $form->textField($model, 'periode_tahun'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'trans_date'); ?>
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
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'lock'); ?>
		<?php echo $form->dropDownList($model, 'lock', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'users_id'); ?>
		<?php echo $form->dropDownList($model, 'users_id', GxHtml::listDataEx(Users::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
