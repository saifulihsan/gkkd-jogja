<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'pe-suppliers-form',
    'enableAjaxValidation' => false,
));
    ?>

    <p class="note">
        <?php echo Yii::t('app', 'Fields with'); ?> <span
            class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
    </p>

    <?php echo $form->errorSummary($model); ?>

    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'supp_name'); ?>
        <?php echo $form->textField($model, 'supp_name', array('maxlength' => 60)); ?>
        <?php echo $form->error($model, 'supp_name'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'supp_ref'); ?>
        <?php echo $form->textField($model, 'supp_ref', array('maxlength' => 30)); ?>
        <?php echo $form->error($model, 'supp_ref'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'address'); ?>
        <?php echo $form->textArea($model, 'address'); ?>
        <?php echo $form->error($model, 'address'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'mail_address'); ?>
        <?php echo $form->textArea($model, 'mail_address'); ?>
        <?php echo $form->error($model, 'mail_address'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'gst_no'); ?>
        <?php echo $form->textField($model, 'gst_no', array('maxlength' => 25)); ?>
        <?php echo $form->error($model, 'gst_no'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'contact'); ?>
        <?php echo $form->textField($model, 'contact', array('maxlength' => 60)); ?>
        <?php echo $form->error($model, 'contact'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'supp_account_no'); ?>
        <?php echo $form->textField($model, 'supp_account_no', array('maxlength' => 40)); ?>
        <?php echo $form->error($model, 'supp_account_no'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'website'); ?>
        <?php echo $form->textField($model, 'website', array('maxlength' => 100)); ?>
        <?php echo $form->error($model, 'website'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'bank_account'); ?>
        <?php echo $form->textField($model, 'bank_account', array('maxlength' => 60)); ?>
        <?php echo $form->error($model, 'bank_account'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'curr_code'); ?>
        <?php echo $form->textField($model, 'curr_code', array('maxlength' => 3)); ?>
        <?php echo $form->error($model, 'curr_code'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'payment_terms'); ?>
        <?php echo $form->textField($model, 'payment_terms'); ?>
        <?php echo $form->error($model, 'payment_terms'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'credit_limit'); ?>
        <?php echo $form->textField($model, 'credit_limit'); ?>
        <?php echo $form->error($model, 'credit_limit'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'purchase_account'); ?>
        <?php echo $form->textField($model, 'purchase_account', array('maxlength' => 15)); ?>
        <?php echo $form->error($model, 'purchase_account'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'payable_account'); ?>
        <?php echo $form->textField($model, 'payable_account', array('maxlength' => 15)); ?>
        <?php echo $form->error($model, 'payable_account'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'payment_discount_account'); ?>
        <?php echo $form->textField($model, 'payment_discount_account', array('maxlength' => 15)); ?>
        <?php echo $form->error($model, 'payment_discount_account'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'notes'); ?>
        <?php echo $form->textArea($model, 'notes'); ?>
        <?php echo $form->error($model, 'notes'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'inactive'); ?>
        <?php echo $form->textField($model, 'inactive'); ?>
        <?php echo $form->error($model, 'inactive'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('pesuppliers/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->