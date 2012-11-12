<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'pe-bank-accounts-form',
    'enableAjaxValidation' => false,
));
    ?>

    <p class="note">
        <?php echo Yii::t('app', 'Fields with'); ?> <span
            class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
    </p>

    <?php echo $form->errorSummary($model); ?>

    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'account_code'); ?>
        <?php echo $form->dropDownList($model, 'account_code', GxHtml::listDataEx(PeChartMaster::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'account_code'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'account_type'); ?>
        <?php echo $form->textField($model, 'account_type'); ?>
        <?php echo $form->error($model, 'account_type'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'bank_account_name'); ?>
        <?php echo $form->textField($model, 'bank_account_name', array('maxlength' => 60)); ?>
        <?php echo $form->error($model, 'bank_account_name'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'bank_account_number'); ?>
        <?php echo $form->textField($model, 'bank_account_number', array('maxlength' => 100)); ?>
        <?php echo $form->error($model, 'bank_account_number'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'bank_name'); ?>
        <?php echo $form->textField($model, 'bank_name', array('maxlength' => 60)); ?>
        <?php echo $form->error($model, 'bank_name'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'bank_address'); ?>
        <?php echo $form->textArea($model, 'bank_address'); ?>
        <?php echo $form->error($model, 'bank_address'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'bank_curr_code'); ?>
        <?php echo $form->textField($model, 'bank_curr_code', array('maxlength' => 3)); ?>
        <?php echo $form->error($model, 'bank_curr_code'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'dflt_curr_act'); ?>
        <?php echo $form->textField($model, 'dflt_curr_act'); ?>
        <?php echo $form->error($model, 'dflt_curr_act'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'ending_reconcile_balance'); ?>
        <?php echo $form->textField($model, 'ending_reconcile_balance'); ?>
        <?php echo $form->error($model, 'ending_reconcile_balance'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'inactive'); ?>
        <?php echo $form->textField($model, 'inactive'); ?>
        <?php echo $form->error($model, 'inactive'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'bank_phone'); ?>
        <?php echo $form->textField($model, 'bank_phone', array('maxlength' => 50)); ?>
        <?php echo $form->error($model, 'bank_phone'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'atas_nama'); ?>
        <?php echo $form->textField($model, 'atas_nama', array('maxlength' => 50)); ?>
        <?php echo $form->error($model, 'atas_nama'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('pebankaccounts/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->