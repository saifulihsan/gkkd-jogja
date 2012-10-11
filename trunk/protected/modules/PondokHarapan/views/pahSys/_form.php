<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'pah-sys-form',
    'enableAjaxValidation' => false,
));
    ?>

    <p class="note">
        <?php echo Yii::t('app', 'Fields with'); ?> <span
            class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
    </p>

    <?php echo $form->errorSummary($model); ?>

    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'value'); ?>
        <?php echo $form->textArea($model, 'value'); ?>
        <?php echo $form->error($model, 'value'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('pahsys/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->