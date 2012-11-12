<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'pe-lampiran-form',
    'enableAjaxValidation' => false,
));
    ?>

    <p class="note">
        <?php echo Yii::t('app', 'Fields with'); ?> <span
            class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
    </p>

    <?php echo $form->errorSummary($model); ?>

    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'nama'); ?>
        <?php echo $form->textField($model, 'nama', array('maxlength' => 100)); ?>
        <?php echo $form->error($model, 'nama'); ?>
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
        <?php echo $form->labelEx($model, 'keterangan'); ?>
        <?php echo $form->textArea($model, 'keterangan'); ?>
        <?php echo $form->error($model, 'keterangan'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'satuan'); ?>
        <?php echo $form->textField($model, 'satuan', array('maxlength' => 45)); ?>
        <?php echo $form->error($model, 'satuan'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'qty'); ?>
        <?php echo $form->textField($model, 'qty'); ?>
        <?php echo $form->error($model, 'qty'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'entry_time'); ?>
        <?php echo $form->textField($model, 'entry_time'); ?>
        <?php echo $form->error($model, 'entry_time'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('pelampiran/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->