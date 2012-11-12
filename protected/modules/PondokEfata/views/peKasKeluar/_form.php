<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'pe-kas-keluar-form',
    'enableAjaxValidation' => false,
));
    ?>

    <p class="note">
        <?php echo Yii::t('app', 'Fields with'); ?> <span
            class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
    </p>

    <?php echo $form->errorSummary($model); ?>

    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'doc_ref'); ?>
        <?php echo $form->textField($model, 'doc_ref', array('maxlength' => 15)); ?>
        <?php echo $form->error($model, 'doc_ref'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'no_bukti'); ?>
        <?php echo $form->textField($model, 'no_bukti', array('maxlength' => 45)); ?>
        <?php echo $form->error($model, 'no_bukti'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'amount'); ?>
        <?php echo $form->textField($model, 'amount'); ?>
        <?php echo $form->error($model, 'amount'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'entry_time'); ?>
        <?php echo $form->textField($model, 'entry_time'); ?>
        <?php echo $form->error($model, 'entry_time'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'trans_date'); ?>
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
        <?php echo $form->error($model, 'trans_date'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'trans_via'); ?>
        <?php echo $form->textField($model, 'trans_via', array('maxlength' => 45)); ?>
        <?php echo $form->error($model, 'trans_via'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'pe_supplier_id'); ?>
        <?php echo $form->dropDownList($model, 'pe_supplier_id', GxHtml::listDataEx(PeSuppliers::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'pe_supplier_id'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'pe_account_code'); ?>
        <?php echo $form->dropDownList($model, 'pe_account_code', GxHtml::listDataEx(PeChartMaster::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'pe_account_code'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'pe_bank_accounts_id'); ?>
        <?php echo $form->dropDownList($model, 'pe_bank_accounts_id', GxHtml::listDataEx(PeBankAccounts::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'pe_bank_accounts_id'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'users_id'); ?>
        <?php echo $form->dropDownList($model, 'users_id', GxHtml::listDataEx(Users::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'users_id'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('pekaskeluar/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->