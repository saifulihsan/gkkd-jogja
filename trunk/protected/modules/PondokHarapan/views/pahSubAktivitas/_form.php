<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'pah-sub-aktivitas-form',
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
        <?php echo $form->textField($model, 'nama', array('maxlength' => 50)); ?>
        <?php echo $form->error($model, 'nama'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'desc'); ?>
        <?php echo $form->textArea($model, 'desc'); ?>
        <?php echo $form->error($model, 'desc'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'account_code'); ?>
        <?php echo $form->dropDownList($model, 'account_code', GxHtml::listDataEx(PahChartMaster::model()->findAllAttributes(null, true))); ?>
        <?php echo $form->error($model, 'account_code'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('pahsubaktivitas/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->