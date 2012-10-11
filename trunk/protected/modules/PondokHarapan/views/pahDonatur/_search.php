<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'action' => Yii::app()->createUrl($this->route),
    'method' => 'get',
)); ?>

    <div class="span-8 last">
        <?php echo $form->label($model, 'id'); ?>
        <?php echo $form->textField($model, 'id'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'name'); ?>
        <?php echo $form->textField($model, 'name', array('maxlength' => 50)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'phone'); ?>
        <?php echo $form->textField($model, 'phone', array('maxlength' => 30)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'alamat'); ?>
        <?php echo $form->textArea($model, 'alamat'); ?>
    </div>
    <div class="row buttons">
        <?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
    </div>

    <?php $this->endWidget(); ?>
</div><!-- search-form -->
