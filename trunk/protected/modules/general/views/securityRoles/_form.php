<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'id' => 'security-roles-form',
    'enableAjaxValidation' => false,
));
    ?>

    <p class="note">
        <?php echo Yii::t('app', 'Fields with'); ?> <span
            class="required">*</span> <?php echo Yii::t('app', 'are required'); ?>.
    </p>

    <?php echo $form->errorSummary($model); ?>

    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'role'); ?>
        <?php echo $form->textField($model, 'role', array('maxlength' => 30)); ?>
        <?php echo $form->error($model, 'role'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'description'); ?>
        <?php echo $form->textField($model, 'description', array('maxlength' => 50)); ?>
        <?php echo $form->error($model, 'description'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'sections'); ?>
        <?php echo $form->textArea($model, 'sections'); ?>
        <?php echo $form->error($model, 'sections'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'areas'); ?>
        <?php echo $form->textArea($model, 'areas'); ?>
        <?php echo $form->error($model, 'areas'); ?>
    </div>
    <!-- row -->
    <div class="span-8 last">
        <?php echo $form->labelEx($model, 'inactive'); ?>
        <?php echo $form->checkBox($model, 'inactive'); ?>
        <?php echo $form->error($model, 'inactive'); ?>
    </div>
    <!-- row -->
    <!-- june -->
    <div class="row"></div>
    <!-- june -->
    <!--label--><!--/label-->

    <?php
    echo GxHtml::Button(Yii::t('app', 'Cancel'), array(
        'submit' => array('securityroles/admin')
    ));
    echo GxHtml::submitButton(Yii::t('app', 'Save'));
    $this->endWidget();
    ?>
</div><!-- form -->