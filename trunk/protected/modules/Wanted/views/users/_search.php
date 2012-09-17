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
		<?php echo $form->label($model, 'user_id'); ?>
		<?php echo $form->textField($model, 'user_id', array('maxlength' => 60)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'real_name'); ?>
		<?php echo $form->textField($model, 'real_name', array('maxlength' => 100)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'role_id'); ?>
		<?php echo $form->textField($model, 'role_id'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'phone'); ?>
		<?php echo $form->textField($model, 'phone', array('maxlength' => 30)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'email'); ?>
		<?php echo $form->textField($model, 'email', array('maxlength' => 100)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'language'); ?>
		<?php echo $form->textField($model, 'language', array('maxlength' => 20)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'date_format'); ?>
		<?php echo $form->dropDownList($model, 'date_format', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'date_sep'); ?>
		<?php echo $form->dropDownList($model, 'date_sep', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'tho_sep'); ?>
		<?php echo $form->dropDownList($model, 'tho_sep', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'dec_sep'); ?>
		<?php echo $form->dropDownList($model, 'dec_sep', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'theme'); ?>
		<?php echo $form->textField($model, 'theme', array('maxlength' => 20)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'page_size'); ?>
		<?php echo $form->textField($model, 'page_size', array('maxlength' => 20)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'prices_dec'); ?>
		<?php echo $form->textField($model, 'prices_dec'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'qty_dec'); ?>
		<?php echo $form->textField($model, 'qty_dec'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'rates_dec'); ?>
		<?php echo $form->textField($model, 'rates_dec'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'percent_dec'); ?>
		<?php echo $form->textField($model, 'percent_dec'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'show_gl'); ?>
		<?php echo $form->dropDownList($model, 'show_gl', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'show_codes'); ?>
		<?php echo $form->dropDownList($model, 'show_codes', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'show_hints'); ?>
		<?php echo $form->dropDownList($model, 'show_hints', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'last_visit_date'); ?>
		<?php echo $form->textField($model, 'last_visit_date'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'query_size'); ?>
		<?php echo $form->dropDownList($model, 'query_size', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'graphic_links'); ?>
		<?php echo $form->dropDownList($model, 'graphic_links', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'pos'); ?>
		<?php echo $form->textField($model, 'pos'); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'print_profile'); ?>
		<?php echo $form->textField($model, 'print_profile', array('maxlength' => 30)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'rep_popup'); ?>
		<?php echo $form->dropDownList($model, 'rep_popup', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'sticky_doc_date'); ?>
		<?php echo $form->dropDownList($model, 'sticky_doc_date', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'startup_tab'); ?>
		<?php echo $form->textField($model, 'startup_tab', array('maxlength' => 20)); ?>
	</div>

	<div class="span-8 last">
		<?php echo $form->label($model, 'inactive'); ?>
		<?php echo $form->dropDownList($model, 'inactive', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
	</div>

	<div class="row buttons">
		<?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
	</div>

<?php $this->endWidget(); ?>

</div><!-- search-form -->
