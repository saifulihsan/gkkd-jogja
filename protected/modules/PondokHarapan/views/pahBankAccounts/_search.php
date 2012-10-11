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
        <?php echo $form->label($model, 'account_code'); ?>
        <?php echo $form->dropDownList($model, 'account_code', GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'account_type'); ?>
        <?php echo $form->textField($model, 'account_type'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'bank_account_name'); ?>
        <?php echo $form->textField($model, 'bank_account_name', array('maxlength' => 60)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'bank_account_number'); ?>
        <?php echo $form->textField($model, 'bank_account_number', array('maxlength' => 100)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'bank_name'); ?>
        <?php echo $form->textField($model, 'bank_name', array('maxlength' => 60)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'bank_address'); ?>
        <?php echo $form->textArea($model, 'bank_address'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'bank_curr_code'); ?>
        <?php echo $form->textField($model, 'bank_curr_code', array('maxlength' => 3)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'dflt_curr_act'); ?>
        <?php echo $form->dropDownList($model, 'dflt_curr_act', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'ending_reconcile_balance'); ?>
        <?php echo $form->textField($model, 'ending_reconcile_balance'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'inactive'); ?>
        <?php echo $form->dropDownList($model, 'inactive', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'bank_phone'); ?>
        <?php echo $form->textField($model, 'bank_phone', array('maxlength' => 50)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'atas_nama'); ?>
        <?php echo $form->textField($model, 'atas_nama', array('maxlength' => 50)); ?>
    </div>
    <div class="row buttons">
        <?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
    </div>

    <?php $this->endWidget(); ?>
</div><!-- search-form -->
