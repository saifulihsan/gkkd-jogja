<div class="wide form">
    <?php $form = $this->beginWidget('GxActiveForm', array(
    'action' => Yii::app()->createUrl($this->route),
    'method' => 'get',
)); ?>

    <div class="span-8 last">
        <?php echo $form->label($model, 'id_lampiran'); ?>
        <?php echo $form->textField($model, 'id_lampiran'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'nama'); ?>
        <?php echo $form->textField($model, 'nama', array('maxlength' => 100)); ?>
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
        <?php echo $form->label($model, 'keterangan'); ?>
        <?php echo $form->textArea($model, 'keterangan'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'satuan'); ?>
        <?php echo $form->textField($model, 'satuan', array('maxlength' => 45)); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'qty'); ?>
        <?php echo $form->textField($model, 'qty'); ?>
    </div>
    <div class="span-8 last">
        <?php echo $form->label($model, 'entry_time'); ?>
        <?php echo $form->textField($model, 'entry_time'); ?>
    </div>
    <div class="row buttons">
        <?php echo GxHtml::submitButton(Yii::t('app', 'Search')); ?>
    </div>

    <?php $this->endWidget(); ?>
</div><!-- search-form -->
