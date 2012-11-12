<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'pe-anggaran-detil-form',
    'enableAjaxValidation' => false,
));
    ?>

    <p class="note">
        <?php echo Yii::t('app', 'Fields with'); ?> <span
            class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
    </p>

    <?php echo $form->errorSummary($model); ?>

    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'anggaran_id'); ?>
        <?php echo $form->dropDownList($model, 'anggaran_id', GxHtml::listDataEx(PeAnggaran::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'anggaran_id'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'amount'); ?>
        <?php echo $form->textField($model, 'amount'); ?>
        <?php echo $form->error($model, 'amount'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'account_code'); ?>
        <?php echo $form->dropDownList($model, 'account_code', GxHtml::listDataEx(PeChartMaster::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'account_code'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('peanggarandetil/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->