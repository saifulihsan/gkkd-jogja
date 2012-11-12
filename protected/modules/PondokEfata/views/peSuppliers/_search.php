<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'action' => Yii::app()->createUrl($this->route),
    'method' => 'get',
)); ?>

    <div class="span-8 last">
        <?php echo $form->label($model, 'supplier_id'); ?>
        <?php echo $form->textField($model, 'supplier_id'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'supp_name'); ?>
        <?php echo $form->textField($model, 'supp_name', array('maxlength' => 60)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'supp_ref'); ?>
        <?php echo $form->textField($model, 'supp_ref', array('maxlength' => 30)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'address'); ?>
        <?php echo $form->textArea($model, 'address'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'mail_address'); ?>
        <?php echo $form->textArea($model, 'mail_address'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'gst_no'); ?>
        <?php echo $form->textField($model, 'gst_no', array('maxlength' => 25)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'contact'); ?>
        <?php echo $form->textField($model, 'contact', array('maxlength' => 60)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'supp_account_no'); ?>
        <?php echo $form->textField($model, 'supp_account_no', array('maxlength' => 40)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'website'); ?>
        <?php echo $form->textField($model, 'website', array('maxlength' => 100)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'bank_account'); ?>
        <?php echo $form->textField($model, 'bank_account', array('maxlength' => 60)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'curr_code'); ?>
        <?php echo $form->textField($model, 'curr_code', array('maxlength' => 3)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'payment_terms'); ?>
        <?php echo $form->textField($model, 'payment_terms'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'credit_limit'); ?>
        <?php echo $form->textField($model, 'credit_limit'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'purchase_account'); ?>
        <?php echo $form->textField($model, 'purchase_account', array('maxlength' => 15)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'payable_account'); ?>
        <?php echo $form->textField($model, 'payable_account', array('maxlength' => 15)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'payment_discount_account'); ?>
        <?php echo $form->textField($model, 'payment_discount_account', array('maxlength' => 15)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'notes'); ?>
        <?php echo $form->textArea($model, 'notes'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'inactive'); ?>
        <?php echo $form->textField($model, 'inactive'); ?>
    </div>
    <div class="row buttons">
        <?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
    </div>

    <?php $this->endWidget(); ?>
</div><!-- search-form -->
