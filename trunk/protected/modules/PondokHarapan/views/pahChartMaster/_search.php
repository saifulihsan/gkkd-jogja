<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'action' => Yii::app()->createUrl($this->route),
    'method' => 'get',
)); ?>

    <div class="span-8 last">
        <?php echo $form->label($model, 'account_code'); ?>
        <?php echo $form->textField($model, 'account_code', array('maxlength' => 15)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'account_code2'); ?>
        <?php echo $form->textField($model, 'account_code2', array('maxlength' => 15)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'account_name'); ?>
        <?php echo $form->textField($model, 'account_name', array('maxlength' => 60)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'account_type'); ?>
        <?php echo $form->dropDownList($model, 'account_type', GxHtml::listDataEx(PahChartTypes::model()->findAllAttributes(null, true)), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'inactive'); ?>
        <?php echo $form->dropDownList($model, 'inactive', array('0' => Yii::t('app', 'No'), '1' => Yii::t('app', 'Yes')), array('prompt' => Yii::t('app', 'All'))); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'description'); ?>
        <?php echo $form->textArea($model, 'description'); ?>
    </div>
    <div class="row buttons">
        <?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
    </div>

    <?php $this->endWidget(); ?>
</div><!-- search-form -->
