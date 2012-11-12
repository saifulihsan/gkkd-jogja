<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'action' => Yii::app()->createUrl($this->route),
    'method' => 'get',
)); ?>

    <div class="span-8 last">
        <?php echo $form->label($model, 'aktivitas_id'); ?>
        <?php echo $form->textField($model, 'aktivitas_id'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'doc_ref'); ?>
        <?php echo $form->textField($model, 'doc_ref', array('maxlength' => 15)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'no_bukti'); ?>
        <?php echo $form->textField($model, 'no_bukti', array('maxlength' => 45)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'amount'); ?>
        <?php echo $form->textField($model, 'amount'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'entry_time'); ?>
        <?php echo $form->textField($model, 'entry_time'); ?>
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
        <?php echo $form->label($model, 'trans_via'); ?>
        <?php echo $form->textField($model, 'trans_via', array('maxlength' => 45)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'pe_supplier_id'); ?>
        <?php echo $form->dropDownList($model, 'pe_supplier_id', GxHtml::listDataEx(PeSuppliers::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'pe_bank_accounts_id'); ?>
        <?php echo $form->dropDownList($model, 'pe_bank_accounts_id', GxHtml::listDataEx(PeBankAccounts::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'pe_member_id'); ?>
        <?php echo $form->dropDownList($model, 'pe_member_id', GxHtml::listDataEx(PeMember::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'pe_sub_aktivitas_id'); ?>
        <?php echo $form->dropDownList($model, 'pe_sub_aktivitas_id', GxHtml::listDataEx(PeSubAktivitas::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
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
